// Initialize modules
const fs = require('fs');

// Add a new note
const addNote = (title, body) => {
  // Load notes
  const notes = loadNotes();

  // Check for dulplicate notes title
  const duplicateTitle = notes.find(note => note.title === title);

  if (!duplicateTitle) {
    // Add new note to notes array
    notes.push({ title, body });

    // Save the notes array
    saveNotes(notes);
    console.log('New note added');
  } else {
    console.log('Note title taken');
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

module.exports = { addNote };
