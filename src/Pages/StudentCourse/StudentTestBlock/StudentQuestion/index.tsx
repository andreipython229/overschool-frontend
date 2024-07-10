import {FC, useEffect, useState} from 'react'
import styles from './studentQuestion.module.scss'
import {StudentAnswer} from '../StudentAnswer'
import {Button} from 'components/common/Button/Button'
import {answerT} from 'types/sectionT'
import {AnswersType} from "../index";
import {queryByTestId} from "@testing-library/react";
import {AnswersT} from "../../../../components/AddQuestion";
import {useSendTestResultsMutation} from "../../../../api/userTestService";

type question = {
    question_id: number
    answers: answerT[]
}

type StudentQuestionT = {
    questions: question[] | any
    length: any
    numberTest: number
    setNumberTest: any
    userAnswers?: any
    updateUserAnswers?: any
    onCompleteTest: () => void
    userAnswerFull: any
    setUserAnswerFull: any
    test: number | string;
    user: any;
    setShowResult: any
    setUserPercent: any
}

export const StudentQuestion: FC<StudentQuestionT> = ({
    questions,
    length,
    numberTest,
    setNumberTest,
    userAnswers = {},
    updateUserAnswers,
    onCompleteTest,
    userAnswerFull,
    setUserAnswerFull,
    test,
    user,
    setShowResult,
    setUserPercent
}) => {
    const questionLength = length.length;
    const schoolName = window.location.href.split('/')[4];
    const nameAnswer = (questions && questions.body.length > 0) ? questions.body : '';
    const progress = (100 / questionLength) * (numberTest + 1);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [resetSelection, setResetSelection] = useState<boolean>(false);
    const [sendTestResults, { isSuccess }] = useSendTestResultsMutation();

    const handleAnswerSelect = (isCorrect: boolean, answer_id: string, title: string) => {
        const answerIdNum = parseInt(answer_id); // Преобразование answer_id в число
        const selectedAnswer = {
            answer_id: answerIdNum,
            body: title,
            is_correct: isCorrect,
            question: questions.question_id
        };

        updateUserAnswers((prevAnswers: AnswersType) => {
            const currentAnswers = Array.isArray(prevAnswers[questions.question_id]) ? prevAnswers[questions.question_id] : [] as number[];
            if (!Array.isArray(currentAnswers)) {
                console.error("Expected currentAnswers to be an array.");
                return prevAnswers;
            }
            const updatedAnswers = currentAnswers.includes(answerIdNum)
                ? currentAnswers.filter((id: number) => id !== answerIdNum)
                : [...currentAnswers, answerIdNum];
            return {
                ...prevAnswers,
                [questions.question_id]: updatedAnswers,
            };
        });

        setUserAnswerFull((prevUserAnswer: AnswersType) => {
            const currentAnswers = Array.isArray(prevUserAnswer[questions.question_id]) ? prevUserAnswer[questions.question_id] : [] as any[];
            if (!Array.isArray(currentAnswers)) {
                console.error("Expected currentAnswers to be an array.");
                return prevUserAnswer;
            }
            const updatedAnswers = currentAnswers.some((ans: any) => ans.answer_id === selectedAnswer.answer_id)
                ? currentAnswers.filter((ans: any) => ans.answer_id !== selectedAnswer.answer_id)
                : [...currentAnswers, selectedAnswer];
            return {
                ...prevUserAnswer,
                [questions.question_id]: updatedAnswers,
            };
        });

        setButtonDisabled(false);
    }

    const handleNextQ = () => {
        if (numberTest + 1 <= questionLength) {
            setNumberTest(numberTest + 1);
            setResetSelection(true);
        }
        setButtonDisabled(true);
    }

    const percentage = () => {
        const totalQuestions = Object.keys(userAnswers).length;
        const correctAnswers = Object.values(userAnswers).filter(answerArray =>
            Array.isArray(answerArray) && answerArray.every((answer: any) => answer.is_correct)).length;
        return (
            parseFloat((correctAnswers / totalQuestions * 100).toFixed(2))
        );
    }

    const handleCompleteTest = () => {
        onCompleteTest();
        setUserPercent(percentage());
        const testResults = {
            success_percent: percentage(),
            test: test as number,
            user: user
        }
        sendTestResults({ body: testResults, schoolName }).unwrap().then(() => {
            setShowResult(true);
        }).catch((error: { data: any }) => {
            console.log(error.data);
        });
    }

    return (
        <div className={styles.wrapper}>
            {questions?.question_id !== -9999 ?
                <h5 className={styles.wrapper_title}>
                    вопрос {numberTest + 1} из {questionLength}
                </h5>
                :
                <></>}
            <p className={styles.wrapper_question}>{questions?.body}</p>
            {questions?.picture ? (
                <div style={{ marginBottom: '15px', alignContent: 'center' }}>
                    <img src={questions?.picture} alt="Question Image" width={300} height={275} style={{ borderRadius: '10px', display: 'block' }} />
                </div>
            ) : (
                ''
            )}
            <div className={styles.wrapper_progressBar}>
                <div className={styles.wrapper_progressBar_progress} style={{ width: `${progress}%` }}></div>
            </div>
            {questions?.answers &&
                questions?.answers.map(({ body: answer, answer_id: id, is_correct: isCorrect, picture }: any, index: number) => (
                    <StudentAnswer key={index} id={id} title={answer} name={nameAnswer} isCorrect={isCorrect} picture={picture} resetSelection={resetSelection}
                        onSelect={handleAnswerSelect} />
                ))}
            {numberTest + 1 !== questionLength ?
                (questions?.question_id !== -9999 ?
                    <span className={styles.wrapper_button}>
                        <Button disabled={buttonDisabled} onClick={handleNextQ} text={'Следующий вопрос'}
                            variant="primary" /></span>
                    :
                    <></>
                ) : <span className={styles.wrapper_button}>
                    <Button onClick={handleCompleteTest} text={'Завершить тест'} disabled={buttonDisabled}
                        variant="primary" /></span>
            }
        </div>
    )
}