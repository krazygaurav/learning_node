console.log("App started");

const fs = require("fs");
const notes = require("./notes.js");
const _ = require("lodash");
const yargs = require("yargs");


const argv = yargs.argv;
// var command = process.argv[2];
var command = argv._[0];

// console.log("\nProcess..\n"+process.argv);
// console.log("\n\nYargs..\n"+argv);

if (command === "add"){
    var note = notes.addNote(argv.title, argv.body)
    if(note){
        console.log("Note added");
        notes.logNote(note);
    }else{
        console.log("Sorry!!! Note taken");
    }
} else if(command === "remove"){
    var success = notes.remove(argv.title);
    success ? console.log("Note removed") : console.log("Note not found");
} else if(command === "list"){
    var allNotes = notes.getAll();
    for(var i=0;i<allNotes.length; i++){
        notes.logNote(allNotes[i]);
    }
} else if(command === "read"){
    var note = notes.getNote(argv.title);
    if(note){
        console.log("Note found");
        notes.logNote(note);
    }else{
        console.log("Sorry!!! Note not found");
    }
} else{
    console.log("Wrong command");
}

