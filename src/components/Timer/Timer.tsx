import React, { useEffect, useState } from 'react';
interface TimerProps {
  targetDate: Date;
  target?: string;
}

const Timer: React.FC<TimerProps> = ({ targetDate, target }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const endMin = target === 'bonus' ? ':' : 'мин'
  const endSec = target === 'bonus' ? '' : 'сек'

  const formatTimeUnit = (value: number, unit: string) => {
    const unitForms: { [key: string]: string } = {
      days: 'дн',
      hours: 'ч',
      minutes: endMin,
      seconds: endSec,
    };

    return `${value} ${unitForms[unit]}`;
  };

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && !target) {
      return;
    }

    timerComponents.push(
    <>
      <span key={interval}>
        {formatTimeUnit(timeLeft[interval as keyof typeof timeLeft], interval)}{(!target || (target === 'bonus' && interval !== 'hours')) && ' '}
      </span>
      {target === 'bonus' && interval === 'hours' && <br/>}
    </>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Время истекло</span>}
    </div>
  );
};

export default Timer;