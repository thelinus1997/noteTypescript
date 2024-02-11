import axios, { AxiosResponse } from "axios";
const note = {
  username: "linus",
  title: "Testar",
  note: "Min testanteckning",
};
const getNotes = async (userName: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${userName}`
    );
    const responseData: JSON[] = response.data.notes;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
const getIdNoteTest = async (testStuff: string) => {
  axios({
    method: "get",
    url: `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${testStuff}`,
  })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const updateNotes = async (noteId: string) => {
  axios({
    method: "put",
    url: `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`, // product with an `id` of 3
    data: {
      note: "ny note",
    },
  })
    .then((response) => console.log(response.data)) // return updated data
    .catch((error) => console.log(error.response));
};
const postNote = async (note: object) => {
  try {
    const dataToSend = note;

    const response: AxiosResponse = await axios.post(
      "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes",
      dataToSend
    );

    const responseData: JSON = response.data;
    console.log(responseData);
    // Process the response data
  } catch (error: any) {
    console.error("Error posting data:", error.response.data);
  }
};
const deleteNote = async (noteId: string) => {
  console.log("deleting");
  try {
    const response: AxiosResponse = await axios.delete(
      `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`
    );
    const responseData: JSON = response.data;
    console.log(responseData);
  } catch (error: any) {
    console.error("Error posting data:", error.response.data);
  }
};
export { getNotes, updateNotes, postNote, deleteNote, getIdNoteTest };
