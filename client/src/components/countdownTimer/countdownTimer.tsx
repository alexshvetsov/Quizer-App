import React, { Component } from 'react';
import './countdownTimer.css'
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';


interface CountdownTimerState {
    hoursLeft: number;
    minutesLeft: number;
    secondsLeft: number;
    timerID: number;
    disableStartButton: boolean;
}

interface CountdownTimerProps {
    timeLimit: number
    scrambleArray: Function
    quizStatus: Function
    history: any
}

export class CountdownTimer extends Component<CountdownTimerProps, CountdownTimerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            hoursLeft: 0,
            minutesLeft: 0,
            secondsLeft: 0,
            timerID: 0,
            disableStartButton: false
        }
    }

    public componentDidMount = (): void => {
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.state.timerID)
        this.setState({ disableStartButton: false })

    }

    // set the timer to the time the user set
    public setTimeLeft = (): void => {
        this.setState({ disableStartButton: true })
        const hoursLeft = Math.floor(this.props.timeLimit / 60);
        const minutesLeft = this.props.timeLimit % 60;
        this.setState({ hoursLeft, minutesLeft });
        this.props.scrambleArray();
        this.props.quizStatus()
        const timerID = window.setInterval(() => {
            if (this.state.secondsLeft > 0) {
                this.setState({ secondsLeft: this.state.secondsLeft - 1 })
            } else if (this.state.secondsLeft === 0 && this.state.minutesLeft > 0) {
                this.setState({ secondsLeft: 60, minutesLeft: this.state.minutesLeft - 1 })
            } else if (this.state.secondsLeft === 0 && this.state.minutesLeft === 0 && this.state.hoursLeft > 0) {
                this.setState({ secondsLeft: 60, minutesLeft: 59, hoursLeft: this.state.hoursLeft - 1 })
            } else if (this.state.secondsLeft === 0 && this.state.minutesLeft === 0 && this.state.hoursLeft === 0) {
                clearInterval(timerID)
                this.props.quizStatus()
                this.props.history.push('/checkQuiz');
            }
        }, 1000)
        this.setState({ timerID })
    }

    //post the exam manualy before time is up
    public finishEarly = (): void => {
        const timeLeft = (this.state.hoursLeft * 60 + this.state.minutesLeft + this.state.secondsLeft / 60)
        const action = { type: ActionType.finishQuiz, payload: timeLeft }
        store.dispatch(action)
        this.setState({ minutesLeft: 0, secondsLeft: 0, hoursLeft: 0 })
    }

    render(): JSX.Element {

        return (

            <div className="countdownTimer" >
                <div className="countdownTimer__controllers">

                    <button className="countdownTimer__button start" disabled={this.state.disableStartButton ? true : false} onClick={this.setTimeLeft}>start</button>

                    <button className="countdownTimer__button finish" disabled={this.state.disableStartButton ? false : true} onClick={this.finishEarly}>finish</button>
                </div>

                <div className="countdownTimer__clock">

                    <section className="countdownTimer__section">
                        <p className="contdownTimer__p-number">{this.state.hoursLeft}
                            <span className="countdownTimer__span">:</span>
                        </p>
                        <p className="countdownTimer__p-type"><small>Hours</small></p>
                    </section>

                    <section className="countdownTimer__section">
                        <p className="contdownTimer__p-number">{this.state.minutesLeft}
                            <span className="countdownTimer__span">:</span>
                        </p>
                        <p className="countdownTimer__p-type"><small>Minutes</small></p>
                    </section>

                    <section className="countdownTimer__section">
                        <p className="contdownTimer__p-number">{this.state.secondsLeft}</p>
                        <p className="countdownTimer__p-type"><small>Seconds</small></p>
                    </section>
                </div>
            </div>
        )
    }
}