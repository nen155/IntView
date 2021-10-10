import { Question } from './question';
export interface QuestionBag{
  id: number;
  name:string;
  question_answers: Array<Question>;
}
