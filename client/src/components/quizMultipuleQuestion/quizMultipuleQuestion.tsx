import React, { Component } from 'react';
import './quizMultipuleQuestion.css'
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { Answer } from '../../models/answer';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/actionType';

interface QuizMultipuleQuestionState {
    answer: Answer;
    answers: Answer[];
}

interface QuizMultipuleQuestionProps {
    multipuleQuestion: MultipuleQuestion;
    inQuizIndex: number;
    realIndex: number;
}

export class QuizMultipuleQuestion extends Component<QuizMultipuleQuestionProps, QuizMultipuleQuestionState>{


    private unsubscribeStore: Unsubscribe

    public constructor(props: any) {
        super(props);
        this.state = {
            answer: new Answer(),
            answers: store.getState().answers
        };
        this.unsubscribeStore = store.subscribe(() => {
            this.setState({
                answers: store.getState().answers
            })
        })
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    //update answers obj when answer is choosen
    public setAnswer = (answerNumber: number): void => {
        let answer = { ...this.state.answer };
        answer.realIndex = this.props.realIndex;
        answer.inQuizIndex = this.props.inQuizIndex
        answer.correctAnswer = this.props.multipuleQuestion.correctAnswer
        answer.chosenAnswer = answerNumber.toString()

        const action = { type: ActionType.setAnswer, payload: answer };
        store.dispatch(action);
    }

    //set style for previously checked anser
    public checkedAnswer = (index: number): boolean => {
        const answerIndex = this.state.answers.findIndex(a => a.realIndex === this.props.realIndex)
        if (answerIndex !== -1) {
            return this.state.answers[answerIndex].chosenAnswer === index.toString() ? true : false
        } else { return false }
    }

    render(): JSX.Element {
        return (
            <div className="quizMultipuleQuestion">

                <div className="quizMultipuleQuestion__question">
                    Q: {this.props.multipuleQuestion.question} ?
                </div>

                <div className="quizMultipuleQuestion__answers">
                    {this.props.multipuleQuestion.answers.map((a, index) =>
                        <div key={a + index} className="quizMultipuleQuestion__answer">
                            <input className="quizMultipuleQuestion__radio" type="radio" name={"answer"}
                                checked={this.checkedAnswer(index)} id={index.toString()} onChange={() => { this.setAnswer(index) }} />
                            <label htmlFor={index.toString()} className="quizMultipuleQuestion__label"
                                onClick={() => { this.setAnswer(index) }}
                            >
                                <span className="quizMultipuleQuestion__button"></span>
                                <span className="quizMultipuleQuestion__buttonLabel">{a}</span>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}