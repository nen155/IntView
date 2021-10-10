import { User } from './user';

export interface Comment{
  id: number;
  description: string;
  date: Date | string;
  user: User;
  id_question: number;
}
