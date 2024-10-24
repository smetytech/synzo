export interface IGeneratedQuestion {
    id: string;
    question: string;
    options: string[];
    answer: string;
};

export interface IQuestion {
    id: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    user_answer: string;
    correct_answer: string;
};

export interface IQuiz {
    quizId: string;
    quizInfoData: IQuestion[];
};