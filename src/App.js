import React, { useReducer, useState, useRef, useEffect, useContext } from 'react';
import generateQuestions from './components/Questions';
import Progress from './components/Progress';
import Question from './components/Question';
import Player from './components/Player';
import highScores from './components/HighScores';
//import Counter from './components/Counter';
import Answers from './components/Answers';
//import Login from './components/Login';
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
    SET_NEW_SCORE,
    UPDATE_LEADERBOARD,
//    UPDATE_LOCAL_STORAGE
} from './reducers/Types.js';
import QuizReducer from './reducers/QuizReducer.js';
import './App.css';

function App() {

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
	count: 3,
	isLoading: true,
	name: "",
	nameError: "",
    };

    const [state, dispatch] = useReducer(QuizReducer, initialState);
    const {score, currentQuestion, currentAnswer, answers, showResults, error, showPlayerScreen,count, name, nameError, questions, questionsLoaded, isLoading,} = state;
    const d = new Date();
    const month = d.getMonth() + 1;
    const now = d.getDate() + '/' + month + '/' + d.getFullYear();
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
	 console.log("Final score: " + score);
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
    }


    const incScore = (question, answer) => {
	if(question.correct_answer === answer.answer) {
	    dispatch({type: SET_SCORE, score: score + 1});
	}
	return;
    };

    


    const next = () => {
	const answer = {questionId:question.id, answer: currentAnswer};
	console.log(currentAnswer);
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
	    dispatch({type: UPDATE_LEADERBOARD,
		      highScores: highScores.push({
			  name: name,
			  score: score,
			  time: now,
		      })
		     });
	    console.log("hs: " + highScores);
	    localStorage.setItem("highScores", JSON.stringify(highScores));
	    dispatch({type: SET_SHOW_RESULTS, showResults: true});
	};

    };

    if (count <= 0) {
	dispatch({type: SET_CURRENT_ANSWER, currentAnswer: 'd'});
	next();
	return;
    };

  
    // localStorage.setItem('highScores', JSON.stringify(highScores));
    // dispatch({type: UPDATE_LEADERBOARD, highScores: highScores});

    const Counter = () => {
    	const [time, setTime] = useState(new Date().toLocaleTimeString());
    	const secondsPassed = useRef(count);

    	useEffect(() => {
    	    const timeout = setTimeout(() => {
    		const date = new Date();
    		secondsPassed.current = secondsPassed.current - 1;
    		setTime(date.toLocaleTimeString());
    	    }, 1000);
    	    return () => {
    		clearTimeout(timeout);
    	    };
    	}, [time]);

    	if(secondsPassed.current <= 0) {
    	    dispatch({type: SET_CURRENT_ANSWER, currentAnswer: 'd'});
    	    next();
    	    return  (
    		<div>
    		    <div>Out of Time!</div>
    		</div>
    	    );
    	} else {

    	    return (
    		<div>
    		    <div>{secondsPassed.current} seconds remaining</div>
    		</div>
    	    );
    }};


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
	if (highScores) {
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
	const playerScores = [];
	highScores.map((e, index) => {
	    if (e.name == name) {
		playerScores.push(<li key={index}>{e.score} on {e.time}</li>);
	    }
	});
	if (playerScores){
	    return (
		<div className="results">
		    <h3>{name}'s Recent Scores</h3>
		    {playerScores}
		</div>
	    );
	} else return null;
    }

    if (isLoading) {
	return (
	    <div className="container loading">
		<h3>Loading...</h3>
	    </div>
	);
    } 
    else if (showResults) {
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
		    Logout</button>
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
			       placeholder={name}
			/>
		    </form>
		    <button className="btn btn-primary"
			    onClick={closePlayerScreen}>
			Start
		    </button>
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
		</div>
	    </QuizContext.Provider>
	);
    } 
}

export default App;
