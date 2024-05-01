const express = require('express');
const fetch = require('node-fetch'); 
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const apiUrl = 'http://api:3001/api/names'


app.get('/', (req, res) => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(names => res.render('index', { names }))
        .catch(err => res.status(500).json(err));
});

app.post('/add-name', (req, res) => {
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ name: req.body.name }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => res.redirect('/'))
    .catch(err => res.status(500).json(err));
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
