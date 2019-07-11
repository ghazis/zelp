var request = require('request');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromedriver = require('chromedriver');

var logging_prefs = new webdriver.logging.Preferences();
logging_prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.OFF);
var options = new chrome.Options().windowSize({height:1200,width:1900}).headless().setLoggingPrefs(logging_prefs);
options.addArguments('log-level=3'); //ignore useless info messages

function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms))};

async function getZRestaurants(location) {
   var restaurants = [];
   var br = await new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();
   try {
      await br.get('https://www.zabihah.com/search?k=&l='+location);
      try       {var table = await br.findElement(webdriver.By.xpath('/html/body/table[1]/tbody/tr/td[1]/table[13]/tbody/tr/td/table'))}
      catch (e) {var table = await br.findElement(webdriver.By.xpath('/html/body/table[1]/tbody/tr/td[1]/table[11]/tbody/tr/td/table'))}
      var rows = await table.findElements(webdriver.By.tagName('tr'));

      for (row in rows) {
         restaurant = {};
         columns = await rows[row].findElements(webdriver.By.tagName('td'));
         if (columns.length < 5 && columns.length > 0) {
            var lines = (await columns[2].getText()).split('\n');
            restaurant['name'] = lines[0];
            restaurant['address'] = lines[1];
            restaurant['cuisine'] = lines[2];
            if (lines.length > 3) restaurant['cuisine'] += (" and " + lines[3]);
            restaurants.push(restaurant);
         }
      }
      return restaurants;
  } finally {
    await br.quit();
  }
};

function getYelpRating(place, location) {
   return new Promise(resolve=>{
      headers = {Authorization: "Bearer 5ZvGnZpBK6Akri3RxH9ykPU_vRe0M-3vbqb2rTrtSn7jrzhbk7EobygJm7bFf8QlYiVzxHlPaohpu1L2zaH4vey1lC2GWVVoGfcE2Zsdbx8KJMTGOKjgV1zryCoWXXYx"};
      params = {term: place, location: location}
      var options = {uri: 'https://api.yelp.com/v3/businesses/search', headers:headers, qs:params};

      request(options, (err, resp, body)=>{
         var results = JSON.parse(body);
         if (Object.keys(results).includes('error')) {
            resolve({error: results['error']['description']});
         } else if (results['businesses'].length) {
           var found = results['businesses'][0];
           resolve({
               id: found['id'],
               name: found['name'],
               rating: found['rating'],
               review_count: found['review_count'],
               url: found['url'],
               phone: found['phone'],
               address: found['location']['display_address']
           });
         } else{
            resolve({name: place, rating: null});
         }
      })
   })
};

async function getZRestsMap(location) {
   var z_rests_map = [];
   var z_rests = await getZRestaurants(location);
   var promises = [];

   for (var rest of z_rests) {
      await delay(300);
      promises.push(getYelpRating(rest['name'], rest['address']));
   }
   var results = await Promise.all(promises);
   return(results);
};

async function captureData(location) {
   var zRestMap = await getZRestsMap(location);
   var zRestMapSorted = zRestMap.sort((a,b)=>{
      if (a.rating < b.rating) return 1;
      else return -1
   });

   return zRestMapSorted;
}

module.exports = captureData;