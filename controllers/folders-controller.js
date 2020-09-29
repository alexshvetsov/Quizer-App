const express = require("express");
const foldersLogic = require("../bll/folders-logic");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const folders = await foldersLogic.getAllFolders();
        res.json(folders)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
});


router.post("/", async (req, res) => {
    try {
        const addedFolder = await foldersLogic.addFolder(req.body);
        return res.status(200).json(addedFolder);
    }
    catch (err) { res.status(500).send(err.message) }

});


module.exports = router;    
