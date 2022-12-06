const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const { engine } = require('express-handlebars');
const route = require('./routes/index');

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set("view engine", '.hbs');
app.set("views", './src/resources/views');

app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, 'public')));

// Router init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
