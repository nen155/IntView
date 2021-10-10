import { Question } from './question';
import { File } from './file';
import { Comment } from './comment';

export interface Answer{
  id: number;
  description: string;
  video_answer: string;
  thumbnail_video_answer: string;
  duration: number;
  score: number;
  comments: Array<Comment>;
  files: Array<File>;
  question: Question;
}
