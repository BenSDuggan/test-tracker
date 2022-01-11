/*
 * Server index
 */

const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");

const databasePath = '../testsdb.json'
const port = process.env.PORT || 3001;


/***   Database   ***/
let tests = {};

function loadTests() {
    /*
     * Load the tests into the variable
     * 
     * Returns: null
     */

    let rawdata = fs.readFileSync(databasePath);
    tests = JSON.parse(rawdata);
}

// TODO
function saveTests() {
    /*
     * Save the tests into the variable
     * 
     * Returns: true if successful, false otherwise
     */

    return false
}

loadTests();


// Getters
function getTest(tid) {
    /*
     * Get a specific test marked by the `tid`
     * 
     * Returns: JSON object with tests
     */

    return tests[tid]
}

function getTests() {
    /*
     * Get all the tests
     * 
     * Returns: JSON object with tests
     */

    return tests
}

// Setters
function saveTest(data) {
    /*
     * Create or update a test. `data` must contain `tid` the test ID.
     * 
     * Returns: true if the test was successfully saved and false otherwise
     */

    console.log('Saving');
    updated = false;
    if(tests.hasOwnProperty(data.tid)) updated = true;

    tests[data.tid] = data;

    fs.writeFile(databasePath, JSON.stringify(tests), (err) => {
        if (err) {
            console.error(err);

            //TODO: Handel updated tests if write fails
        }

        if(updated) console.log('Updated: ' + data.tid);
        else console.log('Created: ' + data.tid);

        return true
    });

    return false
}

// Delete
function deleteTest(tid) {
    /*
     * Delete a specific test marked by the `tid`
     * 
     * Returns: true if the test was successfully deleted
     */

    delete tests[tid];

    fs.writeFile(databasePath, JSON.stringify(tests), (err) => {
        if (err) {
            console.error(err);
        }

        return true
    });

    return false
}


/***   API/Routing   ***/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Test Tracker Server</h1>");
});

/*** Get ***/
app.get('/api/v1/version', (req, res) => {
    res.send("v0.1.0");
});

app.get('/api/v1/test', (req, res) => {
    res.send("TODO");
});

app.get('/api/v1/tests', (req, res) => {
    res.json(getTests());
});

/*** Post  ***/
app.post('/api/v1/test', (req, res) => {
    console.log(req.body);
    saveTest(req.body);

    res.send("Got message");
});


/***  Delete  ***/
app.delete('/api/v1/test', (req, res) => {
    console.log(req.body);
    saveTest(req.body);

    res.send("Got message");
});


  
server.listen(port, () => {
    console.log('listening on ' + port);
});







