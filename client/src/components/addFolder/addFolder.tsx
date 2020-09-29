import React, { Component } from 'react';
import './addFolder.css'
import { User } from '../../models/user';
import { Folder } from '../../models/folder';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/actionType';


interface AddFolderState {
    newFolder: Folder;
    showError: boolean;
}

interface AddFolderProps {
    user: User;
    close: Function;
}

export class AddFolder extends Component<AddFolderProps, AddFolderState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            newFolder: new Folder(),
            showError: false

        };
    }

    //show error if folder name is empty
    public showError = (): void => {
        if (this.state.newFolder.name.length === 0) {
            this.setState({ showError: true })
        } else {
            this.setState({ showError: false })
        }
    }

    // handle folder name input
    public setFolderName = (e: any): void => {
        const inputValue = e.target.value;
        let newFolder = { ...this.state.newFolder };
        newFolder.name = inputValue;
        this.setState({ newFolder });
        if (e.target.value.length > 0) {
            this.setState({ showError: false })
        }
    }

    //post new folder to DB
    public submitFolder = async (e: any) => {
        e.preventDefault();
        let newFolder = { ...this.state.newFolder };
        if (newFolder.name.length === 0) {
            this.showError()
            return
        }
        newFolder.user = store.getState().user;

        (async () => {

            await fetch("http://localhost:3001/api/folders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newFolder)
            })
                .then(response => response.json())
                .then((folder) => {
                    const action = { type: ActionType.addFolder, payload: folder };
                    store.dispatch(action);
                    this.props.close();

                })
                .catch(err => alert(err));

            this.setState({ newFolder: new Folder() })
            this.showError();
        })();



    };


    render(): JSX.Element {
        return (
            <div className="addFolder" >
                <div className="addFolder__close" onClick={() => { this.props.close() }}></div>
                <div className="addFolder__main">

                    <p className="addFolder__instructions">
                        Add a folder and afterward you will be able to add quistions to the folder
                    </p>
                    <form className="form">
                        <div className="addFolder__formGroup">
                            <input type="text" className="addFolder__formInput"
                                name="name" onChange={this.setFolderName}
                                value={this.state.newFolder.name}
                                placeholder="Folder name" id="name" required />
                            <label htmlFor="name" className="addFolder__formLabel">Folder name</label>
                        </div>
                        <div className="addFolder__alert" style={{ opacity: this.state.showError ? 1 : 0 }}>Please fill the name before submmiting</div>
                        <button className="form__submit" onClick={this.submitFolder}>
                            <div className="btn-submit">
                                <span className="effect1">
                                    Submit
                            <span className="bg"></span>
                                </span>
                            </div>
                        </button >
                    </form>
                </div>
            </div>
        )
    }
} 