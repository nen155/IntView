import { Comment } from './comment';

export interface Question{
  id: number;
  title: string;
  description: string;
  retries: number;
  read_time: number;
  answer_time: number;
  important: boolean;
  comments: Array<Comment>;
}
