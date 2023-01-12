const siteRouter = require('./site');
const newsRouter = require('./news');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const usersRouter = require('./users');

function route(app) {
  app.use('/news', newsRouter);

  app.use('/courses', coursesRouter);

  app.use('/me', meRouter);

  app.use('/users', usersRouter);

  app.use('/', siteRouter);


}

module.exports = route;
