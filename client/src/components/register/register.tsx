import React, { Component } from 'react';
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';
import './register.css';

interface RegisterState {
    user: {
        username: string;
        passowrd: string;
        coniformPassword: string;
    } | any;
    coniformPassordError: boolean;
    errors: {
        email: boolean;
        password: boolean;
        coniformPassword: boolean;
    } | any;
}



interface RegisterProps {
    switchForm: Function;
    redirect: Function
}


export class Register extends Component<RegisterProps, RegisterState>{



    public constructor(props: any) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                coniformPassword: ''
            },
            errors: {
                email: false,
                password: false,
                coniformPassword: false
            },
            coniformPassordError: false
        };

    }
    //handle form inputs
    public setRegisterValue = (e: any): void => {
        const inputValue = e.target.value;
        let user = { ...this.state.user };
        let errors = { ...this.state.errors };
        let key = e.target.name;
        user[key] = inputValue;
        errors[key] = e.target.checkValidity()
        this.setState({ user, errors });
    }

    // check if form is legal
    private isFormLegal = (): boolean => {
        return this.state.errors.email &&
            this.state.errors.password &&
            this.state.errors.coniformPassword;
    }

    //post new user to DB if username not taken or show err
    public signup = (e: any): void => {
        e.preventDefault()
        let user = { ...this.state.user }
        user.username = this.state.user.email
        if (user.password !== user.coniformPassword) {
            return this.setState({ coniformPassordError: true })
        }
        // Send to server for adding:

        fetch("http://localhost:3001/auth/register", {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(user => {
                if (user.message) {

                    return this.setState({ coniformPassordError: true })
                }
                const action = { type: ActionType.login, payload: user };
                store.dispatch(action);
                this.props.redirect()
            })
            .catch(err => alert(err));
    }






    render(): JSX.Element {
        return (
            <div className="register">
                <form className="register__form" >
                    <header className="register__header">
                        <h3 className="register__title">Register</h3>
                    </header>

                    <div className="register__body">

                        <div className="register__inputFiled">
                            <input type="text" className="register__input register__username" placeholder="Username"
                                onChange={this.setRegisterValue} value={this.state.user.email} name="email"
                                required />
                        </div>

                        <div className="register__inputFiled">
                            <input type="text" className="register__input register__password" placeholder="Password"
                                onChange={this.setRegisterValue} value={this.state.user.password || ''} name="password"
                                required />
                        </div>
                        <div className="register__inputFiled">
                            <input type="text" className="register__input register__coniformPassword" placeholder="Coniform password"
                                onChange={this.setRegisterValue} value={this.state.user.coniformPassword || ''} name="coniformPassword"
                                required />
                        </div>
                    </div>

                    <div style={{ visibility: this.state.coniformPassordError ? 'visible' : 'hidden' }}
                        className="register__errMessage">
                        {this.state.coniformPassordError ? "Please make sure the username and password is correct" : null}
                    </div>

                    <div className="register__footer">

                        <span className="register__switchForm">Already have an account? <span onClick={() => this.props.switchForm()}>Sign In</span> </span>

                        <button disabled={!this.isFormLegal()} onClick={this.signup}
                            className={this.isFormLegal() ? 'register__button' : 'register__button disabled'}>Register</button>
                    </div>

                    <div className="register__loginSocial">
                        <p className="register__p"><span className="register__pText">or</span></p>
                        <a className="register__google" href="http://localhost:3001/auth/google">
                            <div className="register__googleImg">
                                <img alt="" className="register__googleIcon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <p className="register__googleText">Sign in with google</p>
                        </a>
                    </div>

                </form>

            </div>
        )
    }
}