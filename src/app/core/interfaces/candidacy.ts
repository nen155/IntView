import { Candidate } from './candidate';
import { Interview } from './interview';

export interface Candidacy{
  id: number;
  accept_date: Date | null;
  invitate_date: Date;
  dead_line_date: Date;
  hire_state: string;
  interview: Interview;
  candidate: Candidate;
}
