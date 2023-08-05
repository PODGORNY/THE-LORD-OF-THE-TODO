import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import getPadTime from "./getPadTime";

import './Timer.css';


const Timer = (props) => {

  const { min, sec } = props;

  const allTime = 60 * min + sec;

  const [timeLeft, setTimeLeft] = useState(allTime);
  const [isCounting, setIsCounting] = useState(false);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);


  useEffect(() => {
    const interval = setInterval(()=> {
      isCounting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
      }, 1000)

      if (timeLeft === 0) setIsCounting(false);
        return () => {
          clearInterval(interval);
        }
  }, [isCounting, timeLeft])


  const handlePlay = () => {
    setIsCounting(true);
  };
  const handlePause = () => {
    setIsCounting(false);
  };

  return (
    <div className="timer_box">
    <div className="timer">
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
    <div className="buttons">
      {isCounting ? (
        <button type="button" className="icon icon-pause" onClick={handlePause} />
      ) : (
        <button type="button" className="icon icon-play" onClick={handlePlay} />
      )}
    </div>
  </div>
  );

};

Timer.propTypes = {
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
}


export default Timer;