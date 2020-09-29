import { User } from './user';
import { Folder } from './folder';

export class Question {
    public constructor(
        public name: string="",
        public _id?: string ,
        public user?: User,
        public folder?: Folder,
        public question?:string,
        public answers?:string[]
    ) { }
} 