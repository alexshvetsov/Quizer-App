const express = require("express");
const regularQuestionLogic = require("../bll/regularQuestion-logic");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const questions = await regularQuestionLogic.getAllRegularQuestions();
        res.json(questions)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
});


router.post("/", async (req, res) => {
    try {

        const addedRegularQuestion = await regularQuestionLogic.addRegularQuestion(req.body);
        return res.status(200).json(addedRegularQuestion);
    }
    catch (err) { res.status(500).send(err.message) }

});

module.exports = router