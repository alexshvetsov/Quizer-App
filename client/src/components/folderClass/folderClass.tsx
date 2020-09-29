import React, { Component, } from 'react';
import './folderClass.css';
import { Folder } from '../../models/folder';
import { store } from '../../redux/store';
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { AddRegularQuestion } from '../addRegularQuestion/addRegularQuestion';
import { User } from '../../models/user';
import { getAllMultipuleQuestionsById, getAllRegularQuestionsById } from '../../utils/Helper'
import { getAllFoldersArray } from '../../utils/Helper'
import { Unsubscribe } from 'redux';
import { Slider } from '../slider/slider';
import { RegularQuestion } from '../../models/regularQuestion';
import { AddMultipuleQuestion } from '../addMultipuleQuestion/addMultipuleQuestion';
import { NavLink } from 'react-router-dom';
import { ActionType } from '../../redux/actionType';



interface FolderClassState {
    timeLimit: number | undefined;
    multipuleQuestion: MultipuleQuestion;
    multipuleQuestions: MultipuleQuestion[];
    regularQuestions: RegularQuestion[]
    folder: Folder;
    user: User;
    showMenu: boolean;
    MQerrors: {
        question: boolean;
        answer1: boolean;
        answer0: boolean;
    } | any;
}

export class FolderClass extends Component<any, FolderClassState>{

    private unsubscribeStore: Unsubscribe;


    public constructor(props: any) {
        super(props);
        this.state = {
            timeLimit: 0,
            folder: store.getState().folder,
            multipuleQuestions: store.getState().multipuleQuestions,
            regularQuestions: store.getState().regularQuestions,
            user: store.getState().user,
            multipuleQuestion: new MultipuleQuestion([], new Folder()),
            showMenu: false,
            MQerrors: {
                question: false,
                answer1: false,
                answer0: false
            }
        };
        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                multipuleQuestions: store.getState().multipuleQuestions,
                regularQuestions: store.getState().regularQuestions,
                user: store.getState().user,
                folder: store.getState().folder
            }))

    }


    public componentDidMount(): void {
        const action1 = { type: ActionType.saveHistory, payload: this.props }
        store.dispatch(action1)

        // get the folder name by the id from the url
        const id = this.props.match.params.folderID;

        //get folders and question if redux isnt set yet
        if (store.getState().folders.length === 0) {
            getAllFoldersArray(id)
            if (store.getState().multipuleQuestions.length === 0 || store.getState().regularQuestions.length === 0) {
                getAllMultipuleQuestionsById(id);
                getAllRegularQuestionsById(id);
            }
        }
        let folder = store.getState().folders.find((f: Folder) => f._id === id);
        let multipuleQuestion = { ...this.state.multipuleQuestion };
        multipuleQuestion.answers = []

        if (!folder) {
            folder = new Folder();
        }
        //update stae user and multipuleQuestions array
        const user = store.getState().user;
        getAllMultipuleQuestionsById(id);

        this.setState({ folder, multipuleQuestion, user });

    }

    //handle quiz time limit input
    public setTimeLimit = (e: any): void => {
        this.setState({ timeLimit: e.target.value })
    }


    //show quiz start menu
    public toggleStartMenu = (): void => {
        this.setState({ showMenu: !this.state.showMenu })
    }


    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    render(): JSX.Element {
        return (
            <div className="folderClass">
                <h1 className="folderClass__headline">{this.state.folder.name}</h1>
                <div className="folderClass__add-questions">
                    <div className="folderClass__multipule"><AddMultipuleQuestion folder={this.state.folder} /></div>
                    <div className="folderClass__startQuiz" onClick={this.toggleStartMenu}>Start Quiz</div>
                    <div className="folderClass__regular"><AddRegularQuestion folder={this.state.folder} /></div>
                </div>
                <div className="folderClass__galleries">

                    <Slider type="multipule"
                        multipuleQuestions={this.state.multipuleQuestions}
                        folderID={this.props.match.params.folderID.toString()} />

                    <Slider type="regular"
                        regularQuestions={this.state.regularQuestions}
                        folderID={this.props.match.params.folderID.toString()} />

                </div>
                <div className={this.state.showMenu ? 'folderClass__startQuizMenu showStartMenu' : 'folderClass__startQuizMenu'}>
                    <div className="folderClass__startQuizMenuClose" onClick={this.toggleStartMenu}></div>

                    <div className="folderClass__startQuizMenuMain">
                        <span> To start the quiz in "{this.state.folder.name ? this.state.folder.name : ''}" insert the time limit enter 0 for no time limit</span>
                        <div className="folderClass__setTime">
                            <input type="number" value={this.state.timeLimit} onChange={this.setTimeLimit} className="folderClass__timeLimit" />
                            <NavLink to={'/quiz/' + this.state.folder._id + '/' + this.state.timeLimit} className="folderClass__startQuizLink">Start Quiz</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 