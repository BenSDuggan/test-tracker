/*
 * Server index
 */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");

const {sum, TestsDataBase} = require('./database.js');

const databasePath = '../tests.json'
const port = process.env.PORT || 3001;

const version = "v0.1.0"

const testDB = new TestsDataBase(databasePath);


/***   API/Routing   ***/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Test Tracker Server</h1>");
});

/*** Get ***/
app.get('/api/v1/version', (req, res) => {
    res.status(200).json({version:version});
});

app.get('/api/v1/tests', (req, res) => {
    res.status(200).json(testDB.getTests());
});

app.get('/api/v1/tests/:tid', (req, res) => {
    res.status(501);
});

/*** Post  ***/
app.post('/api/v1/tests/:tid', (req, res) => {
    console.log(req.body);

    if(req.params.tid != req.body.tid) {
        res.status(400).json({error:"URL tid must match parameter tid"})

        return;
    }

    testDB.saveTest(req.body).then(
        (resolve) => {
            res.status(resolve?201:200).json({message:resolve?"Created":"Updated"});
        },
        (err) => {
            console.log(err);
            res.status(500).json({error:"Could not save test in database"});
        }
    )
});


/***  Delete  ***/
app.delete('/api/v1/test', (req, res) => {
    console.log(req.body);

    res.status(501).send("Got message");
});


  
server.listen(port, () => {
    console.log('listening on ' + port);
});







