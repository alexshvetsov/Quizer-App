import { Folder } from "./folder";
import { User } from "./user";


export class RegularQuestion{
    public constructor(
        public _id?:string,
        public answer?:string,
        public question?:string,
        public folder?:Folder,
        public user?:User
    ){} 
}