const express = require("express");
// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const Keys = require("./Keys");
const Users = require("./Users");

// mongoDB
mongoose.connect("mongodb://localhost/lab10db",
    () => {
        console.log("connectd to mongodb");
    },
    e => {
        console.error(e)
    });

// express js
const app = express();
bodyParser = require('body-parser');
// // support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World 1324211111111111!");
// })

// crud
// create, read, update, delete

app.post("/user", async (req, res) => {
    // if create succesfully, return 201
    // if key exist, return 400
    console.log("post user req.body:", req.body);
    try {
        const key = await Users.create({ key: req.body.key, gender: req.body.gender, name: req.body.name, age: req.body.age })
        // res.status(201).send("Success post key")
        res.sendStatus(201);
    } catch(e){
        // res.status(400).send("Fail on post key")
        res.sendStatus(400);

        console.log("user existt")
    }
})

app.get("/user", async (req, res) => {
    // get all user

    // if success return 200
    
    console.log("get user!!");
    try {
        const userArr = await Users.find({});
        console.log("user: ", userArr)
        const objArr = {
            results: userArr
        }
        res.status(200).send(userArr)
    } catch(e){
        res.status(400).send("Fail on get user")
        console.log("Fail on get user e:", e)
    }
})

app.post("/key", async (req, res) => {
    // if create succesfully, return 201
    // if key exist, return 400
    console.log("post key req.body:", req.body);
    try {
        const key = await Keys.create({ key: req.body.key, value: req.body.value })
        // res.status(201).send("Success post key")
        res.sendStatus(201);
    } catch(e){
        // res.status(400).send("Fail on post key")
        res.sendStatus(400);

        console.log("key existt")
    }
})

app.get("/key", async (req, res) => {
    // get all key
    // respond is array
    /*[ "key1",
        "key2"
    ]*/
    // if success return 200
    
    console.log("get key!!");
    try {
        const keyArr = await Keys.distinct('key')
        res.status(200).send(keyArr)
    } catch(e){
        res.status(400).send("Fail on get key")
        console.log("Fail on get key e:", e)
    }
})

app.get("/key/:keyRequest", async (req, res) => {
    // get specific key value
    console.log("get specific key!!");
    const keyCheck = req.params.keyRequest
    console.log("keyCheck now gsk: ", keyCheck)

    try {
        const queryResult = await Keys.findOne({ key: keyCheck }, {_id: 0, __v: 0})
        const realKey = queryResult.key
        let resultObj = {}
        resultObj[realKey] = queryResult.value
        // const result = {
        //     `${realKey}`: queryResult.value
        // }
        res.status(200).send(resultObj)
    } catch(e){
        // res.status(400).send("Fail on get specific key")
        res.sendStatus(404);
        console.log("Fail on get specific key e:", e)
    }

})

app.put("/key/:keyRequest", async (req, res) => {
    // if key exist, renew it, and return 200
    // if key doesnt exist, create it return 201
    // db.keys.updateOne({key: 'key7'}, { $set: { key: 'key7', value: 'goodValue' }}, { upsert : true } )
    console.log("put key!!!!!!!!!!")
    
    const keyCheck = req.params.keyRequest
    const valueUpdate = req.body.value

    console.log("keyCheck now pk: ", keyCheck)
    console.log("valueUpdate now pk: ", valueUpdate)

    let queryResult = null
    try {
        queryResult = await Keys.findOne({ key: keyCheck }, {_id: 0, __v: 0})
    } catch(e){
        // console.log(e)
        console.log("put no key!!!")
    }
    // update value
    try {
        const updateKey = await Keys.updateOne( {key: keyCheck}, { $set: { key: keyCheck, value: valueUpdate }}, { upsert : true } )
        if(queryResult != null){
            // res.status(200).send("Success put key")
            res.sendStatus(200);
        } else {
            // res.status(201).send("Success create key on put key")
            res.sendStatus(201);
        }
    } catch(e){
        // res.status(400).send("Fail on put key")
        res.sendStatus(400)
    }

})

app.delete("/key/:keyRequest", async (req, res) => {
    // return 200
    console.log("delete keyyyyyyyyy")
    const keyCheck = req.params.keyRequest
    try {
        const deleteKey = await Keys.deleteOne({ key: keyCheck})
        // res.status(200).send("Success delete key")
        res.sendStatus(200)
    } catch(e){
        // res.status(400).send("Fail delete key")
        res.sendStatus(400)
        console.log("fail delete key")
    }
})



app.listen(port, () => {
    console.log(`Lab10 app listening on port ${port}`)
})
