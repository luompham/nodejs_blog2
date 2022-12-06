const express = require('express');
const app = express();

class SiteController {
    //[GET]/news
    index(req, res) {
        res.render('home');
    }

    //[GET]/news
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
