import React, { Component, createRef } from 'react';
import './addMultipuleQuestion.css';
import { MultipuleQuestion } from '../../models/multipuleQuestion';
import { Folder } from '../../models/folder';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/actionType';

interface AddMultipuleQuestionState {
    multipuleQuestion: MultipuleQuestion | any;
    errors: {
        question: boolean;
        answer1: boolean;
        answer2: boolean;
        correctAnswer: boolean;
    } | any;
};

interface AddMultipuleQuestionProps {
    folder: Folder;
};

export class AddMultipuleQuestion extends Component<AddMultipuleQuestionProps, AddMultipuleQuestionState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            multipuleQuestion: new MultipuleQuestion([], new Folder()),
            errors: {
                question: false,
                answer0: false,
                answer1: false,
                correctAnswer: false
            }
        }
    }

    private MquestionRef = createRef<HTMLTextAreaElement>();
    private checkboxRef = createRef<HTMLDivElement>();


    // change checkbox label text
    public expendFunctionality = (e: any): void => {
        e.target.innerHTML = (e.target.innerHTML === 'Add new multipule question' ? 'minimize' : 'Add new multipule question')
        if (this.checkboxRef.current) {
            this.checkboxRef.current.classList.toggle("expend")
        }
    }

    //handle multipule question form inputs
    public setMQValue = (e: any): void => {
        const inputValue = e.target.value;
        let multipuleQuestion = { ...this.state.multipuleQuestion };
        let errors = { ...this.state.errors };
        let key = e.target.name;
        if (key === 'addMultipuleQuestion__question') {
            multipuleQuestion.question = inputValue;
            errors.question = e.target.checkValidity()
        } else if (key === 'correctAnswer') {
            multipuleQuestion.correctAnswer = inputValue;
            errors[key] = e.target.checkValidity();

        } else {
            multipuleQuestion.answers[key] = inputValue;
            errors['answer' + key] = e.target.checkValidity();
        }
        this.setState({ multipuleQuestion, errors });

    }

    //check if form is ok and enable the button
    private isFormLegal = (): boolean => {
        return this.state.errors.question &&
            this.state.errors.answer1 &&
            this.state.errors.answer0 &&
            this.state.multipuleQuestion.correctAnswer
    }

    //post new question to DB
    public sendMQuestion = (e: any): void => {
        e.preventDefault()
        let multipuleQuestion = { ...this.state.multipuleQuestion };
        multipuleQuestion.folder = this.props.folder;
        multipuleQuestion.user = store.getState().user;
        this.setState({ multipuleQuestion })


        fetch("http://localhost:3001/api/multipuleQuestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(multipuleQuestion)
        })
            .then(response => response.json())
            .then(async (multipuleQuestion) => {

                const action = { type: ActionType.addMultipuleQuestion, payload: this.state.multipuleQuestion };
                store.dispatch(action);
                this.setState({ multipuleQuestion: new MultipuleQuestion([], new Folder()) })
                if (this.MquestionRef.current) {
                    this.MquestionRef.current.value = "";
                }


            })
            .catch(err => alert(err));
    }

    render(): JSX.Element {
        return (
            <div className="addMultipuleQuestion" ref={this.checkboxRef}>
                <input type="checkbox" name="expend" id="expend" className="addMultipuleQuestion__checkbox full-screen" />
                <label htmlFor="expend" className="addMultipuleQuestion__checkbox-label" onClick={this.expendFunctionality}>Add new multipule question</label>
                <h3 className="addMultipuleQuestion__headline">Add multipule question</h3>
                <form className="addMultipuleQuestion__form">

                    <div className="addMultipuleQuestion__form-group">
                        <textarea className="addMultipuleQuestion__textArea" name="addMultipuleQuestion__question"
                            placeholder="Enter your question here:" ref={this.MquestionRef} onChange={this.setMQValue}
                            id="addMultipuleQuestion__question" required>{this.state.multipuleQuestion.question}</textarea>
                        <label htmlFor="addMultipuleQuestion__question" className="addMultipuleQuestion__label">Enter your question here:</label>
                        <div className="input__underline"></div>
                    </div>

                    <div className="addMultipuleQuestion__form-group">
                        <input type="text" className="addMultipuleQuestion__input" name="0"
                            placeholder="Answer no.1" onChange={this.setMQValue} id="answer0"
                            value={this.state.multipuleQuestion.answers[0] || ''} required />
                        <label htmlFor="answer0" className="addMultipuleQuestion__input-label">A</label>
                        <div className="input__underline"></div>
                    </div>

                    <div className="addMultipuleQuestion__form-group">
                        <input type="text" className="addMultipuleQuestion__input" name="1"
                            placeholder="Answer no.2" onChange={this.setMQValue} id="answer1"
                            value={this.state.multipuleQuestion.answers[1] || ''} required />
                        <label htmlFor="answer1" className="addMultipuleQuestion__input-label">B</label>
                        <div className="input__underline"></div>
                    </div>

                    <div className="addMultipuleQuestion__form-group">
                        <input type="text" className="addMultipuleQuestion__input" name="2"
                            placeholder="Answer no.3" onChange={this.setMQValue} id="answer2"
                            value={this.state.multipuleQuestion.answers[2] || ''} required />
                        <label htmlFor="answer2" className="addMultipuleQuestion__input-label">C</label>
                        <div className="input__underline"></div>
                    </div>

                    <div className="addMultipuleQuestion__form-group">
                        <input type="text" className="addMultipuleQuestion__input" name="3"
                            placeholder="Answer no.4" onChange={this.setMQValue} id="answer3"
                            value={this.state.multipuleQuestion.answers[3] || ''} required />
                        <label htmlFor="answer3" className="addMultipuleQuestion__input-label">C</label>
                        <div className="input__underline"></div>
                    </div>
                    <div className="addMultipuleQuestion__form-group">
                        <select className="addMultipuleQuestion__select" onChange={this.setMQValue} defaultValue="deadualt" name="correctAnswer">
                            <option disabled value="deadualt">Select correct answer  </option>
                            {this.state.multipuleQuestion.answers.map((a: string, index: number) =>
                                <option key={index + a} value={index}>{index + 1}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={this.sendMQuestion} disabled={!this.isFormLegal()}
                        className={this.isFormLegal() ? 'btn btn--green' : 'btn--red'}>Send</button>
                </form>
            </div>
        )
    }
}



