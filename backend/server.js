const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb://Amidor:azerty1234@firstproject-shard-00-00-aslqf.mongodb.net:27017,firstproject-shard-00-01-aslqf.mongodb.net:27017,firstproject-shard-00-02-aslqf.mongodb.net:27017/test?ssl=true&replicaSet=FirstProject-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useCreateIndex:true
    });

const connection= mongoose.connection;
connection.once(
    'open',
    ()=>{
        console.log("MongoDB database connection established successfully");
    })

const exercicesRouter = require('./routes/exercices');
const usersRouter = require('./routes/users');

app.use('/exercices',exercicesRouter);
app.use('/users',usersRouter);

app.listen(
    port,
    ()=>{
        console.log('Server is running on port : '+port);
    });