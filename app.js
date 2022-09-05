'use strict'
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const manager = require('./routes/manager');
const index = require('./routes/index');

app.use(express.urlencoded({extended: false}))

app.use('/', index); // ruta princial
app.use('/manager', manager);


app.listen(3000, function() {
  console.log('Aplicación Manager, escuchando el puerto 3000!');
});