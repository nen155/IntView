import { Comment } from './comment';

export interface User{
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  created_at: Date;
  comments: Array<Comment>;
}
