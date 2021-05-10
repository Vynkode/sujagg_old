import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

//CSS
import './TrainLevel.css';

//Components
import Progress from '../Progress/Progress';

const TrainLevel = ({ socket, level }) => {
  const [active, setActive] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on(`train${level}Begin`, () => setActive(true));
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
      <Progress />
    </div>
  );
};

export default TrainLevel;
