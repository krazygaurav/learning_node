const fs = require("fs");

var fetchNotes = () => {
    try{
        var readFile = fs.readFileSync("notes-data.json");
        return notes = JSON.parse(readFile);
    }catch(e){
        console.log("Error occured while adding notes");
        return [];
    }
};
var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    
    var duplicates = notes.filter((note) => note.title === title);
    if (duplicates.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};
var getAll = () => {
    var notes = fetchNotes();
    return notes;
};
var remove = (title) => {
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => title !== note.title);
    saveNotes(newNotes);
    if(notes.length == newNotes.length)
        return false;
    return true;    
}
var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => title == note.title);
    return filteredNotes[0];
}
var logNote = (note) => {
    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote : addNote,
    getAll,
    remove,
    getNote,
    logNote,
};