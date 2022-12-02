const express = require('express');
const app = express();



class NewsController {

    //[GET]/news
    index(req, res) {
        res.render('news');
    };



}

module.exports = new NewsController;
