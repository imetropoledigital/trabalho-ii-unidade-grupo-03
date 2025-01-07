const express = require('express');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  user: 'root',
  pass: 'root',
  dbName: 'users',
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  _id: Number
});

userSchema.plugin(AutoIncrement, { inc_field: '_id' });

const User = mongoose.model('users', userSchema);



/**
 * Post (create) a new entity
 */
app.post('/users', async (req, res) => {
  const data = req.body;

  try {
    const entity = new User(data);
    await entity.save();
    res.status(201).send(entity);
  } catch (error) {
    res.status(500).send({ error: 'Error creating entity', details: error.message });
  }
});


/**
 * Get all entities
 */
app.get("/users" , async (req, res) => {

  try {
    const { query = '{}', fields, limit = 10 } = req.query;
    let { skip = 1 } = req.query;

    const projection = fields
        ? fields.split(',').reduce((acc, field) => {
            acc[field.replace('-', '')] = field.startsWith('-') ? 0 : 1;
            return acc;
          }, {})
        : null;

      skip = (skip - 1) * limit;

    let parsedQuery = JSON.parse(query);

    const entities = await User.find(parsedQuery, projection).skip(skip).limit(parseInt(limit));

    return res.json(entities);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


/**
 * Get a specific entity by ID
 */
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await User.findById(id);
    if (!entity) return res.status(404).send({ error: 'Entity not found' });
    res.send(entity);
  } catch (error) {
    res.status(500).send({ error: 'Error retrieving entity', details: error.message });
  }
});


/**
 * Update an entity by ID
 */
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const entity = await User.findByIdAndUpdate(id, data, { new: true });
    if (!entity) return res.status(404).send({ error: 'Entity not found' });
    res.send(entity);
  } catch (error) {
    res.status(500).send({ error: 'Error updating entity', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
