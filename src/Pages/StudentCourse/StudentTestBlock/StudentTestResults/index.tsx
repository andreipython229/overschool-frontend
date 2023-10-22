import React, {useEffect, useState} from 'react';
import {Button} from "../../../../components/common/Button/Button";
import {useSendTestResultsMutation} from "../../../../api/userTestService";
import styles from "./studentTestResults.module.scss";
import {AnswersT} from "../../../../components/AddQuestion";

type NewAnswer = {
    question_id: number
    question_name: string
}
interface TestResultProps {
    results: { [key: number]: boolean | string };
    full_results: AnswersT[] | undefined;
    test: number | string;
    user: any;
    success_prercent: number;
    questions: QuestionT[];
    showRightAnswers: boolean
}

type QuestionT = {
    question_type: keyof object
    body: string
    answers: AnswersT[]
    question_id: number
}

export const StudentTestResults: React.FC<TestResultProps> = ({results, test, user, success_prercent, questions, showRightAnswers, full_results}) => {
    const [sendTestResults, {isSuccess}] = useSendTestResultsMutation();
    const [showResult, setShowResult] = useState(true);

    const percentage = () => {
        const totalQuestions = Object.keys(results).length;
        const correctAnswers = Object.values(results).filter(answer => answer).length;
        return (
            correctAnswers / totalQuestions * 100
        )
    }

    const testResults = {
        success_percent: percentage(),
        status: percentage() >= success_prercent,
        test: test as number,
        user: user
    }

    useEffect(() => {
        console.log('test results', results)
    }, [results]);

    useEffect(() => {
        console.log('test full_results', full_results)
    }, [full_results]);

    const handleSendResults = (body: { [key: string]: any }) => {
        sendTestResults(body)
            .unwrap()
            .then(() => setShowResult(false))
            .catch((error) => {
                return null
            });
    };

    const getUserAnswer = (question_id: number) => {
        return full_results?.find((answer) => answer.question === question_id);
    };

    return (
        (showResult ?
                (<div className={styles.wrapper}>
                        <p>Отправить результаты теста?</p>
                        <Button style={{marginTop: "5px"}} text={'Отправить результаты'} onClick={() => handleSendResults(testResults)}/>
                    </div>
                ) : (
                    <div className={styles.wrapper}>
                        <p>Результаты теста:</p>
                        <p>Правильных ответов: {percentage()}%!</p>
                        <p>Для зачета необходимо: {success_prercent}%!</p>
                        {showRightAnswers && (
                            <div className={styles.wrapper__userCorrectAnswer}>
                                {questions.map((question, index) => {
                                    const userAnswer = full_results ? full_results[question.question_id] : undefined;
                                    const correctAnswer = question.answers.find((answer) => answer.is_correct);

                                    return (
                                        <div className={styles.wrapper__answer_box} key={question.question_id}>
                                            <p>{question.body}</p>
                                            <div className={userAnswer?.is_correct ? styles.wrapper__answer__right : styles.wrapper__answer__mistake}>
                                                <p>Правильный ответ: {correctAnswer?.body}</p>
                                                <p>Ваш ответ: {userAnswer?.body}</p>
                                            </div>

                                        </div>
                                    )
                                })}

                        </div>
                        )}

                        <p>Ты сегодня отлично поработал, можно и отдохнуть :)</p>
                    {/* ********************************************************* */}
                    </div>
                )
        )
    )};
