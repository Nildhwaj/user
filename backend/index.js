const express = require('express');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/index');
const app = express();
const cors = require('cors');
var PORT = process.env.PORT || 5020;

app.use(cors());
app.use('/images',express.static('images'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect('"mongodb://localhost:27017/userData', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected');
})

app.use('/user', userRouter);
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})



