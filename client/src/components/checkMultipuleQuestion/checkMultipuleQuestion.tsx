import React, { Component } from 'react';
import './checkMultipuleQuestion.css';
import { FilledQuiz } from '../../models/filledQuiz';
import { MultipuleQuestion } from '../../models/multipuleQuestion';

interface CheckMultipuleQuestionState {
    options: string[]

}

interface CheckMultipuleQuestionProps {
    filledQuiz: FilledQuiz;
    multipuleQuestion: MultipuleQuestion;
    index: number;
}

export class CheckMultipuleQuestion extends Component<CheckMultipuleQuestionProps, CheckMultipuleQuestionState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            options: ['A', 'B', 'C', 'D']
        }
    }


    //check if answer is correct/chosen/regular and assign classes
    public answerClassName = (index: number): string => {
        if (this.props.filledQuiz.answers) {
            const answer = this.props.filledQuiz.answers.findIndex(a => a.inQuizIndex === this.props.index)
            if (answer >= 0) {
                if (index.toString() === this.props.filledQuiz.answers[answer].chosenAnswer && index !== this.props.multipuleQuestion.correctAnswer) {
                    return 'checkMultipuleQueston__answer wrong'
                }
            }
        }
        if (index === this.props.multipuleQuestion.correctAnswer) {
            return 'checkMultipuleQueston__answer correct'
        }
        return 'checkMultipuleQueston__answer'
    }

    render(): JSX.Element {
        return (
            <div className="checkMultipuleQuestion">
                <div className="checkMultipuleQuestion__index">{this.props.index + 1}</div>
                <div className="checkMultipuleQueston__question">
                    {this.props.multipuleQuestion.question}
                </div>
                <div className="checkMultipuleQuestion__answers">
                    {
                        this.props.multipuleQuestion.answers.map((a, index) => <div key={a + index}
                            className={this.answerClassName(index)}>{this.state.options[index]}.   {a}</div>)
                    }
                </div>

            </div>
        )
    }
}