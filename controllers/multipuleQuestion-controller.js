const express = require("express");
const multipuleQuestionLogic = require('../bll/multipuleQuestion-logic')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const questions = await multipuleQuestionLogic.getAllMultipuleQuestions();
        res.json(questions)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
});


router.post("/", async (req, res) => {
    try {

        const addedMultipuleQuestion = await multipuleQuestionLogic.addMultipuleQuestion(req.body);
        return res.status(200).json(addedMultipuleQuestion);
    }
    catch (err) { res.status(500).send(err.message) }

});


module.exports = router;    
