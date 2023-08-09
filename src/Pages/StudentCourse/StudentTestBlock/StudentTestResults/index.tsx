import React, {useState} from 'react';
import {Button} from "../../../../components/common/Button/Button";
import {useSendTestResultsMutation} from "../../../../api/userTestService";
import styles from "./studentTestResults.module.scss";


interface TestResultProps {
    results: { [key: number]: boolean | string };
    test: number | string;
    user: any;
    success_prercent: any;
}

export const StudentTestResults: React.FC<TestResultProps> = ({results, test, user, success_prercent}) => {
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
        success_percent: String(percentage()),
        status: percentage() > 80,
        test: test as number,
        user: user
    }

    const handleSendResults = (body: { [key: string]: any }) => {
        sendTestResults(body)
            .then(() => setShowResult(false))
            .catch((error) => console.log(`Возникла непредвиденная ошибка: ${error}`));
    };


    return (
        (showResult ?
                (<div className={styles.wrapper}>
                        <p>Результаты теста:</p>
                        <p>Правильных ответов: {percentage()}%!</p>
                        <p>Отправить результаты теста?</p>
                        <Button style={{marginTop: "5px"}} text={'Отправить результаты'} onClick={() => handleSendResults(testResults)}/>
                    </div>
                ) : (
                    <div className={styles.wrapper}>
                        <p>Ты сегодня отлично поработал, можно и отдохнуть :)</p>
                    </div>
                )
        )
    )};
