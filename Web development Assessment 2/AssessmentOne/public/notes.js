let notes = [];

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes"); //retrieves the saved notes from local storage
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault(); //doesnt cause a refresh and loose the data in the modal/dialog so will still be there
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim(); //trim to get rid of white space

  notes.unshift({
    //unshift adds elements to the beggining of the array
    id: generateId(),
    title: title, //the title variable
    content: content, //content variable
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
}

//Displays the notes written onto the screen

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    notesContainer.innerHTML = `
    <div class="empty-state">
    <h2>No Notes Yet</h2>
    <p>Create your first note!</p>
    <button class="add-note-button" onclick="openNoteDialog()">+ Add your first note</button>
    </div>
    `;
    return;
  }
  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-content">${note.content}</p>
    </div>
    `
    ) //creates a div, subheading and text for each note
    .join("");
} //notes.map allows execution for very note in the array

function openNoteDialog() {
  //opens modal and the following Ids
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  dialog.showModal(); //will open up dialog element(cont dialog)
  titleInput.focus(); //curser automatically jumps to title section
}

function closeNoteDialog() {
  //closes modal and the following Ids
  document.getElementById("noteDialog").close();
}

document.addEventListener("DOMContentLoaded", function () {
  notes = loadNotes();
  renderNotes();

  document.getElementById("noteForm").addEventListener("submit", saveNote); //when the note is 'submitted the note is now saved

  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      } //If click anywhere outside of the modal the modal will close
    });
}); //called on every refresh on the page
