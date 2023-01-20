const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');

const app=express();
if(config.env ==='development')
{
app.use(logger('dev'));
}

const distDir = path.join(__dirname, '../../dist');

app.use(express.static(distDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(helmet());

app.use(cors());

app.use(passport.initialize());


app.use('/api/',routes);

app.get('*',(req,res) => res.sendFile
(path.join(distDir,'index.html')));

module.exports = app;

