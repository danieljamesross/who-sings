import React, {useContext} from 'react';
import Answer from './Answer';
import QuizContext from '../context/QuizContext';

function Answers() {
    const {state, dispatch} = useContext(QuizContext);
    const {currentAnswer, currentQuestion, questions} = state;
    const question = questions[currentQuestion]; 
    return (
	<div className="answers">
	    <Answer letter="a"
		    answer={question.answer_a}
		    dispatch={dispatch}
	selected={currentAnswer === 'a' }/>
	    <br />
	    <Answer letter="b"
		    answer={question.answer_b}
		    dispatch={dispatch}
	selected={currentAnswer === 'b' }/>
	    <br />
	    <Answer letter="c"
		    answer={question.answer_c}
		    dispatch={dispatch}
		    selected={currentAnswer === 'c' }/>
	</div>
    );
};

export default Answers;
