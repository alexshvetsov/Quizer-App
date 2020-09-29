const mongoose = require("mongoose");

const folderSchema = mongoose.Schema({
        name: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { versionKey: false });


const Folder = mongoose.model("Folder", folderSchema, "folders");

module.exports = Folder;  