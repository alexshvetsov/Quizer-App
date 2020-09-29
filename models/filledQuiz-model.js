const mongoose = require("mongoose");

const filledQuizSchema = mongoose.Schema({
    totalTime: Number,
    timeLeft: Number,
    date: Date,
    answers: [{ realIndex: Number, correctAnswer: Number, inQuizIndex: Number, chosenAnswer: String }],
    questionArray: [{ realIndex: Number, question: [] }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
}, { versionKey: false })

const FilledQuiz = mongoose.model("FilledQuiz", filledQuizSchema, "filledQuizes");

module.exports = FilledQuiz;


