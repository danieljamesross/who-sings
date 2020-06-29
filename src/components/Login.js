import React, { useContext } from 'react';
import QuizContext from '../context/QuizContext';
import { SET_NAME } from '../reducers/Types';

function Login() {
    const {state, dispatch} = useContext(QuizContext);
    const {name} = state;
    
    // const useLocalStorage = e => {
    
    // };

    const handleSubmit = (e) => {
	dispatch({type: SET_NAME, name: e.value});
    };
    return (
	<div className="login">
	    <form onSubmit={handleSubmit()}>
		<label>
		    <input
		    type="text"
		    placeholder="Enter your name"
	value={name}
	onChange={e => dispatch({type: SET_NAME, name: e.target.value})}
		    />
		</label>
		<input type="submit" value="Submit" />
	    </form>
	</div>
    );
};

export default Login;
