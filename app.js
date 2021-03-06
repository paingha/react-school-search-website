const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '.', 'public')));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/*', (req, res, next) => {
  res.render('index');
});

app.listen(8081, ()=>{
console.log('Server running...')
})