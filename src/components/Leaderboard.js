import React from 'react';
import highScores from '../components/HighScores';


function Leaderboard() {
//    const {state} = useContext(QuizContext);
    const sorted = highScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    const leaders =
	  sorted.map((e, index) => (
		  <li key={index}>
		  {e.name} scored {e.score} on {e.time}
	      </li>
	  ));
    return (
	    <div className="leaderboard">
	    <h3>High Scores</h3>
	    <ol>
	    {leaders}
	</ol>
	    </div>
    );

}
export default Leaderboard;
