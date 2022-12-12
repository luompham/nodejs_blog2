const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const { engine } = require('express-handlebars');
const route = require('./routes/index');
const db = require('./config/db');

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b
    }
  }),
);
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

//Method-override
app.use(methodOverride('_method'));

// Router init
route(app);

//Connect to Database
db.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
