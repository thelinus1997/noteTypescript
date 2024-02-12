// Import your necessary modules and interfaces
import * as API from "../API/apiCalls";
import { renderNoteWriter } from "./noteWriter";
import * as ResponseInterfaces from "../interfaces/Note";
import { editNote } from "./noteEditor";

// Reference to the app container
const app: HTMLElement = document.getElementById("app") as HTMLElement;

// Function to get note cards
export async function getNoteCards(input: string) {
  app.innerHTML = "";
  console.log(input);
  try {
    const responseData: ResponseInterfaces.ResponeNote = await API.getNotes(
      input
    );
    console.log(responseData);

    if (!responseData.notes[0]) {
      renderNoteWriter(input);
    } else {
      console.log("in else");
      renderNotes(responseData.notes);
    }
  } catch (error) {
    console.log("No notes found" + error);
    renderNoteWriter(input);
  }
}

// Function to render notes
async function renderNotes(
  fetchedNotes: {
    note: string;
    username: string;
    title: string;
  }[]
) {
  // Assuming you want to create some DOM elements for each note
  fetchedNotes.forEach((note) => {
    const noteElement: HTMLElement = document.createElement("div");
    noteElement.classList.add("note");

    // Create elements for username, title, and note content
    const usernameElement: HTMLElement = document.createElement("h3");
    usernameElement.innerText = `Username: ${note.username}`;

    const titleElement: HTMLElement = document.createElement("h2");
    titleElement.innerText = `Title: ${note.title}`;

    const noteContentElement: HTMLElement = document.createElement("p");
    noteContentElement.innerText = `Note: ${note.note}`;
    noteContentElement.style.whiteSpace = "pre-wrap";
    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.classList.add("editNoteButton");
    editButton.addEventListener("click", () =>
      editNote(note.username, note.title)
    );
    editButton.innerText = "Edit";

    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.classList.add("deleteNoteButton");
    deleteButton.addEventListener(
      "click",
      async () => await handleDeleteNote(note.title, note.username)
    );
    deleteButton.innerText = "Delete";

    // Append elements to the note container
    noteElement.append(
      usernameElement,
      titleElement,
      noteContentElement,
      editButton,
      deleteButton
    );

    // Append the note container to the app
    app.append(noteElement);
  });

  // Create a single new note button for the entire set of notes
  const newNoteButton: HTMLButtonElement = document.createElement("button");
  newNoteButton.classList.add("newNoteButton");
  const username = fetchedNotes[0].username; // Assuming there's only one username in the fetchedNotes array

  newNoteButton.addEventListener("click", () => {
    // Use a closure to capture the username value
    handleNewNoteButtonClick(username);
  });

  newNoteButton.innerText = "New note";
  app.append(newNoteButton);
}

// Function to handle new note button click
function handleNewNoteButtonClick(username: string) {
  // Handle the new note button click, for example, by rendering the note writer
  renderNoteWriter(username);
}
async function handleDeleteNote(
  titleToDelete: string,
  nameOfNoteAuthor: string
) {
  try {
    console.log(titleToDelete);

    // Get the current list of notes
    const currentTitles = await API.getNotes(nameOfNoteAuthor);
    console.log(currentTitles.notes);

    // Filter out the note to delete
    const filteredNotes = currentTitles.notes.filter(
      (note) => note.title !== titleToDelete
    );

    // Delete the note using the API call
    await Promise.all(
      currentTitles.notes
        .filter((note) => note.title === titleToDelete)
        .map(async (note) => await API.deleteNote(note.id))
    );

    // Render the updated list of notes
    renderNotes(filteredNotes);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}
