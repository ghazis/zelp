var captureData = require('./dataCapture');

const express = require('express');

const app = express();

app.get('/zelp/', async function(req, res) {
   var location = req.query.location;
   var data = await captureData(location);

   return res.send(data);
});

app.listen(3000);