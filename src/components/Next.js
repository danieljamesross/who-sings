import React, { useContext, useReducer } from 'react';
import QuizContext from '../context/QuizContext';
import QuizReducer from '../reducers/QuizReducer.js';
import questions from '../components/Questions';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    SET_SCORE,
    RESET_QUIZ,
    SET_SHOW_PLAYER_SCREEN,
    SET_COUNT,
} from '../reducers/Types.js';
const [state, dispatch] = useReducer(QuizReducer);
const {score, currentQuestion, currentAnswer, answers, showResults, error, showPlayerScreen,count, name} = state;


const incScore = (question, answer) => {
    if(question.correct_answer === answer.answer) {
	dispatch({type: SET_SCORE, score: score + 1});
	return;
    }
    return;
};

const next = (question) => {
    const answer = {questionId:question.id, answer: currentAnswer};

    if (!currentAnswer) {
	dispatch({type: SET_ERROR, error: 'Please select an option'});
	return;
    }
    answers.push(answer);
    dispatch({type: SET_ANSWERS, answers});
    dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});
    
    incScore(question, answer);
    console.log("score: " + score + " q: " + question.id);
    
    if (currentQuestion + 1 < questions.length) {
	dispatch({type: SET_CURRENT_QUESTION,
		  currentQuestion: currentQuestion + 1});
	dispatch({type: SET_COUNT, count: 3});
	return;
    } else {
	

	dispatch({type: SET_SHOW_RESULTS, showResults: true});
    };

};

export default next;
