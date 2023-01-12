const express = require('express');
const app = express();
const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');


class UserController {
  //[GET]/users/signup
  signup(req, res, next) {
    res.render('users/signup')
  }

  //[POST]/users/store
  store(req, res, next) {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(() => res.redirect('/users/store/protected-page'))
      .catch(next);
    req.session.user = newUser

  }

  //[GET]/users/store/protected-page
  storedUsers(req, res, next) {
    User.find({})
      .then(function (user) {
        res.render('users/protected-page', {
          user: multipleMongooseToObject(user),
        })
      })
      .catch(next)
  }

  //[GET]/users/login
  show(req, res, next) {
    res.render('users/login')
  }

  login(req, res, next) {
    let email = req.body.email
    let password = req.body.password

    let user = User.find({ email: email }, function (err, data) {
      // if (err) return done(err);
      //res.json(data)
    })

    if (!user) {
      res.render('users/login', { error: 'User does not exist.' });
      return;
    };
    if (user.password !== password) {
      res.render('users/login', { error: 'Wrong password.' });
      return;
    }
    res.redirect('/users/store/protected-page')
  }

}

module.exports = new UserController();
