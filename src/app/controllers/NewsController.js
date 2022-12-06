const express = require('express');
const app = express();

class NewsController {
  //[GET]/news
  index(req, res) {
    res.render('news');
  }

  //[GET]/news
  show(req, res) {
    res.send('Show page');
  }
}

module.exports = new NewsController();
