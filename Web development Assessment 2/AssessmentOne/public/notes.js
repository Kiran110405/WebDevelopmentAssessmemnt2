let notes = []; //array for the notes

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes"); //retrieves the saved notes from local storage
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault(); //doesnt cause a refresh and loose the data in the modal/dialog so will still be there
  const title = document.getElementById("noteTitle").value.trim(); //gets value written in this ID and saves it
  const content = document.getElementById("noteContent").value.trim(); //trim to get rid of white space

  notes.unshift({
    //unshift adds new notes to the beggining of the array
    id: generateId(),
    title: title, //the title variable
    content: content, //the content variable
  });

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

//Displays the notes written onto the screen

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-content">${note.content}</p>
    </div>
    `
    ) //creates a div, subheading and text for each note to display then
    .join("");
} //notes.map allows execution for very note in the array

function openNoteDialog() {
  //opens modal and the following Ids
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

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
