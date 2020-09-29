// enum = רשימה סגורה של קבועים
// לדוגמה, ימות השבוע
// לדוגמה, חודשי השנה
// לדוגמה, מצב משפחתי

// ActionType - רשימת הפעולות הניתנות לביצוע על המידע של האפליקציה
export enum ActionType {
    login,
    logout,
    addFolder,
    getAllFolders,
    getAllMultipuleQuestions,
    getAllRegularQuestions,
    OpenFolder,
    addMultipuleQuestion,
    setAnswer,
    startQuiz,
    finishQuiz,
    getAllFinishedQuizes,
    clearAnswers,
    switchform,
    saveHistory
}