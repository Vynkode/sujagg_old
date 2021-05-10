import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import './TrainLevel.css';

const TrainLevel = ({ socket, level }) => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on(`train${level}Begin`, () => setActive(true));
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
  console.log(`Render Train ${level}`);
  return (
    <div className={`train train${level} ${active > 0 ? 'active' : ''}`}>
      <div className={`progress ${progress > 15 ? 'active' : ''}`}></div>
      <div className={`progress ${progress > 35 ? 'active' : ''}`}></div>
      <div className={`progress ${progress > 55 ? 'active' : ''}`}></div>
      <div className={`progress ${progress > 75 ? 'active' : ''}`}></div>
      <div className={`progress ${progress > 95 ? 'active' : ''}`}></div>
    </div>
  );
};

export default TrainLevel;
