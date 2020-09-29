const express = require('express');
const filledQuizLogic = require('../bll/filledQuiz-logic');

const router = express.Router();

router.get("/filledQuizByUser", async (req, res) => {
    
    try {
        if(req.user){   
            const filledQuizes = await filledQuizLogic.getAllfilledQuizesByUser(req.user._id);
            res.status(200).json(filledQuizes)
        }else{
            res.status(200).json([])
        }       
    }
    catch (err) {
        res.status(500).send(err.message)
    }
});

router.post("/", async (req, res) => {
    try { 
        const addedFilledQuiz = await filledQuizLogic.addFilledQuiz(req.body);
        res.status(200).json(addedFilledQuiz);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})


module.exports = router;    
