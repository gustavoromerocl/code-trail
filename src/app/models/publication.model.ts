export interface Publication {
  id: number;
  username: string;
  title: string;
  content: string;
  image: string;
  comments: Comment[];
  rating?: number;
}

export interface Comment {
  username: string;
  content: string;
  date: string;
}