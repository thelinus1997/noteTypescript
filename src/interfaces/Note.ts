export interface WriteNote {
  username: string;
  title: string;
  note: string;
}

export interface ResponeNote {
  success: boolean;
  notes: Array<{
    note: string;
    username: string;
    title: string;
    id: string;
    // Add more properties if needed
  }>;
}

export interface ApiError {
  message: string;
  status: number;
}
