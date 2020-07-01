import React, { useReducer } from 'react';
import generateQuestions from './components/Questions';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
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
    SET_NAME,
    SET_NAME_ERROR,
    SET_QUESTIONS,
    QUESTIONS_LOADED,
    IS_LOADING,
    UPDATE_LEADERBOARD,
} from './reducers/Types.js';
import QuizReducer from './reducers/QuizReducer.js';
import './App.css';

function App() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const initialState = {
	score: 0,
	questions: [],
	questionsLoaded: false,
	currentQuestion: 0,
	currentAnswer: '',
	answers: [],
	showResults: false,
	error: '',
	highScores,
	showPlayerScreen: true,
	count: 10,
	isLoading: true,
	name: "",
	nameError: "",
    };

    const [state, dispatch] = useReducer(QuizReducer, initialState);
    const {score, currentQuestion, currentAnswer, answers, showResults, error, showPlayerScreen,count, name, nameError, questions, questionsLoaded, isLoading} = state;
    const now = new Date().toUTCString();
    // We have to wait for the questions to be fetched from the API
    // before we can do anything. So we declare an async function...
    const setQuestions = async () => {
	const qs = await generateQuestions(5); // how many questions?
	return dispatch({type: SET_QUESTIONS, questions: qs});
    };
    // ... and then call it once.
    if (!questionsLoaded) {
	setQuestions().then(() => {
	    dispatch({type: IS_LOADING, isLoading: false});
	    dispatch({type: QUESTIONS_LOADED, questionsLoaded: true});
	});
    };

    const question = questions[currentQuestion];

    const renderError = () => {
	if (!error) {
	    return null;
	}
	return <div className="error">{error}</div>;
    };

    const renderNameError = () => {
	if (!nameError) {
	    return null;
	}
	return <div className="error">{nameError}</div>;
    };

    const renderResultsMark = (question, answer) => {
	if(question.correct_answer === answer.answer) {
	    return <span className="correct">Correct</span>;
	}
	return <span className="incorrect">Incorrect</span>;
    };

    const renderScore = () => {
	return <span className="score">Score: {score} / {questions.length}</span>;
    };

    const renderResultsData = () => {
	return answers.map(answer=> {
	    const question = questions.find(
		question => question.id === answer.questionId
	    );

	    return (
		<div key={question.id}>
		    Q {question.id}:&nbsp;
		    <span className="lyric">
			"{question.question}"
		    </span>&nbsp;-&nbsp;
		{renderResultsMark(question,answer)}
		</div>
	    );
	});
    };
    const restart = () => {
	dispatch({type: RESET_QUIZ});
    };
    
    const logout = () => {
	dispatch({type: SET_NAME, name: ""});
	dispatch({type: SET_SHOW_PLAYER_SCREEN, showPlayerScreen: true});
	restart();
    };


    const incScore = (question, answer) => {
	if(question.correct_answer === answer.answer) {
	    dispatch({type: SET_SCORE, score: score + 1});
	}
	return;
    };

    

    let t;

    const next = () => {
	clearTimeout(t);
	const answer = {questionId:question.id, answer: currentAnswer};
	if (!currentAnswer) {
	    dispatch({type: SET_ERROR, error: 'Please select an option'});
	    return;
	}
	answers.push(answer);
	dispatch({type: SET_ANSWERS, answers});
	dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

	incScore(question, answer);

	if (currentQuestion + 1 < questions.length) {
	    dispatch({type: SET_CURRENT_QUESTION,
		      currentQuestion: currentQuestion + 1});
	    
	    dispatch({type: SET_COUNT, count: 10});
	    return;
	} else {
	    dispatch({type: UPDATE_LEADERBOARD,
		      highScores: highScores.push({
			  name: name,
			  score: score,
			  time: now,
		      })
	    });
	    localStorage.setItem("highScores", JSON.stringify(highScores));
	    dispatch({type: SET_SHOW_RESULTS, showResults: true});
	};
    };
    const timer = () => {
	
	if (count > 0) {
	    t = setTimeout(() => {
		dispatch({type: SET_COUNT, count: count - 1});
	    }, 1000);
	} else {
	    clearTimeout(t);
	    dispatch({type: SET_COUNT, count: "Out of Time"});
	    // answer 'd' doesn't exist so this will be counted as
	    // a wrong answer.
	    dispatch({type: SET_CURRENT_ANSWER, currentAnswer: 'd'});
	  
	    next();
	}
	return (
	    <div>
		<h3>Time left: <span className="timer">{count}</span> secs</h3>
	    </div>
	);
    };
    
    const closePlayerScreen = () => {
	if (!name) {
 	    dispatch({type: SET_NAME_ERROR, nameError: 'Please enter a username'});
 	    return;
	} else {
	    dispatch({type: SET_SHOW_PLAYER_SCREEN, showPlayerScreen: false});
	}
	return;
    };

    const showHighScores = () => {
	if (highScores.length > 0) {
	    let sorted = highScores;
	    if (highScores.length > 1) {
		sorted = highScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
	    }
	    
	    const scores = sorted.map((e, index) => 
		<li key={index}>{e.name} scored {e.score} on {e.time}</li>
	    );
	    
	    return (
		<div className="results">
		    <h3>HighScores</h3>
		    {scores}
		</div>
	    );
	} else return null;
    };

    const showPlayerScores = () => {
	if (highScores.length > 0) {
	    const playerScores = [];
	    highScores.map((e, index) => {
		if (e.name === name) {
		    playerScores.push(<li key={index}>{e.score} on {e.time}</li>);
		}
		return playerScores;
	    });
	    if (playerScores){
		return (
		    <div className="results">
			<h3>{name}'s Recent Scores</h3>
			{playerScores}
		    </div>
		);
	    } else return null;
	} else return null;
    };

    const resetData = () => {
	localStorage.clear();
	dispatch({type: UPDATE_LEADERBOARD, highScores: []});
	showPlayerScores();
	return;
    };

    if (isLoading) {
	return (
	    <div className="container loading">
		<h3>Loading...</h3>
	    </div>
	);
    } else if (showResults) {
	return (
	    <div className="container results">
		<h2>Results</h2>
		<ul>{renderResultsData()}</ul>
		{renderScore()}
		<button className="btn btn-primary"
		    onClick={restart}>
		    Restart</button>
		<button className="btn btn-primary"
		    onClick={logout}>
		    Log Out</button>
		{showHighScores()}
		{showPlayerScores()}
	    </div>
	);
    } else if (showPlayerScreen) {
	return (
	    <QuizContext.Provider value={{state, dispatch}}>
		<div className="container player">
		    <h1>Who Sings?</h1>
		    <h3>Enter your username:</h3>
		    {renderNameError()}
		    <form>
			<input value={name}
			       onChange={e => dispatch({
				   type: SET_NAME,
				   name: e.target.value})}
			       placeholder="Enter username..." 
			/>
		    </form>
		    <button className="btn btn-primary"
			    onClick={closePlayerScreen}>
			Start
		    </button>
		<button className="btn btn-secondary"
		    onClick={resetData}>
		    Clear Saved Data</button>
		</div>
	    </QuizContext.Provider>
	);
    }
    else {
	return (
	    <QuizContext.Provider value={{state, dispatch}}>
		<div className="container">
		    <Progress total={questions.length}
			      current={currentQuestion + 1} />
		    <h2>{name}, who sings the following line?</h2>
		    <Question />
		    {renderError()}
		    <Answers />
		    <button className="btn btn-primary"
			onClick={next}>
			Submit</button>
		    {timer()}
		    <button className="btn btn-secondary"
			    onClick={logout}>
			Log Out</button>
		</div>
	    </QuizContext.Provider>
	);
    } 
}

export default App;
