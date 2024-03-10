import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounterComponent = () => {
  const [count, setCount] = useState(0);


  useEffect(() => {
    axios.get('http://localhost:3001/count')
      .then(res => res.data)
      .then(data => setCount(data.count));
  }, [count]);

  const handleIncrement = async () => {
    try {
      const response = await axios.post('http://localhost:3001/increment');
      const data = response.data;
      console.log(data.count,'o');
    } catch (error) {
      console.error('Error incrementing:', error);
    }
  };
  

  const handleDecrement = async () => {
    try {
      const response = await axios.post('http://localhost:3001/decrement');
      const data = response.data;
      console.log(data.count);
    } catch (error) {
      console.error('Error decrementing:', error);
    }
  };
  


  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
