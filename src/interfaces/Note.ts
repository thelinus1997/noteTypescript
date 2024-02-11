interface WriteNote {
  username: string;
  title: string;
  note: string;
}

interface ResponeNote {
  username: string;
  title: string;
  note: string;
}
interface ApiError {
  message: string;
  status: number;
}

export default WriteNote;
