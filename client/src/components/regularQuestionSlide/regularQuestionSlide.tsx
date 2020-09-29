import React, { Component } from 'react';
import './regularQuestionSlide.css'
import { RegularQuestion } from '../../models/regularQuestion';


interface RegularQuestionSlideState {
    showAnswer: boolean;

}

interface RegularQuestionSlideProps {
    question: RegularQuestion
    index: number;
}

export class RegularQuestionSlide extends Component<RegularQuestionSlideProps, RegularQuestionSlideState>{


    public constructor(props: any) {
        super(props);
        this.state = {
            showAnswer: false
        }
    }

    //show/hide correct answer
    public toggleCorrectAnswer = (): void => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }



    render(): JSX.Element {
        return (
            <div className="regularQuestionSlide">
                <div className="carf">

                    <div className="regularQuestionSlide__index">{this.props.index + 1}</div>
                    <h3 className="regularQuestionSlide__headline">
                        Q: {this.props.question.question}
                    </h3>

                    <div className="regularQuestionSlide__answer" style={{ opacity: this.state.showAnswer ? 1 : 0 }}>
                        A: {this.props.question.answer}
                    </div>

                    <button className="regularQuestionSlide__showAnswer" onClick={this.toggleCorrectAnswer}>Show answer</button>

                </div>
            </div>
        )
    }
}

