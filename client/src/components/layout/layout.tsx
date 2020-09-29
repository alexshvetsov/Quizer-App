import React, { Component } from 'react';
import './layout.css';
import { Navbar } from '../navbar/navbar';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Page404 } from "../page404/page404";
import { store } from '../../redux/store';
import { Profile } from '../profile/profile';
import { FolderClass } from '../folderClass/folderClass';
import Cookies from 'universal-cookie';
import {  getAllFolders, loginUser, getAllfilledQuizesByUserID } from '../../utils/Helper'
import { User } from '../../models/user';
import { Unsubscribe } from 'redux';
import { Quiz } from '../quiz/quiz';
import { CheckQuiz } from '../checkQuiz/checkQuiz';
import { Onboaring } from '../onboarding/onboarding';

interface LayoutState {
    user: User;
    cookie: string
}



export class Layout extends Component<any, LayoutState> {

    private unsubscribeStore: Unsubscribe;


    public constructor(props: any) {
        super(props);
        this.state = {
            user: store.getState().user,
            cookie: ''
        }

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                user: store.getState().user
            }));
    };

    public componentDidMount(): any {
        
        const cookies = new Cookies()
        if (cookies.get('quizCookie') && cookies.get('quizCookie.sig')) {
            loginUser()
            getAllfilledQuizesByUserID()
        }

        getAllFolders()

    }



    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    render(): JSX.Element {
        return (
            <BrowserRouter>
                <div className="layout">
                    <Navbar  />
                    <main className="main">
                        <Switch>
                            {/* Route - will determine which component to show according the route */}

                            {store.getState().user.username.length <= 0 ? <Route path="/sign-in" component={Onboaring} /> : null}
                            {store.getState().user.username.length <= 0 ? <Route path="/sign-up" component={Onboaring} /> : null}
                            <Route path="/profile" component={Profile} />
                            <Route path="/folders/:folderID" component={FolderClass} exact />
                            <Route path="/quiz/:folderID/:timeLimit" component={Quiz} exact />
                            <Route path="/checkQuiz" component={CheckQuiz} exact />
                            <Route path="/:any" component={Page404} />
                            {store.getState().user.username.length <= 0  ? 
                                <Redirect from="/" to="/sign-in" />
                                : <Redirect from="/" to="/profile" /> 
                            }

                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}



