import { Answer } from './answer';
import { Candidacy } from './candidacy';

export interface Candidate{
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  image: string;
  score: number;
  candidacys: Array<Candidacy>;
  answers: Array<Answer>;
  candidacy_id: number;
}
