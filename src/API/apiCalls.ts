import axios, { AxiosResponse } from "axios";
import * as ResponseInterfaces from "../interfaces/Note";

// const getNotes = async (
//   userName: string
// ): Promise<ResponseInterfaces.ResponeNote> => {
//   try {
//     const response: AxiosResponse<ResponseInterfaces.ResponeNote> =
//       await axios.get(
//         `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${userName}`
//       );

//     const responseData: ResponseInterfaces.ResponeNote = response.data;
//     return responseData;
//   } catch (error) {
//     console.error(error);
//     // Return an empty array if there's an error
//     return { success: false, notes: [] };
//   }
// };

// const updateNotes = async (
//   noteId: string,
//   note: ResponseInterfaces.WriteNote
// ): Promise<void> => {
//   try {
//     const requestBody = {
//       note: note.note,
//     };
//     const response = await axios.put(
//       `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`,
//       requestBody,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Handle response as needed
//     console.log(response.data); // Access response data
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//   }
// };

// const postNote = async (note: ResponseInterfaces.WriteNote): Promise<void> => {
//   try {
//     await axios.post(
//       "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes",
//       note
//     );
//     console.log("Note posted successfully");
//   } catch (error) {
//     console.error("Error posting note:", error);
//     // Handle error or throw it if needed
//     throw error;
//   }
// };

// const deleteNote = async (noteId: string): Promise<void> => {
//   try {
//     await axios.delete(
//       `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`
//     );
//     console.log("Note deleted successfully");
//   } catch (error) {
//     console.error("Error deleting note:", error);
//     // Handle error or throw it if needed
//     throw error;
//   }
// };

// export { getNotes, updateNotes, postNote, deleteNote };

// Generic API call function
const fetchData = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        // Add other headers if needed
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
};

// Example usage of the generic API call
export const getNotes = async (
  userName: string
): Promise<ResponseInterfaces.ResponeNote> => {
  const url = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${userName}`;
  return fetchData<ResponseInterfaces.ResponeNote>(url, "GET");
};

// You can similarly use the generic function for other API calls
export const postNote = async (
  note: ResponseInterfaces.WriteNote
): Promise<void> => {
  const url =
    "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes";
  await fetchData<void>(url, "POST", note);
};

export const updateNote = async (
  noteId: string,
  note: ResponseInterfaces.WriteNote
): Promise<void> => {
  const updatedNote = {
    note: note.note,
  };
  const url = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`;
  await fetchData<void>(url, "PUT", updatedNote);
};

export const deleteNote = async (noteId: string): Promise<void> => {
  const url = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${noteId}`;
  await fetchData<void>(url, "DELETE");
};
