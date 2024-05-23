import React, { useEffect, useState } from 'react';
interface TimerProps {
  targetDate: Date;
}

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
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

  const formatTimeUnit = (value: number, unit: string) => {
    const unitForms: { [key: string]: string } = {
      days: 'дн',
      hours: 'ч',
      minutes: 'мин',
      seconds: 'сек',
    };

    return `${value} ${unitForms[unit]}`;
  };

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {formatTimeUnit(timeLeft[interval as keyof typeof timeLeft], interval)}{' '}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Время истекло</span>}
    </div>
  );
};

export default Timer;