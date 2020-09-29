const mongoose = require("mongoose");

const regularQuestionSchema = mongoose.Schema({
    question: String,
    answer: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }
}, { versionKey: false })

const RegularQuestion = mongoose.model("RegularQestion", regularQuestionSchema, "regularQuestions");

module.exports = RegularQuestion;