import { User } from './user';
import { Folder } from './folder';

export class MultipuleQuestion {
    public constructor(
        public answers:string[],
        public folder: Folder,
        public _id?: string ,
        public user?: User,
        public question?:string,
        public correctAnswer?:number
    ) { }
} 