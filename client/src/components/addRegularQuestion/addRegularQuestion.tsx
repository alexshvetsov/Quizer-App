import React, { Component, createRef } from 'react';
import './addRegularQuestion.css';
import { Folder } from '../../models/folder';
import { RegularQuestion } from '../../models/regularQuestion';
import { store } from '../../redux/store';

interface AddRegularQuestionState {
    regularQuestion: RegularQuestion | any;
    errors: {
        question: boolean;
        answer: boolean;
    } | any
}

interface AddRegularQuestionProps {
    folder: Folder;

}

export class AddRegularQuestion extends Component<AddRegularQuestionProps, AddRegularQuestionState> {

    public constructor(props: any) {

        super(props);
        this.state = {
            regularQuestion: new RegularQuestion(),
            errors: {
                question: false,
                answer: false
            }
        }
    }


    private questionRef = createRef<HTMLTextAreaElement>();
    private answerRef = createRef<HTMLTextAreaElement>();
    private RegularCheckboxRef = createRef<HTMLDivElement>();


    //handle multipule question form inputs
    public setMQValue = (e: any): void => {
        const inputValue = e.target.value;
        let regularQuestion = { ...this.state.regularQuestion };
        let errors = { ...this.state.errors };
        let key = e.target.name;
        regularQuestion[key] = inputValue;
        errors[key] = e.target.checkValidity()
        this.setState({ regularQuestion, errors });

    }

    //enable/disable button if form is legal
    private isFormLegal = (): boolean => {
        return this.state.errors.question &&
            this.state.errors.answer
    }

    //post question to DB
    public sendQuestion = (e: any): void => {
        e.preventDefault()
        let regularQuestion = { ...this.state.regularQuestion };

        regularQuestion.folder = this.props.folder;
        regularQuestion.user = store.getState().user;
        this.setState({ regularQuestion })

        fetch("http://localhost:3001/api/regularQuestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(regularQuestion)
        })
            .then(response => response.json())
            .then(async (regularQuestion) => {
                this.setState({ regularQuestion: new RegularQuestion() })
                if (this.questionRef.current) {
                    this.questionRef.current.value = "";
                }
                if (this.answerRef.current) {
                    this.answerRef.current.value = "";
                }

            })
            .catch(err => alert(err));
    }

    // change checkbox label text
    public expendFunctionality = (e: any): void => {
        e.target.innerHTML = (e.target.innerHTML === 'Add new regular question' ? 'minimize' : 'Add new regular question')
        if (this.RegularCheckboxRef.current) {
            this.RegularCheckboxRef.current.classList.toggle("expendRegular")
        }
    }

    render(): JSX.Element {
        return (
            <div className="addRegularQuestion" ref={this.RegularCheckboxRef}>
                <input type="checkbox" name="expendRegular" id="expendRegular" className="addRegularQuestion__checkbox full-screen" />
                <label htmlFor="expendRegular" className="addRegularQuestion__checkbox-label" onClick={this.expendFunctionality}>Add new regular question</label>
                <h3 className="addRegularQuestion__headline">Add multipule question form</h3>

                <form className="addRegularQuestion__form">
                    <div className="addRegularQuestion__form-group">
                        <textarea className="addRegularQuestion__textArea" name="question"
                            onChange={this.setMQValue} ref={this.questionRef}
                            placeholder="Enter your question here:"
                            id="question" required>{this.state.regularQuestion.question}</textarea>
                        <label htmlFor="question" className="addRegularQuestion__label">Enter your question here:</label>
                        <div className="input__underline"></div>
                    </div>

                    <div className="addRegularQuestion__form-group">
                        <textarea className="addRegularQuestion__textArea" name="answer"
                            onChange={this.setMQValue} placeholder="Enter your answer here:"
                            ref={this.answerRef}
                            id="answer" required>{this.state.regularQuestion.question}</textarea>
                        <label htmlFor="answer" className="addRegularQuestion__label">Enter your answer here:</label>
                        <div className="input__underline"></div>
                    </div>

                    <button onClick={this.sendQuestion} disabled={!this.isFormLegal()}
                        className={this.isFormLegal() ? 'btn btn--green' : 'btn--red'}>Send</button>
                </form>
            </div>
        )
    }
}