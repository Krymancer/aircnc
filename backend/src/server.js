const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const routes = require('./routes');

const app = express();

const dbConnectionString = process.env.DB_STRING
    .replace('USER', process.env.DB_USER)
    .replace('PASSWORD', process.env.DB_PASS);

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(process.env.PORT);