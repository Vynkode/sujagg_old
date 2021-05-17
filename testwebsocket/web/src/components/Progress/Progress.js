import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Progress = ({ level }) => {
  const [progress, setProgress] = useState(0);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on(`progress${level}`, () =>
      setProgress(prevState => prevState + 20)
    );
    socketRef.current.on('disconnect', () => {
      console.log(socketRef.current.connected);
    });
    return function disconnect() {
      socketRef.current.disconnect();
    };
  }, []);

  return <div className={`progress ${progress > 15 ? 'active' : ''}`}></div>;
};

export default Progress;
