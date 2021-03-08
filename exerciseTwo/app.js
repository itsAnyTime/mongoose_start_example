// REFACTORING

/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path')

// from root project
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// get rid of that
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const app = express();
const port = 3000;

// almost like root project // name variable like you want
const userDataSchema = new mongoose.Schema({
    fname: String,
    lname: String
}, { collection: 'users'});

// same like root project: compiling our schema into a Model
const userData = mongoose.model('UserData', userDataSchema);

// const url = 'mongodb://localhost:27017';
// const dbName = 'test2'
// const client = new MongoClient(url);

//middleware
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/getData.html'));

app.use(express.urlencoded({extended:true}))


//GET
app.get('/get', function(req, res){

    // remove the Mongo Connection lines:
    // MongoClient.connect(url, (err, client) => {
    //     assert.strictEqual(null, err);
    //     //const collection = db.collection('users');
    //     const resultArray = []
    //     console.log("Connected!!!!");
    //     const db = client.db(dbName);
    //     const collection = db.collection('users');
    //     const info = collection.find();
    //     info.forEach(function(doc, err) {            
    //         console.log(doc);            
    //         resultArray.push(doc);
            
    //     }, function(){
    //         res.send(JSON.stringify(resultArray));
    //     })
        
    // })

    // find data and send to client
    userData.find().then(function(docs) {
        res.send(docs)
    })
       
})


//POST
app.post('/', (req, res) => {
    console.log(req.body);  
   const name = {
        fname: req.body.fname,
        lname: req.body.lname
    };

    // remove that lines
    // MongoClient.connect(url, (err, client) => {
    //     assert.strictEqual(null, err);
    //     console.log("Connected!!!!");
    //     const db = client.db(dbName);
    //     const collection = db.collection('users');
    //     collection.insertOne(item);
    // })
    // res.redirect('/get')

    // construct document
    const data = new userData(name);
    // save it
    data.save();
})

app.listen(port, ()=> console.log('Listening on port: ' + port))