import React from 'react';

function Progress(props) {

    return (
	<h3>Question {props.current} of {props.total}</h3>
    );
};

export default Progress;
