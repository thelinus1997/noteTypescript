import { getNoteCards } from "./noteList";

export function chooseUser() {
  const app: HTMLElement = document.getElementById("app") as HTMLElement;
  app.innerHTML = "";
  const mainContainer: HTMLElement = document.createElement("div");
  mainContainer.classList.add("mainContainer");
  const titleText: HTMLElement = document.createElement("h1");
  titleText.classList.add("titleText");
  titleText.innerText = "Enter your name";
  const userNameInput: HTMLInputElement = document.createElement("input");
  userNameInput.classList.add("userNameInput");
  const button: HTMLButtonElement = document.createElement("button");
  button.classList.add("nameSelectButton");
  button.innerText = "Continue";

  const handleUserNameInput = () => getNoteCards(userNameInput.value);

  button.addEventListener("click", handleUserNameInput);

  userNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleUserNameInput();
    }
  });
  mainContainer.append(titleText, userNameInput, button);
  app.appendChild(mainContainer);
}
