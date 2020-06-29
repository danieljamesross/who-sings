// import React, { useContext } from 'react';
// import QuizContext from '../context/QuizContext';
// /* import { SET_COUNT } from '../reducers/Types' */

// function Counter() {
//     const {state, dispatch} = useContext(QuizContext);
//     const {count, name} = state;
    
//     return (
// 	<div className="counter">
// 	    <h3>{name}, you have {count} seconds left</h3>
// 	</div>
//     );
// };

// export default Counter;


import React, {useState, useRef, useEffect, useContext} from 'react';
import QuizContext from '../context/QuizContext';
//import { SET_COUNT } from '../reducers/Types';

const Counter = (props) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const {state, dispatch} = useContext(QuizContext);
    const {count} = state;
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

export default Counter;
