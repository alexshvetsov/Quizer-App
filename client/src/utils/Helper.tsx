import { store } from "../redux/store";
import { ActionType } from "../redux/actionType";
import { Folder } from "../models/folder";
import { FilledQuiz } from "../models/filledQuiz";


//get user if cookie exists
export const loginUser = async () => {
    await fetch("http://localhost:3001/auth/profile", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => { return response.json(); })
        .then((user) => {
            const action = { type: ActionType.login, payload: user };
            store.dispatch(action);
        })
        .catch(err => alert(err));

}

export const getAllMultipuleQuestions = () => {

    // get all questons if cookie exists
    fetch("http://localhost:3001/api/multipuleQuestions", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => { return response.json(); })
        .then(async (multipuleQuestions) => {
            const action = { type: ActionType.getAllMultipuleQuestions, payload: multipuleQuestions };
            await store.dispatch(action);


        })
        .catch(err => alert(err))

};

export const getAllMultipuleQuestionsById = (id: string) => {

    // get all questons if cookie exists
    fetch("http://localhost:3001/api/multipuleQuestions", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => { return response.json(); })
        .then((multipuleQuestions) => {

            if (Array.isArray(multipuleQuestions)) {
                const action = { type: ActionType.getAllMultipuleQuestions, payload: multipuleQuestions.filter(MQ => MQ.folder._id === id) };
                store.dispatch(action);
            }

        })
        .catch(err => alert(err))




};

export const getAllRegularQuestions = () => {
    // get all questons if cookie exists
    fetch("http://localhost:3001/api/regularQuestions", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => { return response.json(); })
        .then(async (regularQuestions) => {
            const action = { type: ActionType.getAllRegularQuestions, payload: regularQuestions };
            await store.dispatch(action);


        })
        .catch(err => alert(err))

};


export const getAllRegularQuestionsById = (id: any) => {
    // get all questons if cookie exists
    fetch("http://localhost:3001/api/regularQuestions", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => { return response.json(); })
        .then((regularQuestions) => {

            if (Array.isArray(regularQuestions)) {

                const arr = [];
                for (let i = 0; i < regularQuestions.length; i++) {
                    if (regularQuestions[i].folder._id === id) {
                        arr.push(regularQuestions[0])
                    }
                }

                const action = { type: ActionType.getAllRegularQuestions, payload: arr };
                store.dispatch(action);

            }

        })
        .catch(err => alert(err))

};

export const getAllFoldersArray = (id: any) => {
    fetch("http://localhost:3001/api/folders", {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => { return response.json(); })
        .then(async (folders) => {
            let folder = folders.find((f: Folder) => f._id === id);
            let action = { type: ActionType.OpenFolder, payload: folder };
            store.dispatch(action);

            action = { type: ActionType.getAllFolders, payload: folders };
            store.dispatch(action);

        })
        .catch(err => alert(err));

};

export const getAllFolders = () => {
    fetch("http://localhost:3001/api/folders", {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => { return response.json(); })
        .then(async (folders) => {

            const action = { type: ActionType.getAllFolders, payload: folders };
            store.dispatch(action);
        })
        .catch(err => alert(err));

};

export const getAllfilledQuizesByUserID = async () => {
    
    await fetch("http://localhost:3001/api/filledQuizes/filledQuizByUser", {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    }).then(response => { return response.json(); })
        .then(async (filledQuizes) => {
            
            const action = { type: ActionType.getAllFinishedQuizes, payload: filledQuizes }
            store.dispatch(action);
        })
        .catch(err => alert(err))

};



export const postFilledQuizesByUser = (filledQuiz: FilledQuiz) => {

    fetch("http://localhost:3001/api/filledQuizes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(filledQuiz)
    })
        .then(response => response.json())
        .then(async (filledQuiz) => {
        })
        .catch(err => alert(err));
};

