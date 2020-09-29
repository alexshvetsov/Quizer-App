import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";
import { postFilledQuizesByUser } from "../utils/Helper";
import { FilledQuiz } from "../models/filledQuiz";
import { User } from "../models/user";

export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {

    // ריק AppState החזר אובייקט Ever בקריאה הראשונה
    if (!oldAppState) {
        return new AppState();
    }

    // הישן לאחד חדש AppState-עבור כל קריאה אחרת - שכפל את ה
    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.login:
            newAppState.user = action.payload;
            newAppState.isLogged = true;
            break;

        case ActionType.logout:
            newAppState.filledQuiz = new FilledQuiz()
            newAppState.filledQuizes = []
            newAppState.isLogged = false
            newAppState.user = new User()
            break;

        case ActionType.addFolder:

            newAppState.folders.push(action.payload);
            break;

        case ActionType.getAllFolders:
            newAppState.folders = action.payload;
            break;

        case ActionType.getAllMultipuleQuestions:
            newAppState.multipuleQuestions = action.payload
            break;

        case ActionType.getAllRegularQuestions:
            newAppState.regularQuestions = action.payload
            break;

        case ActionType.OpenFolder:
            newAppState.folder = action.payload
            break;

        case ActionType.addMultipuleQuestion:
            newAppState.multipuleQuestions.push(action.payload)
            break;

        case ActionType.startQuiz:
            newAppState.filledQuiz = action.payload
            break;

        case ActionType.finishQuiz:
            newAppState.filledQuiz.answers = newAppState.answers
            newAppState.filledQuiz.timeLeft = action.payload
            newAppState.filledQuizes.push(newAppState.filledQuiz)
            postFilledQuizesByUser(newAppState.filledQuiz)
            break;

        case ActionType.setAnswer:
            if (newAppState.answers.findIndex((a) => a.realIndex === action.payload.realIndex) >= 0) {
                //פה להוסיף אם יש כבר וזה אותה תשובה אז למחוק (לא בטוח שצריך
                newAppState.answers[newAppState.answers.findIndex((a) => a.realIndex === action.payload.realIndex)] = action.payload
            } else {
                newAppState.answers.push(action.payload)
            }
            break;

        case ActionType.getAllFinishedQuizes:
            newAppState.filledQuizes = action.payload
            break;

        case ActionType.clearAnswers:
            newAppState.answers = []
            break;

        case ActionType.switchform:

            newAppState.switchForm = action.payload === '/sign-in' ? '/sign-in' : '';
            break;

        case ActionType.saveHistory:
            newAppState.history = action.payload;
            break;
    }

    return newAppState;
}   