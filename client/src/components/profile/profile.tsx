import React, { Component, createRef } from 'react';
import './profile.css'
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { User } from '../../models/user';
import { AddFolder } from '../addFolder/addFolder';
import { Folder } from '../../models/folder';
import { FolderLink } from '../folderLink/folderLink';
import 'react-cookie'
import { FilledQuiz } from '../../models/filledQuiz';
import { ActionType } from '../../redux/actionType';
import { getAllfilledQuizesByUserID } from '../../utils/Helper';


interface ProfileState {
    filledQuizes: FilledQuiz[]
    loggedUser: User;
    action: string;
    addFolderStyle: string;
    folders: Folder[];
    shownFolders: Folder[];
    folderList: string;
    isLogged: boolean
}

export class Profile extends Component<any, ProfileState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            filledQuizes: store.getState().filledQuizes,
            loggedUser: store.getState().user,
            action: "",
            addFolderStyle: "add-folder hide",
            folders: store.getState().folders,
            isLogged: store.getState().isLogged,
            folderList: 'all',
            shownFolders: store.getState().folders
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                isLogged: store.getState().isLogged,
                folders: store.getState().folders,
                shownFolders: store.getState().folders,
                loggedUser: store.getState().user,
                filledQuizes: store.getState().filledQuizes
            }));
    }

    public componentDidMount(): void {
        getAllfilledQuizesByUserID()
        const action1 = { type: ActionType.saveHistory, payload: this.props }
        store.dispatch(action1)
    }



    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    //open add folder menu
    public setAction = (): void => {
        const addFolderStyle = "add-folder"
        this.setState({ addFolderStyle })
    }

    //close add folder menu
    public closeModal = (): void => {
        const addFolderStyle = "add-folder hide"
        this.setState({ addFolderStyle })
    }

    //set date to string for table display
    public setDate = (date: Date): string => {
        const newDate = new Date(date)
        return newDate.toDateString()
    }

    //show all/mine folders
    public chooseFolders(folderList: string): void {
        let shownFolders = [...this.state.folders]
        if (folderList === 'all') {
            shownFolders = this.state.folders
        } else {
            shownFolders = []
            store.getState().folders.forEach(f => {
                if (f.user) {
                    if (f.user._id === this.state.loggedUser._id) {
                        shownFolders.push(f)
                    }
                }
            })
        }
        this.setState({ folderList, shownFolders })
    }

    private btnRef = createRef<HTMLDivElement>();

    render(): JSX.Element {
        return (
            <div className="profile">
                <div className="center">
                    <div className="loading" style={{ display: this.state.folders.length >= 0 ? 'none' : 'block' }}>
                        <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div ref={this.btnRef} className={this.state.addFolderStyle}>
                        <AddFolder user={this.state.loggedUser} close={this.closeModal} />
                    </div>

                    <div className="folders">
                        <div className="folders-options">
                            <div className='folders-chooseFolders'>
                                <button onClick={() => { this.chooseFolders('mine') }}
                                    className={this.state.folderList === 'mine' ?
                                        'folders-chooseFolderButton clicked' : 'folders-chooseFolderButton'}>My folders</button> </div>

                            <div className="folders-chooseFolders" onClick={this.setAction.bind('addFolder')}>
                                <button className="folders-chooseFolderButton active">Add Folder</button> </div>
                            <div className='folders-chooseFolders'>
                                <button onClick={() => { this.chooseFolders('all') }}
                                    className={this.state.folderList === 'all' ?
                                        'folders-chooseFolderButton clicked' : 'folders-chooseFolderButton'}>All folders</button></div>
                        </div >



                        <div className="folders__folders">
                            {
                                this.state.shownFolders.length >= 1 ? this.state.shownFolders.map(f => <FolderLink folder={f} key={f._id + '-' + f.name} />) : 'No folder has been added yet, press the add folder icon to start'
                            }
                        </div>
                    </div>

                    <table className="profile__table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Score</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.filledQuizes.length >= 1 ? this.state.filledQuizes.map(Q => <tr key={Q._id} >
                            <td>{this.setDate(Q.date ? Q.date : new Date())}</td>
                            <td>{Q.folder ? Q.folder.name : 'Loading'}</td>
                            <td>{Q.answers ? Q.answers.filter(a => a.chosenAnswer == a.correctAnswer).length : 'Loading'}</td>
                            <td>{Q.totalTime}</td>
                        </tr>) : <tr key={'Q._id'}><td>No quizes filled yet</td></tr>}
                        </tbody>
                    </table>

                </div>

            </div>

        )
    }
} 