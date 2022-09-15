export interface Note {
  title: string;
  description: string;
  owner: string;
}

export interface SWRreturn {
  data: Note[];
  error: any;
}
