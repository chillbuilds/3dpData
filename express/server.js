const express = require('../express');
const path = require('../path');
const app = express();
const db = require('./db/db.json');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("http://localhost:"+port);
})