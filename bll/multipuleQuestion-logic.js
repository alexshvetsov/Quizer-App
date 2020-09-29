const MultipuleQuestion = require('../models/multipuleQuestion-model');


function getAllMultipuleQuestions() {
    return new Promise((resolve, reject) => {
        MultipuleQuestion.find({}).populate("user").populate("folder").exec((err, qustions) => {
            if (err) return reject(err);
            resolve(qustions);
        });
    });
};


function addMultipuleQuestion(multipuleQuestion) {

    return new Promise((resolve, reject) => {
        let addedMultipuleQuestion = new MultipuleQuestion(multipuleQuestion);

        addedMultipuleQuestion.save((err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info);
        });
    });
}


module.exports = {
    addMultipuleQuestion,
    getAllMultipuleQuestions
}
