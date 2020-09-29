const Folder = require('../models/folder-model');


function getAllFolders() {
    return new Promise((resolve, reject) => {
        Folder.find({}).populate("user").exec((err, folders) => {
            if (err) return reject(err);
            resolve(folders);
        });
    });
};


function addFolder(folder) {
    return new Promise((resolve, reject) => {
        let addedFolder = new Folder(folder);
        addedFolder.save((err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info);
        });
    });
}


module.exports = {
    addFolder,
    getAllFolders
}
