import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

//CSS
import './HypeTrain.css';

//Components
import TrainLevel from '../../components/TrainLevel/TrainLevel';

const HypeTrain = () => {
  const [trainStatus, setTrainStatus] = useState(false);
  // const [level1, setLevel1] = useState(false);
  // const [level2, setLevel2] = useState(false);
  // const [level3, setLevel3] = useState(false);
  // const [level4, setLevel4] = useState(false);
  // const [level5, setLevel5] = useState(false);

  // const currentLevelRef = useRef(0);
  const socketRef = useRef();

  // const levelUp = () => {
  //   if (currentLevelRef.current === 1) setLevel1(true);
  //   if (currentLevelRef.current === 2) setLevel2(true);
  //   if (currentLevelRef.current === 3) setLevel3(true);
  //   if (currentLevelRef.current === 4) setLevel4(true);
  //   if (currentLevelRef.current === 5) setLevel5(true);
  // };

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on('trainBegin', data => {
      console.log(data);
      setTrainStatus(true);
      // setTimeout(() => {
      //   currentLevelRef.current = 1;
      //   levelUp();
      // }, 500);
    });
    socketRef.current.on('trainFinish', data => {
      console.log(data);
      setTrainStatus(false);
    });
    // socketRef.current.on('levelUp', data => {
    //   currentLevelRef.current = currentLevelRef.current + data;
    //   levelUp();
    // });
    //   setTrainStatus(
    //       trainStatus.map(train => {
    //         if (train.level !== data.level) return train;
    //         return { ...train, progress: train.progress + data.progress };
    //       })
  }, []);

  // useEffect(() => {
  //   console.log(currentLevel);
  // }, [currentLevel]);

  return trainStatus ? (
    <section>
      <TrainLevel socket={socketRef} level={1} />
      <TrainLevel socket={socketRef} level={2} />
      <TrainLevel socket={socketRef} level={3} />
      <TrainLevel socket={socketRef} level={4} />
      <TrainLevel socket={socketRef} level={5} />
    </section>
  ) : (
    <></>
  );
};

export default HypeTrain;
