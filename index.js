const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});
app.get('/index.css', (req, res) => {
    res.sendFile('index.css', {root: __dirname});
});
app.get('/bundle.js', (req, res) => {
    res.sendFile('bundle.js', {root: __dirname});
});
app.get('/fill.js', (req, res) => {
    res.sendFile('fill.js', {root: __dirname});
});
app.get('/scrape.js', (req, res) => {
    res.sendFile('scrape.js', {root: __dirname});
});
app.get('/movies.json', (req, res) => {
    res.sendFile('movies.json', {root: __dirname});
});
app.get('/series.json', (req, res) => {
    res.sendFile('series.json', {root: __dirname});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});