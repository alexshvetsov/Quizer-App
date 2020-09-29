import { User } from './user';
import { Folder } from './folder';
import { Answer } from './answer';
import { MultipuleQuestion } from './multipuleQuestion';

export class FilledQuiz {
    public constructor(
        public answers?: Answer[],
        public folder?: Folder,
        public _id?: string,
        public user?: User, 
        public questionArray?: { realIndex: number, question: MultipuleQuestion | any }[],
        public totalTime?:number,
        public timeLeft?: number,
        public date?: Date

    ) { }
} 