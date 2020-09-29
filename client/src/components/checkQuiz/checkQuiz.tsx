import React, { Component } from 'react'
import './checkQuiz.css';
import { FilledQuiz } from '../../models/filledQuiz';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { CheckMultipuleQuestion } from '../checkMultipuleQuestion/checkMultipuleQuestion';
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { Folder } from '../../models/folder';

interface CheckQuizState {
    filledQuiz: FilledQuiz;
    currentQuestion: number
}

export class CheckQuiz extends Component<any, CheckQuizState>{

    private unsubscribeStore: Unsubscribe;


    public constructor(props: any) {
        super(props);
        this.state = {
            filledQuiz: store.getState().filledQuiz,
            currentQuestion: 0,
        }
        this.unsubscribeStore = store.subscribe(() =>
            this.setState({ filledQuiz: store.getState().filledQuiz }));
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    //show previous question
    public checkPreviousQuestion = (): void => {
        if (this.state.filledQuiz.questionArray) {
            this.setState({
                currentQuestion: this.state.currentQuestion === 0 ?
                    (this.state.filledQuiz.questionArray.length - 1) : (this.state.currentQuestion - 1)
            })
        }
    }

    //show next question
    public checkNextQuestion = (): void => {
        if (this.state.filledQuiz.questionArray) {

            this.setState({
                currentQuestion: this.state.currentQuestion === (this.state.filledQuiz.questionArray.length - 1) ?
                    0 : (this.state.currentQuestion + 1)
            })
        }
    }


   
    //count how many correct answer the user answerd
    public correctAnswers = (): number => {
        if (this.state.filledQuiz.answers) {
            if (this.state.filledQuiz.answers.length >= 1) {
                const sum = this.state.filledQuiz.answers.filter(a => a.correctAnswer == a.chosenAnswer)
                return sum.length
            }
        } 
        return 0
    }

    render(): JSX.Element {
        return (
            <div className="checkQuiz">
                <div className="checkQuiz--center">
                    <div className="checkQuiz__results"> You answerd correctly {this.correctAnswers()} out of {this.state.filledQuiz.questionArray ? this.state.filledQuiz.questionArray.length : 0}</div>
                    <div className="checkQuiz__questionCard">
                        <CheckMultipuleQuestion index={this.state.currentQuestion}
                            multipuleQuestion={this.state.filledQuiz.questionArray ?
                                this.state.filledQuiz.questionArray[this.state.currentQuestion].question : new MultipuleQuestion([], new Folder())}
                            filledQuiz={this.state.filledQuiz} />
                    </div>
                    <div className="checkQuiz__controllers">
                        <button onClick={this.checkPreviousQuestion} className="quiz__previousQuestion">Previos Question</button>
                        <button onClick={this.checkNextQuestion} className="quiz__nextQuestion">Next Question</button>
                    </div>
                </div>
            </div>
        )
    }
} 