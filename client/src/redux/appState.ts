import { User } from "../models/user";
import { Folder } from "../models/folder";
import { MultipuleQuestion } from "../models/multipuleQuestion";
import { RegularQuestion } from "../models/regularQuestion";
import { Answer } from "../models/answer";
import { FilledQuiz } from "../models/filledQuiz";

// מחלקה המכילה את כל המידע הקיים ברמת האפליקציה
export class AppState {
    public user: User= new User();
    public isLogged: boolean =false;
    public folders:Folder[]=[];
    public answers: Answer[]=[];
    public multipuleQuestions:MultipuleQuestion[]=[];
    public regularQuestions:RegularQuestion[]=[];
    public folder:Folder= new Folder();
    public filledQuiz:FilledQuiz= new FilledQuiz() 
    public filledQuizes:FilledQuiz[]= [];
    public switchForm:string='';
    public history:any
}

