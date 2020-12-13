const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const bodyParser = require('body-parser');

const port = 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());

// handlebars template
hbs.registerPartials(path.join(__dirname, 'components'));
app.set('views', path.join(__dirname, 'components'))
app.set("view engine", "hbs");

hbs.registerHelper("inc", (value) => {
    return parseInt(value) + 1;
});


app.get('/', (req, res) => {
    //res.send('ok')
    res.render('index/index.hbs')
});

app.get('/admin', (req, res) => {
    //res.send('ok')
    console.log('test2');
    res.render('admin/admin')
});