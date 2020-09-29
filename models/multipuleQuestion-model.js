const mongoose = require("mongoose");

const multipuleQuestionSchema = mongoose.Schema({
    question: String,
    answers: [String],
    correctAnswer: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
}, { versionKey: false })

const MultipuleQuestion = mongoose.model("MultipuleQuestion", multipuleQuestionSchema, "multipuleQuestions");

module.exports = MultipuleQuestion;  