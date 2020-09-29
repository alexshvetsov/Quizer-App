const express = require('express');
const cors = require('cors');
const keys = require('./config/keys');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRoutes = require('./controllers/auth-controller');
const foldersRoutes = require('./controllers/folders-controller');
const multipuleQuestionRoutes = require('./controllers/multipuleQuestion-controller');
const regularQuestionRoutes = require('./controllers/regularQuestion-controller');
const filledQuizRouts = require('./controllers/filledQuiz-controller')
const passport = require("passport")
const passportSetup = require('./config/passport-config');
const mongoose = require("mongoose");
const expressSession = require('express-session')
const path = require('path')


// Setting Server Up
const app = express();

//////////////body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieSession({
    name: 'quizCookie',
    maxAge: 24 * 60 * 60 * 10000,
    keys: [keys.session.cookieKey],
    httpOnly: false
}));

//init passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());


// parse application/json



app.use(cors({
    // origin: ['https://fathomless-garden-43680.herokuapp.com'],  
    origin: ['http://localhost:3000'],   
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,                // required to pass 
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
}));
app.use(require('express').static(__dirname));

mongoose.set('useCreateIndex', true);
// Setting DB Up
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, 
    useFindAndModify: false, useCreateIndex: true }, (err, mongoClient) => {
    if (err) return console.log(err);
    console.log(`Connected to ${mongoClient.name}`);
});
 

 
// mongoose.connect('mongodb://alex1412:As141290@ds343985.mlab.com:43985/quiz_app' 
//     , {
//         useNewUrlParser: true, useUnifiedTopology: true, 
//         useFindAndModify: false, useCreateIndex: true
//     }, (err, mongoClient) => {
//         if (err) return console.log(err); 
//         console.log(`Connected to ${mongoClient.name}`);
//     });

app.use('/auth', authRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/multipuleQuestions', multipuleQuestionRoutes);
app.use('/api/regularQuestions', regularQuestionRoutes);
app.use('/api/filledQuizes', filledQuizRouts);

//sereve static assets if in production

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 3001; 
// app.listen(3001, () => console.log("Listening..."));
app.listen(PORT, () => { 
console.log('Listning... '+PORT)});


