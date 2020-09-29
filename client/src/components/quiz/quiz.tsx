import React, { Component } from 'react';
import './quiz.css';
import { Folder } from '../../models/folder';
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { store } from '../../redux/store';
import { CountdownTimer } from '../countdownTimer/countdownTimer';
import { Answer } from '../../models/answer';
import { Unsubscribe } from 'redux';
import { FilledQuiz } from '../../models/filledQuiz';
import { ActionType } from '../../redux/actionType';
import { QuizMultipuleQuestion } from '../quizMultipuleQuestion/quizMultipuleQuestion';


interface QuizState {
    folder: Folder | undefined;
    timeLimit: number;
    questionArray: MultipuleQuestion[];
    scrambledArray: { realIndex: number, question: MultipuleQuestion | any }[]
    currentQuestion: number
    quizStatus: string
    answers: Answer[]
    checkingOrder: number,
    filledQuiz: FilledQuiz
}

export class Quiz extends Component<any, QuizState>{

    private unsubscribeStore: Unsubscribe;


    public constructor(props: any) {
        super(props)
        this.state = {
            folder: new Folder(),
            timeLimit: 0,
            questionArray: [],
            scrambledArray: [],
            answers: [],
            currentQuestion: 0,
            checkingOrder: 0,
            quizStatus: "starting",
            filledQuiz: new FilledQuiz()
        }
        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                answers: store.getState().answers,
            }));
    }

    public componentDidMount(): void {
        const id = this.props.match.params.folderID;
        const timeLimit = this.props.match.params.timeLimit;
        this.setState({
            timeLimit: Number(timeLimit),
            folder: store.getState().folders.find(f => f._id === id),
            questionArray: store.getState().multipuleQuestions.filter(MQ => MQ.folder._id === id),
        })
        this.scrumbleQuestion()
    }


    //scramble the question array for quiz use and start filling the filledQuiz obj
    public scrumbleQuestion = (): void => {
        let unscrambledArray = [...this.state.questionArray]
        let scrambledArray = [...this.state.scrambledArray]
        let filledQuiz = { ...this.state.filledQuiz }

        while (unscrambledArray.length > 0) {
            const random = Math.floor(Math.random() * unscrambledArray.length)
            const question = unscrambledArray.slice(random, (random + 1))[0]
            scrambledArray.push({ realIndex: this.state.questionArray.indexOf(question), question: question })
            unscrambledArray.splice(random, 1)
        }
        filledQuiz.user = store.getState().user;
        filledQuiz.totalTime = this.state.timeLimit;
        filledQuiz.folder = this.state.folder;
        filledQuiz.date = new Date();
        filledQuiz.questionArray = scrambledArray;
        const action = { type: ActionType.startQuiz, payload: filledQuiz }
        store.dispatch(action);
        this.setState({ scrambledArray, filledQuiz })
    }

    //switch quiz status
    public quizStatus = () => {
        if (this.state.quizStatus === 'starting') {
            this.setState({ quizStatus: "started" })
        } else {
            this.setState({ quizStatus: "done" })
        }
    }


    //show previos question
    public previousQuestion = (): void => {
        this.setState({
            currentQuestion: this.state.currentQuestion === 0 ?
                (this.state.scrambledArray.length - 1) : (this.state.currentQuestion - 1)
        })

    }

    //show next quesiton
    public nextQuestion = (): void => {
        this.setState({
            currentQuestion: this.state.currentQuestion === (this.state.scrambledArray.length - 1) ?
                0 : (this.state.currentQuestion + 1)
        })
    }

   


    public componentWillUnmount(): void {
        const action = { type: ActionType.clearAnswers }
        store.dispatch(action);
        this.unsubscribeStore();
    }

    //switch question via number buttons
    public setCurrentQuestion = (e: any): void => {
        this.setState({ currentQuestion: Number(e.target.innerHTML - 1) })
    }


    render(): JSX.Element {
        return (
            <div className="quiz">
                <div className="quiz__container">
                    <div className="quiz__controllers"> 
                        <div className="quiz__setQuestion">
                            {this.state.scrambledArray.length > 0 ? this.state.scrambledArray.map((q, index) =>
                                <button key={'qw' + q.realIndex} onClick={this.setCurrentQuestion.bind(q.realIndex)} 
                                className= {this.state.currentQuestion === q.realIndex ?
                                        'quiz__questionSetter stayActive' : 'quiz__questionSetter'} 
                                >{index + 1}</button>
                            ) : ''}
                        </div>
                        <CountdownTimer history={this.props.history} quizStatus={this.quizStatus} timeLimit={this.state.timeLimit} scrambleArray={this.scrumbleQuestion} />
                    </div>

                    <div className="quiz__question">

                        {this.state.quizStatus === 'started' && this.state.scrambledArray[this.state.currentQuestion] ?
                            <QuizMultipuleQuestion inQuizIndex={this.state.currentQuestion}
                                multipuleQuestion={this.state.scrambledArray[this.state.currentQuestion].question}
                                realIndex={this.state.scrambledArray[this.state.currentQuestion].realIndex} />
                            : <div className="quiz__startNotice">The quiz will start as soon as you press the green start button. good luck</div>}
                        <div className="quiz__questionControllers">
                            <button disabled={this.state.quizStatus === 'started' ? false : true} onClick={this.previousQuestion} className="quiz__previousQuestion">Previos Question</button>
                            <button disabled={this.state.quizStatus === 'started' ? false : true} onClick={this.nextQuestion} className="quiz__nextQuestion">Next Question</button>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}
