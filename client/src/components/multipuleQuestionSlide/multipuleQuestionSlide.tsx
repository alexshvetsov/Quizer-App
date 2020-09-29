import React, { Component } from 'react';
import './multipuleQuestionSlide.css'
import { MultipuleQuestion } from '../../models/multipuleQuestion';

interface MultipuleQuestionSlideState {
    showAnswer: boolean;
    options: string[];
}

interface MultipuleQuestionSlideProps {
    multipuleQuestion: MultipuleQuestion;
    index: number;
}

export class MultipuleQuestionSlide extends Component<MultipuleQuestionSlideProps, MultipuleQuestionSlideState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            showAnswer: false,
            options: ['A', 'B', 'C', 'D']
        }
    }

    //show/hide correct answer
    public toggleCorrectAnswer = (): void => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    render(): JSX.Element {
        return (
            <div className="multipuleQuestionSlide">

                <div className="multipuleQuestionSlide__index">{this.props.index + 1}</div>

                <h3 className="multipuleQuestionSlide__question">
                    {this.props.multipuleQuestion.question}
                </h3>
                <div className="multipuleQuestionSlide__answers">
                    {this.props.multipuleQuestion.answers.map((a, index) =>
                        <div key={a + index}
                            className={this.state.showAnswer && index === this.props.multipuleQuestion.correctAnswer ? 'multipuleQuestionSlide__answer correctAnswer' : 'multipuleQuestionSlide__answer'}>
                            <span className="multipuleQuestionSlide__option">{this.state.options[index]}. </span>
                            {this.props.multipuleQuestion.answers[index]}
                        </div>
                    )}
                </div>
                <button className="multipuleQuestionSlide__showAnswer" onClick={this.toggleCorrectAnswer}>Show answer</button>

            </div>
        )
    }
}
