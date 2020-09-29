const RegularQuestion = require('../models/regularQuestion-model');


function getAllRegularQuestions() {
    return new Promise((resolve, reject) => {
        RegularQuestion.find({}).populate("user").populate("folder").exec((err, qustions) => {
            if (err) return reject(err);
            resolve(qustions);
        });
    });
};


function addRegularQuestion(regularQuestion) {
    return new Promise((resolve, reject) => {
        let addedRegularQuestion = new RegularQuestion(regularQuestion)

        addedRegularQuestion.save((err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info)
        });

    });
}

module.exports = {
    getAllRegularQuestions, 
    addRegularQuestion
}