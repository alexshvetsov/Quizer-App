import { User } from './user';

export class Folder {
    public constructor(
        public name: string="",
        public _id?: string ,
        public user?: User
    ) { }
} 