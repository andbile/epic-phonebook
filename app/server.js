const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon')

const hbs = require("hbs");
const config_content = require('./config/config_content') // general site content for handlebars

const PhoneBook = require('./components/phone_book/PhoneBook') // telephone and e-mail directory

const port = 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
app.use(bodyParser.json());

// handlebars template
hbs.registerPartials(path.join(__dirname, 'components'));
app.set('views', path.join(__dirname, 'components'))
app.set("view engine", "hbs");

// get array index starting from 1
hbs.registerHelper("inc", value => {
    return parseInt(value) + 1;
});

// general site content for handlebars
hbs.registerHelper('config_content', options => {
    return options.fn(config_content);
})


app.get('/', (req, res) => {
    //res.send('ok')
    res.render('index/index.hbs')
});

app.get('/admin', (req, res) => {
    //res.send('ok')
    console.log('test2');
    res.render('admin/admin')
});

// telephone and e-mail directory
app.get('/phone_book', (req, res) => {
    new PhoneBook(req, res);
});