import { Interview } from '../../interfaces/interview';

export class InterviewsData {
    public static readonly INTERVIEWS_LIST : Array<Interview> = [
        {
            id: 1,
            title: "Entrevista 1",
            creation_date: "2019-12-22T04:29:03+00:00",
            modification_date: "2019-12-22T05:29:03+00:00",
            description: "Esta es una entrevista de prueba",
            experiencie: "1 a 2 años",
            explainVideo:"hash del video explicativo si lo hubiese",
            archived: false,
            candidates: [],
            questionsAnswers: [],
            questionsBags: [],
            skills:[]
        },
        {
            id: 2,
            title: "Entrevista 2",
            creation_date: "2019-12-22T05:29:03+00:00",
            modification_date: "2019-12-22T06:29:03+00:00",
            description: "Esta es una entrevista de prueba",
            experiencie: "1 a 2 años",
            explainVideo:"hash del video explicativo si lo hubiese",
            archived: false,
            candidates: [],
            questionsAnswers: [],
            questionsBags: [],
            skills:[]
        },
        {
            id: 3,
            title: "Entrevista 3",
            creation_date: "2019-12-22T06:29:03+00:00",
            modification_date: "2019-12-22T07:29:03+00:00",
            description: "Esta es una entrevista de prueba",
            experiencie: "1 a 2 años",
            explainVideo:"hash del video explicativo si lo hubiese",
            archived: false,
            candidates: [],
            questionsAnswers: [],
            questionsBags: [],
            skills:[]
        },
    ];
}
