export interface Publication {
  id: number;
  username: string;
  title: string;
  content: string;
  image: string;
  comments: Comment[];
}

export interface Comment {
  username: string;
  content: string;
  date: string;
}