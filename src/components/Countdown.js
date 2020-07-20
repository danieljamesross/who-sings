import React, {useState, useEffect, useRef} from 'react';

function Countdown() {
  const [count, setCount] = useState(10);
  const savedCallback = useRef();
//dispatch({TYPE: SET_COUNT, count: count - 1});
  function callback() {
    setCount(count - 1);
  }

  useEffect(() => {
    savedCallback.current = callback;  });

  useEffect(() => {
    function tick() {
      savedCallback.current();    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}

export default Countdown;
