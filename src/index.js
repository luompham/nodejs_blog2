const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const { engine } = require('express-handlebars');
const route = require('./routes/index');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors')



app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'bi bi-chevron-expand',
          asc: 'bi bi-sort-down-alt',
          desc: 'bi bi-sort-down'
        }
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc'
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}"></i>
    </a>`
      }
    }
  }),
);
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

//app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

//Method-override
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//Cookies parser middleware
app.use(cookieParser());

//session 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Router init
route(app);

//Connect to Database
db.connect();



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
