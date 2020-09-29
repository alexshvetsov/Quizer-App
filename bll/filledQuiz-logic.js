const FilledQuiz = require('../models/filledQuiz-model');

function getAllfilledQuizesByUser(user) {
    return new Promise((resolve, reject) => {

        FilledQuiz.find({ user: user._id.toString() }).populate('user').populate('folder').exec((err, filledQuizes) => {
            if (err) return reject(err)
            resolve(filledQuizes)
        })
    })
}

function addFilledQuiz(filledQuiz) {
    return new Promise((resolve, reject) => {
        let addedFilledQuiz = new FilledQuiz(filledQuiz)

        addedFilledQuiz.save((err, info) => {
            if (err) {
                return reject(err)
            };
            resolve(info)
        });
    });
}

module.exports = {
    addFilledQuiz,
    getAllfilledQuizesByUser
}