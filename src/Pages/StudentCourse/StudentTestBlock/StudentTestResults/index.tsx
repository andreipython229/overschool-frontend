import React from 'react';
import {Button} from "../../../../components/common/Button/Button";
import {useSendTestResultsMutation} from "../../../../api/userTestService";

interface TestResultProps {
  results: { [key: number]: boolean | string };
  test: number | string;
  user: any;
}

export const StudentTestResults: React.FC<TestResultProps> = ({ results , test, user}) => {
  const percentage = () => {
      const totalQuestions = Object.keys(results).length;
      const correctAnswers = Object.values(results).filter(answer => answer).length;
      return (
          correctAnswers / totalQuestions * 100
      )
  }

  const sendResults = () => {
      useSendTestResultsMutation();
  };


  return (
    <div>
      <h2>Результаты теста</h2>
      {Object.entries(results).map(([questionId, isCorrectAnswer]) => (
        <div key={questionId}>
          <p>Вопрос ID: {questionId}</p>
          <p>Правильный ответ: {isCorrectAnswer ? 'Да' : 'Нет'}</p>
        </div>
      ))}
        <h2>Процент правильных ответов: {percentage()}!</h2>
        <h2>Отправить результаты теста?</h2>
        <Button text={'Отправить результаты'} onClick={sendResults}/>
    </div>
  );
};
