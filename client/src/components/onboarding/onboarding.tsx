import React, { Component, createRef } from 'react';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';
import { Login } from '../login/login';
import { Register } from '../register/register';
import './onboarding.css';

interface OnboaringState { 
    loginStyle: string;
    registerStyle: string;
}

export class Onboaring extends Component<any, OnboaringState> {

    private unsubscribeStore: Unsubscribe;


    public constructor(props: any) {
        super(props)
        this.state = {
            loginStyle: '',
            registerStyle: ''
        }
        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                loginStyle: store.getState().switchForm === '/sign-in' ? 'fadeIn' : 'fadeOut',
                registerStyle: store.getState().switchForm === '/sign-in' ? 'fadeOut' : 'fadeIn'
            }))
    }

    private LoginRef = createRef<HTMLDivElement>();
    private RegisterRef = createRef<HTMLDivElement>();


    public componentDidMount() {
        const action1 = { type: ActionType.saveHistory, payload: this.props }
        store.dispatch(action1)

        if (this.props.location.pathname === '/sign-in') {
            const action = { type: ActionType.switchform, payload: '/sign-in' }
            store.dispatch(action)
        } else {
            const action = { type: ActionType.switchform, payload: '/sign-up' }
            store.dispatch(action)
        }

    }

    // switch sign-in and sign-up forms
    public SwitchForm = (): void => {
        if (this.LoginRef.current && this.RegisterRef.current) {
            this.LoginRef.current.classList.toggle('fadeIn');
            this.LoginRef.current.classList.toggle('fadeOut');
            this.RegisterRef.current.classList.toggle('fadeIn');
            this.RegisterRef.current.classList.toggle('fadeOut');
        }

    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }


    render(): JSX.Element {
        return (
            <div className="onboarding">

                <div className={this.state.registerStyle} ref={this.RegisterRef} > <Register switchForm={this.SwitchForm} redirect={() => this.props.history.push("/profile")} /></div>
                <div className={this.state.loginStyle} ref={this.LoginRef} ><Login redirect={() => this.props.history.push("/profile")} switchForm={this.SwitchForm} /></div>


            </div>
        )
    }
}