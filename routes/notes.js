const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile,  } = require('../helpers/fsUtils');
  
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route 
notes.get('/:id', (req, res) => {
  const notesId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');
    });
});

// DELETE Route 
notes.delete('/:id', (req, res) => {
  const notesId = req.params.tip_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((id) => notes.Id !== Id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${Id} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;