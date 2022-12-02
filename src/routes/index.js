const express = require('express');
const app = express();

const newsRouter = require('./news');

function route(app) {

    // app.get('/news', (req, res) => {
    //     return res.render('news')
    // });

    app.use('/news', newsRouter);

    app.get('/search', (req, res) => {
        // console.log(req.query.q); Lấy tham số query parameter trên url
        return res.render('search')
    });


    app.get('/', (req, res) => {
        return res.render('home')
    });

}

module.exports = new route;
