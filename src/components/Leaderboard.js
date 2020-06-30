import React, {useContext} from 'react';
//import highScores from '../components/HighScores';
import QuizContext from '../context/QuizContext';
import {UPDATE_LEADERBOARD} from '../reducers/Types.js';

function Leaderboard(props) {
    // const {state, dispatch} = useContext(QuizContext);
    // const {highScores} = state;
    // const compare = (a, b) => {
    // 	const scoreA = a.score;
    // 	const scoreB = b.Score;
	
    // 	let comparison = 0;
    // 	if (scoreA > scoreB) {
    // 	    comparison = 1;
    // 	} else if (scoreA < scoreB) {
    // 	    comparison = -1;
    // 	}
    // 	return comparison;
    // };
    
    let sorted = props.highScores;
    if (props.highScores.length > 1) {
	sorted = props.highScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
	// dispatch({type: UPDATE_LEADERBOARD, props.highScores: sorted});
    }
    console.log("th: " + typeof(props.highScores));
    const scores = [];
    const leaders = () => {
	for (const [i, e] of props.highScores.entries()) {
    	    scores.push(<li key={i}>{e.name} scored {e.score} on {e.time}</li>);
    	}};

    console.log(scores);


    return (
	    <div className="leaderboard">
	    <h3>High Scores</h3>
	    {scores}
	</div>
    );

};

export default Leaderboard;


		// <QuizContext.Provider value={{state, dispatch}}>
		// <Leaderboard highScores={JSON.parse(localStorage.getItem('highScores'))} />
		// </QuizContext.Provider>
