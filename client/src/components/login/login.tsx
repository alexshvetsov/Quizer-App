import React, { Component } from 'react';
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';
import './login.css';

interface LoginState {
    user: {
        username: string;
        passowrd: string;
    } | any;
    err: boolean;
    errors: {
        username: boolean;
        password: boolean;
    } | any;
}


interface LoginProps {
    switchForm: Function;
    redirect: Function
}


export class Login extends Component<LoginProps, LoginState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            errors: {
                username: false,
                password: false,
            },
            err: false
        };
    }


    //handle form inputs
    public setInputValue = (e: any): void => {
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
        // const node = this.btnRef.current
        return this.state.errors.username &&
            this.state.errors.password;
    }

    //login user or show error if user incorrect
    public signin = async (e: any) => {
        e.preventDefault()
        
        await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then((user) => {

                if (user.message) {
                    return this.setState({ err: true })

                } else {
                    
                    const action = { type: ActionType.login, payload: user };
                    store.dispatch(action);
                    this.setState({ err: false });
                    this.props.redirect()

                }

            })
            .catch(err => alert(err));


    }




    render(): JSX.Element {
        return (
            <div className="login">

                <form className="login__form">
                    <header className="login__header">
                        <h3 className="login__title">Login</h3>
                    </header>

                    <div className="login__body">

                        <div className="login__inputFiled">
                            <input id="username" type="text" className="login__input login__username" placeholder="Username"
                                required name="username" onChange={this.setInputValue}
                                value={this.state.user.username}
                            />
                        </div>

                        <div className="login__inputFiled">
                            <input id="password" required type="password" className="login__input login__password"
                                placeholder="Password" name="password" onChange={this.setInputValue}
                                value={this.state.user.password} />
                        </div>
                    </div>

                    <div className="login__footer">
                        <div style={{ visibility: this.state.err ? 'visible' : 'hidden' }} className="login__errMessage">{this.state.err ? "Username or password is correct" : null}</div>

                        <span className="login__switchForm">Dont have an account? <span onClick={() => this.props.switchForm()}>Sign Up</span> </span>

                        <button className={this.isFormLegal() ? 'login__button' : 'login__button disabled'} disabled={!this.isFormLegal()} onClick={this.signin}>Login</button>
                    </div>

                    <div className="login__loginSocial">
                        <p className="login__p"><span className="login__pText">or</span></p>
                        <a className="login__google" href="http://localhost:3001/auth/google">
                            <div className="login__googleImg">
                                <img alt="" className="login__googleIcon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <p className="login__googleText">Sign in with google</p>
                        </a>

                    </div>
                </form>

            </div>

        )
    }
}