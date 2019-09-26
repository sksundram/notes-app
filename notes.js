// Initialize modules
const fs = require('fs');
const chalk = require('chalk');

// Add a new note
const addNote = (title, body) => {
  // Load notes
  const notes = loadNotes();

  // Check for dulplicate notes
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    // Add new note to notes array
    notes.push({ title, body });

    // Save the notes array
    saveNotes(notes);
    console.log(chalk.green('New note added'));
  } else {
    console.log(chalk.red('Note title taken'));
  }
};

// Remove a note
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red('Note not found'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green('Note removed'));
  }
};

// List all notes
const listNotes = () => {
  const notes = loadNotes();

  if (notes.length > 0) {
    console.log(chalk.magenta('Your Notes:'));
    notes.forEach(note => console.log(chalk.gray(note.title)));
  } else {
    console.log(chalk.red('There are no notes'));
  }
};

// Read a note
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.bold.green(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('Note not found'));
  }
};

// Take an array of notes and write it to a file
const saveNotes = notes => {
  // Convert to string
  const dataJSON = JSON.stringify(notes);
  // Write to file
  fs.writeFileSync('notes.json', dataJSON);
};

// Return an array of notes
const loadNotes = () => {
  try {
    // Read from a file, return a Buffer
    const dataBuffer = fs.readFileSync('notes.json');
    // Convert to string
    const dataJSON = dataBuffer.toString();
    // Convert to an array
    return JSON.parse(dataJSON);
  } catch (error) {
    // If 'notes.json' doesn't exist or it's an empty file
    return [];
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
