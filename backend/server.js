const express = require('express');
const cors = require('cors');
const captureData = require('./dataCapture');

const app = express();
app.use(cors());

app.get('/zelp/', async function(req, res) {
   var location = req.query.location;
   var data = await captureData(location);

   return res.send(data);
});

app.listen(3000);