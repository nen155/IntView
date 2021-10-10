import { Candidacy } from './candidacy';
import { Question } from './question';
import { QuestionBag } from './questionBag';
import { Skill } from './skill';

export interface Interview {
    id: number;
    title: string;
    user_name: string;
    explain_video: string;
    description: string;
    experiencie: string;
    created_at: string;
    num_candidates: number;
    modification_date: string;
    archived: boolean;
    questions_bags: Array<QuestionBag>;
    questions: Array<Question>;
    skills: Array<Skill>;
    candidacys: Array<Candidacy>;
}
