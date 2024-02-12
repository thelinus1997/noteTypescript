import { getNoteCards } from "./noteList";
import { chooseUser } from "./userSelector";
import * as API from "../API/apiCalls";
import * as ResponseInterfaces from "../interfaces/Note";
const app = document.getElementById("app") as HTMLElement;
export async function editNote(
  nameOfNoteAuthorToUpdate: string,
  titleOfNoteToUpdate: string
) {
  app.innerHTML = "";
  const noteElement: HTMLElement = document.createElement("div");
  noteElement.classList.add("note");

  // Create elements for username, title, and note content
  const usernameElement: HTMLElement = document.createElement("h3");
  usernameElement.innerText = `Username: ${nameOfNoteAuthorToUpdate}`;

  const titleElement: HTMLElement = document.createElement("h2");
  titleElement.innerText = `Title: ${titleOfNoteToUpdate}`;
  const messageInput: HTMLTextAreaElement = document.createElement("textarea");
  messageInput.classList.add("messageInput");
  messageInput.placeholder = "Enter your note message";

  const headerContainer: HTMLElement = document.createElement("div");
  headerContainer.classList.add("noteWriteHeader");

  const submitButton: HTMLButtonElement = document.createElement("button");
  submitButton.classList.add("submitButton");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", async () => {
    await handleNoteUpdate(
      nameOfNoteAuthorToUpdate,
      titleOfNoteToUpdate,
      messageInput.value
    );
  });

  const goBackButton: HTMLElement = document.createElement("div");
  goBackButton.classList.add("goBack");
  goBackButton.addEventListener("click", () =>
    getNoteCards(nameOfNoteAuthorToUpdate)
  );

  const changeUserButton: HTMLElement = document.createElement("div");
  changeUserButton.classList.add("changeUser");
  changeUserButton.addEventListener("click", chooseUser);

  // Append the note container to the app
  headerContainer.append(goBackButton, changeUserButton);
  noteElement.append(
    headerContainer,
    usernameElement,
    titleElement,
    messageInput,
    submitButton
  );
  app.append(noteElement);
  console.log(nameOfNoteAuthorToUpdate);
  console.log(titleOfNoteToUpdate);
}
async function handleNoteUpdate(
  name: string,
  inputTitle: string,
  inputNote: string
) {
  const writeNote: ResponseInterfaces.WriteNote = {
    username: name,
    title: inputTitle,
    note: inputNote,
  };
  const responseNotes = await API.getNotes(writeNote.username);
  console.log(writeNote);
  responseNotes.notes.forEach(async (note) => {
    if (writeNote.title === note.title) {
      console.log("match found with ID: ", note.id);
      await API.updateNotes(note.id, writeNote);
      getNoteCards(writeNote.username);
    }
  });
}
