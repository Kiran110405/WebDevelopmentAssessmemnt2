let notes = []; //array for the notes
let editingNoteId = null;

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes"); //retrieves the saved notes from local storage
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault(); //doesnt cause a refresh and loose the data in the modal/dialog so will still be there
  const title = document.getElementById("noteTitle").value.trim(); //gets value written in this ID and saves it
  const content = document.getElementById("noteContent").value.trim(); //trim to get rid of white space

  if (editingNoteId) {
    //Update existing Note

    const noteIndex = notes.findIndex((note) => note.id === editingNoteId); //.findIndex searches the global notes array
    notes[noteIndex] = {
      //use to access notes array at the exact index
      ...notes[noteIndex], //spread operator to keep all data in the notes exactly the same
      title: title, //title of the input section
      content: content, //content of the input section
    };
  } else {
    //add new note
    notes.unshift({
      //unshift adds new notes to the beggining of the array
      id: generateId(),
      title: title, //the title variable
      content: content, //the content variable
    });
  }

  closeNoteDialog();
  saveNotes();
  renderNotes(); //dont have to refresh the page to see the new notes does it automatically
} //function adds all the saved notes to the let notes array

function generateId() {
  return Date.now().toString(); //converts Date.now into a string
} //returns current time stamp as a string

function saveNotes() {
  console.log("quickNotes", JSON.stringify(notes)); //turns the notes array into a readable string
  localStorage.setItem("quickNotes", JSON.stringify(notes)); //turns the notes array into a readable string
} //calls the saved not function to the local storage and stringifies them with JSON

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id != noteId);
  saveNotes(); //saves the notes of the new array
  renderNotes(); //renders the new array onto the HTML when the notes are deleted
}
//Displays the notes written onto the screen

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-content">${note.content}</p>
    <div class="note actions">
    <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.03 
            0-1.42l-2.34-2.34a1 1 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
    </svg>
    </button>
    <button class="delete-btn" onclick="deleteNote('${note.id}')" title="delete Note">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
    </button>
    </div>
    </div>
    `
    ) //creates a div, subheading and text for each note to display then
    .join("");
} //notes.map allows execution for very note in the array

function openNoteDialog(noteId = null) {
  //opens modal and the following Ids
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    //edit mode
    const noteToEdit = notes.find((note) => note.id === noteId); //finds the note that you want to edit and find the note with the same ID as note.id
    editingNoteId = noteId;
    document.getElementById("dialogTitle").textContent = "Edit Note";
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
  } else {
    //add mode
    editingNoteId = null; //set to null because not editing a note ID but creating a new one
    document.getElementById("dialogTitle").textContent = "Add New Note";
    titleInput.value = "";
    contentInput.value = "";
  } //else statement handles what the model will look like

  dialog.showModal(); //will open up dialog element(const dialog)
}

function closeNoteDialog() {
  document.getElementById("noteDialog").close();
} //closes modal and the following Ids

document.addEventListener("DOMContentLoaded", function () {
  //waits until HTML page is fully loaded
  notes = loadNotes(); //calls loadNotes function to grab from local storage
  renderNotes(); //displaying the notes

  document.getElementById("noteForm").addEventListener("submit", saveNote); //when the note is 'submitted the note is now saved as"saveNote" is the function to save it

  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      } //If click anywhere outside of the modal the modal will close
    });
}); //called on every refresh on the page
