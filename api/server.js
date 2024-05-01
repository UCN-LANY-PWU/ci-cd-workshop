const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Schema for the Name
const nameSchema = new mongoose.Schema({
  name: String
});
const Name = mongoose.model('Name', nameSchema);

// POST endpoint to add a new name
app.post('/api/names', (req, res) => {
  const newName = new Name({ name: req.body.name });
  newName.save()
    .then(() => res.status(201).send('Name added'))
    .catch(err => res.status(400).json(err));
});

// GET endpoint to fetch all names
app.get('/api/names', (req, res) => {
  Name.find()
    .then(names => res.json(names))
    .catch(err => res.status(400).json(err));
});

// Connect to MongoDB
// TODO: You must change the connectionstring to MongoDB when deploying in docker compose
mongoose.connect('mongodb://ci-cd-database:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
