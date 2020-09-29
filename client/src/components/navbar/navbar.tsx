import React, { Component } from 'react';
import './navbar.css'
import { NavLink } from "react-router-dom";
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { User } from '../../models/user';
import Cookies from 'js-cookie';
import { ActionType } from '../../redux/actionType';



interface NavbarState {
    user: User;
    history: any
}


export class Navbar extends Component<any, NavbarState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            user: store.getState().user,
            history: store.getState().history
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                user: store.getState().user,
                history: store.getState().history,
            }));
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }



    //delete cookies and log user out
    public logout = (e: any): void => {
        Cookies.remove('quizCookie.sig');
        Cookies.remove('quizCookie');
        const action = { type: ActionType.logout }
        store.dispatch(action)
        this.state.history.history.push('/sign-in')
    }

    // switch sign-in and sign-up forms
    public switchForm = (form: string): void => {
        const action = { type: ActionType.switchform, payload: form }
        store.dispatch(action)
    }

    render(): JSX.Element {
        return (
            <div className="navbar">
                <div className="navbar__logo">QuizMeCo-oP</div>
                <nav >
                    <ul className="navbar__links">
                        <li>
                            <NavLink to="/profile" className="navbar__link">Profile</NavLink>
                        </li>
                        <li>
                            <p className="navbar__username">Hello, {this.state.user.username !== "" ? this.state.user.username : 'new friend'}</p>
                        </li>
                        {store.getState().user.username.length <= 0 ? <li><NavLink to="/sign-up" className="navbar__link" onClick={() => this.switchForm('/sign-up')}>Sign-up</NavLink>  </li> : null}
                        {store.getState().user.username.length <= 0 ? <li><NavLink to="/sign-in" className="navbar__link" onClick={() => this.switchForm('/sign-in')}>Sign-in</NavLink>  </li> : null}
                        {store.getState().user.username.length > 0 ? <li><button className="navbar__logout" onClick={this.logout}>Logout</button></li> : null}

                    </ul>


                </nav>

            </div>
        )
    }
}          