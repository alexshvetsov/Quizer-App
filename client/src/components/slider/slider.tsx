import React, { Component } from 'react';
import './slider.css';
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { MultipuleQuestionSlide } from '../multipuleQuestionSlide/multipuleQuestionSlide';
import { RegularQuestionSlide } from '../regularQuestionSlide/regularQuestionSlide';
import { RegularQuestion } from '../../models/regularQuestion';




interface SliderState {
    translateX: number;
}

interface SliderProps {
    folderID: string;
    type: string;
    multipuleQuestions?: MultipuleQuestion[];
    regularQuestions?: RegularQuestion[]
}

export class Slider extends Component<SliderProps, SliderState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            translateX: 0
        }
    }

    //move caruosel left
    public goLeft = (): void => {
        if (this.props.type === 'multipule' && this.props.multipuleQuestions) {
            this.state.translateX >= 50 ?
                this.setState({ translateX: - 50 * (this.props.multipuleQuestions.length - 1) }) :
                this.setState({ translateX: this.state.translateX + 50 })
        } else if (this.props.type === 'regular' && this.props.regularQuestions) {
            this.state.translateX >= 50 ?
                this.setState({ translateX: - 50 * (this.props.regularQuestions.length - 1) - 50 }) :
                this.setState({ translateX: this.state.translateX + 50 })
        }
    }

    //move caruosel right
    public goRight = (): void => {
        if (this.props.type === 'multipule' && this.props.multipuleQuestions) {
            this.state.translateX <= - 50 * (this.props.multipuleQuestions.length - 1) ?
                this.setState({ translateX: 50 }) :
                this.setState({ translateX: this.state.translateX - 33 })
        } else if (this.props.type === 'regular' && this.props.regularQuestions) {
            this.state.translateX <= - 60 * (this.props.regularQuestions.length - 1) ?
                this.setState({ translateX: 50 }) :
                this.setState({ translateX: this.state.translateX - 50 })
        }

    }


    render(): JSX.Element {
        return (
            <div className="slider">


                <div className="slider__multipule">
                    {

                        this.props.type === "multipule" && this.props.multipuleQuestions ? this.props.multipuleQuestions.map((MQ, index) => {
                            return (<div key={'slideNum' + index} className="slider__slide"
                                style={{ transform: `translateX(${this.state.translateX}%)` }}>
                                <MultipuleQuestionSlide multipuleQuestion={MQ} index={index} />
                            </div>
                            )
                        }) : ""

                    }
                </div>

                <div className="slider__regular">
                    {
                        this.props.type === 'regular' && this.props.regularQuestions ? this.props.regularQuestions.map((RQ, index) => {
                            return (<div key={'slideNum' + index} className="slider__slide"
                                style={{ transform: `translateX(${this.state.translateX}%)` }}>
                                <RegularQuestionSlide key={RQ._id} question={RQ} index={index} />
                            </div>
                            )
                        }) : ''
                    }
                </div>

                <button id="goLeft" className="carousel-button" onClick={this.goLeft}>
                    &#8592;
                </button>

                <button id="goRight" className="carousel-button" onClick={this.goRight}>
                    &#8594;
                </button>
            </div>
        )
    }
} 