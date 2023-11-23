import React, {useEffect, useState} from 'react';
import {Button} from "../../../../components/common/Button/Button";
import styles from "./studentTestResults.module.scss";
import {AnswersT} from "../../../../components/AddQuestion";
import {SimpleLoader} from "../../../../components/Loaders/SimpleLoader";

type NewAnswer = {
    question_id: number
    question_name: string
}

interface TestResultProps {
    full_results: AnswersT[] | undefined;
    success_percent: number;
    user_percent: number
    questions: QuestionT[];
    showRightAnswers: boolean
    onCompleteTest: () => void
    setNumberTest: any
    showResult: boolean
}

type QuestionT = {
    question_type: keyof object
    body: string
    answers: AnswersT[]
    question_id: number
}

export const StudentTestResults: React.FC<TestResultProps> = ({
                                                                  success_percent,
                                                                  user_percent,
                                                                  questions,
                                                                  showRightAnswers,
                                                                  full_results,
                                                                  onCompleteTest,
                                                                  setNumberTest,
                                                                  showResult,
                                                              }) => {

    const handleRestartTest = () => {
        onCompleteTest();
        setNumberTest(0)
    };

    return (
        showResult ?
            (<div className={styles.wrapper}>
                    <p>Результаты теста:</p>
                    <p>Правильных ответов: {user_percent}%!</p>
                    <p>Для зачета необходимо: {success_percent}%!</p>
                    {user_percent >= success_percent ? (<>{showRightAnswers && (
                            <div className={styles.wrapper__userCorrectAnswer}>
                                {questions.map((question, index) => {
                                    const userAnswer = full_results ? full_results[question.question_id] : undefined;
                                    const correctAnswer = question.answers.find((answer) => answer.is_correct);
                                    return (
                                        <div className={styles.wrapper__answer_box} key={question.question_id}>
                                            <p>{question.body}</p>
                                            <div
                                                className={userAnswer?.is_correct ? styles.wrapper__answer__right : styles.wrapper__answer__mistake}>
                                                <p>Правильный ответ: {correctAnswer?.body}</p>
                                                <p>Ваш ответ: {userAnswer?.body}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>)}
                            <p>Ты сегодня отлично поработал, можно и отдохнуть :)</p></>
                    ) : <div className={styles.wrapper}>
                        <Button text={"Пройти заново"} variant="primary" onClick={handleRestartTest}
                                style={{margin: "auto"}}/>
                    </div>
                    }
                </div>
            ) : <SimpleLoader style={{width: '100px', height: '100px'}}/>
    )
};
