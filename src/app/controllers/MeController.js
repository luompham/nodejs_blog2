const express = require('express');
const app = express();
const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  //[GET]/me/stored/courses
  storeCourses(req, res, next) {


    let courseQuery = Course.find({})
    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({ [req.query.column]: req.query.type });
    }

    Promise.all([courseQuery, Course.countDeleted({})])
      .then(([courses, deletedCount]) => {
        res.render('me/stored-courses', {
          courses: multipleMongooseToObject(courses),
          deletedCount,
        });
      })
      .catch(next)

  };

  //[GET]/me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next)
  };


}

module.exports = new MeController();
