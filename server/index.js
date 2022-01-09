/*
 * Server index
 */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || 3001;

app.get('/hello', (req, res) => {
    res.send("<h1>Server: Hello</h1>");
});

app.post('/api/v1/test', (req, res) => {
    console.log(request.body);
});

app.get('/api/v1/version', (req, res) => {
    res.send("v0.1.0");
});

  
server.listen(port, () => {
    console.log('listening on ' + port);
});







