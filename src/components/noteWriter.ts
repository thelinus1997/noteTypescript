import { getNoteCards } from "./noteList";
import { chooseUser } from "./userSelector";
import * as ResponseInterfaces from "../interfaces/Note";
import * as API from "../API/apiCalls";
import { ResponeNote } from "../interfaces/Note";
const app = document.getElementById("app") as HTMLElement;
export async function renderNoteWriter(name: string) {
  app.innerHTML = "";
  const mainContainer: HTMLElement = document.createElement("div");
  mainContainer.classList.add("writeMessageContainer");
  const headerContainer: HTMLElement = document.createElement("div");
  headerContainer.classList.add("noteWriteHeader");
  const titleInput: HTMLInputElement = document.createElement("input");
  titleInput.classList.add("titleInput");
  titleInput.placeholder = "Enter note title";

  const messageInput: HTMLTextAreaElement = document.createElement("textarea");
  messageInput.classList.add("messageInput");
  messageInput.placeholder = "Enter your note message";

  const submitButton: HTMLButtonElement = document.createElement("button");
  submitButton.classList.add("submitButton");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", () => {
    const titleValue: string = titleInput.value.trim();
    const noteValue: string = messageInput.value.trim();
    trySendNote(name, titleValue, noteValue);
  });

  const goBackButton: HTMLElement = document.createElement("div");
  goBackButton.classList.add("goBack");
  goBackButton.addEventListener("click", () => getNoteCards(name));

  const changeUserButton: HTMLElement = document.createElement("div");
  changeUserButton.classList.add("changeUser");
  changeUserButton.addEventListener("click", chooseUser);

  headerContainer.append(goBackButton, changeUserButton);
  mainContainer.append(headerContainer, titleInput, messageInput, submitButton);
  app.append(mainContainer);
}

async function trySendNote(
  name: string,
  inputTitle: string,
  inputNote: string
) {
  let duplicateBool = false;
  if (inputTitle.length >= 5 && inputNote.length >= 5) {
    const writeNote: ResponseInterfaces.WriteNote = {
      username: name,
      title: inputTitle,
      note: inputNote,
    };

    try {
      const responseData: ResponseInterfaces.ResponeNote = await API.getNotes(
        name
      );
      console.log("responseData", responseData.notes);
      responseData.notes.forEach((note) => {
        console.log("input title: ", writeNote.title);
        console.log("response title: ", note.title);
        if (writeNote.title === note.title) {
          duplicateBool = true;
          console.log("same title as other note, duplicates not allowed.");
        }
      });
      if (duplicateBool === false) {
        console.log("title not found");
        await API.postNote(writeNote);
        getNoteCards(name);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Title and note must be at least 5 characters long.");
  }
}
