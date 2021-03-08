// REFACTORING

/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
const port = 3000;



const url = 'mongodb://localhost:27017';
const dbName = 'test2'
const client = new MongoClient(url);

//middleware
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/getData.html'));

app.use(express.urlencoded({extended:true}))


//GET
app.get('/get', function(req, res){
    MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);
        //const collection = db.collection('users');
        const resultArray = []
        console.log("Connected!!!!");
        const db = client.db(dbName);
        const collection = db.collection('users');
        const info = collection.find();
        info.forEach(function(doc, err) {            
            console.log(doc);            
            resultArray.push(doc);
            
        }, function(){
            res.send(JSON.stringify(resultArray));
        })
        
    })
       
})


//POST
app.post('/', (req, res) => {
    console.log(req.body);  
   const item = {
        fname: req.body.fname,
        lname: req.body.lname
    };

    MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);
        console.log("Connected!!!!");
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.insertOne(item);
    })
    res.redirect('/get')
})

app.listen(port, ()=> console.log('Listening on port: ' + port))