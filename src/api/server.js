const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

let googlePlayReviews = require('google-play-scraper');
let appStoreReviews = require('./app-store-scraper');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.post('/mobile_store_proxy/google_play', (req, res) => {
    googlePlayReviews.reviews({
        appId: req.body.appId,
        lang: req.body.lang,
        sort: googlePlayReviews.sort.NEWEST,
        paginate: true,
        nextPaginationToken: req.body.nextPaginationToken
    })
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(
            error => {
                res.json({'error': error})
            }
        );
});

app.post('/mobile_store_proxy/app_store', (req, res) => {
    appStoreReviews.ratings({
        id: req.body.appId,
        country: req.body.countryCodes
    })
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(
            error => {
                res.json({'error': error})
            }
        );
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port} (´• ω •)`);
});