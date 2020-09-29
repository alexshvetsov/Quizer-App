import React, { Component } from 'react';
import './folderLink.css';
import { NavLink } from 'react-router-dom';
import { Folder } from '../../models/folder';
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';
import { getAllMultipuleQuestionsById, getAllRegularQuestionsById } from '../../utils/Helper';


interface FolderLinkProps {
    folder: Folder;
   
} 

export class FolderLink extends Component<FolderLinkProps>{

    //open new folder and update redux
    public switchFolder=():void=>{
        let action = { type: ActionType.OpenFolder, payload: this.props.folder };
        store.dispatch(action); 
        if(this.props.folder._id){

            getAllRegularQuestionsById(this.props.folder._id)
            getAllMultipuleQuestionsById(this.props.folder._id)
        }
    }

    render(): JSX.Element {
        return ( 
            <div className="folderLink" onClick={this.switchFolder}>
                <NavLink className="folderLink__main" to={"/folders/" + this.props.folder._id}>
                    <h3 className="folderLink__name">{this.props.folder.name}</h3>
                    <div className="folderLink__folderImg">
                        <img src={require('./folder.png')} alt="folder" />
                    </div>
                </NavLink>
            </div>
        )
    }
}