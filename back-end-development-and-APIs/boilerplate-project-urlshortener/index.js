require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(process.env.MONGO_URI, clientOptions);

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/api/shorturl', bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Mongoose models
const urlSchema = new mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: Number, required: true},
})

const Url = mongoose.model('Url', urlSchema);

// Redirect to long url
app.get('/api/shorturl/:shorturl', function(req, res) {
  const urlId = Number(req.params.shorturl);

  if (isNaN(urlId)) {
    res.json({"error": "invalid url"});
    return;
  }

  Url.findOne({shortUrl: urlId})
    .then(url => {
      if (url) {
        if (/^https?:\/\//.test(url.url)) {
          res.redirect(url.url);
        } else {
          res.redirect("http://" + url.url)
        }
      } else {
        res.send("Unknown short url.");
      }
    })
    .catch(err => console.log(err));
});

// create new short url
app.post('/api/shorturl', (req, res) => {
  const longUrl = req.body.url;
  
  // check if url is valid
  const hostname = /^(?:.*?:\/\/)?(.*?)(?:\/|$|\?)/.exec(longUrl)[1]
  dns.lookup(hostname, (err, ip) => {
    if (err) {
      res.json({"error": "invalid url"});
      return;
    }

    // check if url is already in database
    Url.findOne({url: longUrl})
    .then(record => {
      if (record) {
        res.json({ "original_url": record.url, "short_url": record.shortUrl });
        return;
      }

      // insert new record
      Url.countDocuments()
      .then(docCount => {
        const entry = new Url({ url: longUrl, shortUrl: docCount });
        entry
          .save()
          .then(record => {
            res.json({ "original_url": record.url, "short_url": record.shortUrl });
            return;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    });
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
