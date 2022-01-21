/*
 * API routes
 * 2022-01-20
 */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");
const { builtinModules } = require('module');

const config = require('./config.js');
const {TestsDataBase} = require('./database.js');

const port = process.env.PORT || config.port;

const testDB = new TestsDataBase();


/***   API/Routing   ***/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Test Tracker Server</h1>");
});

/*** Get ***/
app.get('/api/v1/version', (req, res) => {
    res.status(200).json({version:config.version});
});

app.get('/api/v1/tests', (req, res) => {
    testDB.getTests()
        .then(tests => {
            res.status(200).json(tests);
        })
        .catch(err =>
            res.status(500).json(err))
});

app.get('/api/v1/tests/:tid', (req, res) => {
    testDB.getTest(req.params.tid)
        .then(test => {
            res.status(200).json(test);
        })
        .catch(err =>
            res.status(500).json(err))
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
/*
app.delete('/api/v1/test', (req, res) => {
    console.log(req.body);

    //res.status(501).send("Got message");
});
*/


server.listen(port, () => {
    console.log('listening on ' + port);
});


module.exports.app = app;
module.exports.server = server;






