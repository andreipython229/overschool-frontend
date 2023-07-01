import {FC} from 'react'
import styles from './studentQuestion.module.scss'
import {StudentAnswer} from '../StudentAnswer'
import {Button} from 'components/common/Button/Button'
import {answerT} from 'types/sectionT'
import {AnswersType} from "../index";
import {queryByTestId} from "@testing-library/react";

type question = {
    id: number
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
}

export const StudentQuestion: FC<StudentQuestionT> = ({questions, length, numberTest,
                                                          setNumberTest, updateUserAnswers, onCompleteTest}) => {
    const questionLength = length.length
    const nameAnswer = (questions && questions.body.length > 0) ? questions.body : '';
    const progress = (100 / questionLength) * (numberTest + 1)

    const handleAnswerSelect = (isCorrect: boolean | string) => {
        updateUserAnswers((prevAnswers: AnswersType) => ({
            ...prevAnswers,
            [questions.question_id]: isCorrect
        }));
    }

    const handleNextQ = () => {
        if (numberTest + 1 <= questionLength) {
            setNumberTest(numberTest + 1);
        }
    }

    const handleCompleteTest = () => {
        onCompleteTest();
    }

    return (
        <div className={styles.wrapper}>
            {questions.question_id !== -9999 ?
                <h5 className={styles.wrapper_title}>
                    вопрос {numberTest + 1} из {questionLength}
                </h5>
                :
                <></>}
            <p className={styles.wrapper_question}>{questions.body}</p>
            <div className={styles.wrapper_progressBar}>
                <div className={styles.wrapper_progressBar_progress} style={{width: `${progress}%`}}></div>
            </div>
            {questions.answers &&
                questions?.answers.map(({body: answer, answer_id: id, is_correct: isCorrect}: any, index: number) => (
                    <StudentAnswer key={index} id={`${id}`} title={answer} name={nameAnswer} isCorrect={isCorrect}
                                   onSelect={handleAnswerSelect}/>
                ))}
            {numberTest + 1 !== questionLength ?
                (questions.question_id !== -9999 ?
                        <Button disabled={numberTest + 1 === questionLength} onClick={handleNextQ}
                                text={'Следующий вопрос'}
                                variant="primary" style={{alignSelf: 'flex-start', marginTop: '32px'}}/>
                        :
                        <></>
                ) : <Button onClick={handleCompleteTest} text={'Завершить тест'}
                            variant="primary" style={{alignSelf: 'flex-start', marginTop: '32px'}}/>
            }
        </div>
    )
}
