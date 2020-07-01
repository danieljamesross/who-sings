import {
    SET_CURRENT_ANSWER,
    SET_CURRENT_QUESTION,
    SET_QUESTIONS,
    IS_LOADING,
    QUESTIONS_LOADED,
    SET_ERROR,
    SET_NAME_ERROR,
    SET_SHOW_RESULTS,
    SET_SHOW_PLAYER_SCREEN,
    SET_ANSWERS,
    SET_SCORE,
    RESET_QUIZ,
    SET_COUNT,
    SET_NAME,
    UPDATE_LEADERBOARD
} from './Types.js';

function QuizReducer(state, action) {
    switch(action.type) {
	case SET_CURRENT_ANSWER:
	    return {
		...state,
		currentAnswer: action.currentAnswer,
	    };
	case SET_CURRENT_QUESTION:
	    return {
		...state,
		currentQuestion: action.currentQuestion,
	    };
	case SET_QUESTIONS:
	    return {
		...state,
		questions: action.questions,
	    };
	case IS_LOADING:
	    return {
		...state,
		isLoading: action.isLoading,
	    };
	case QUESTIONS_LOADED:
	    return {
		...state,
		questionsLoaded: action.questionsLoaded,
	    };
	case SET_ERROR:
	    return {
		...state,
		error: action.error,
	    };
	case SET_NAME_ERROR:
	    return {
		...state,
		nameError: action.nameError,
	    };
	case SET_SHOW_RESULTS:
	    return {
		...state,
		showResults: action.showResults,
	    };
	case SET_SHOW_PLAYER_SCREEN:
	    return {
		...state,
		showPlayerScreen: action.showPlayerScreen,
	    };
	case SET_ANSWERS:
	    return {
		...state,
		answers: action.answers,
	    };
	case SET_SCORE:
	    return {
		...state,
		score: action.score,
	    };
	case RESET_QUIZ:
	    return {
		...state,
		answers: [],
		score: 0,
		currentAnswer: '',
		currentQuestion: 0,
		showResults: false,
		error: '',
		count: 10,
	    };
	case SET_COUNT:
	    return {
		...state,
		count: action.count,
	    };
	case SET_NAME:
	    return {
		...state,
		name: action.name,
	    };
	case UPDATE_LEADERBOARD:
	    return {
		...state,
		highScores: action.highScores,
	    };
	default:
	    return state;
    }
};

export default QuizReducer;
