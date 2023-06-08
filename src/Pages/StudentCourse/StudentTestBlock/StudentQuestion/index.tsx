import {FC} from 'react'
import styles from './studentQuestion.module.scss'
import {StudentAnswer} from '../StudentAnswer'
import {Button} from 'components/common/Button/Button'
import {answerT} from 'types/sectionT'

type question = {
    id: number
    answers: answerT[]
}
type StudentQuestionT = {
    questions: question[] | any
    length: any
    numberTest: number
    setNumberTest: any
}

export const StudentQuestion: FC<StudentQuestionT> = ({questions, length, numberTest, setNumberTest}) => {
    const questionLength = length.length
    const nameAnswer = (questions && questions.length > 0) ? questions.body : '';
    const progress = (100 / questionLength) * (numberTest + 1)

    const hadnleNextQ = () => {
        if (numberTest + 1 <= questionLength) {
            setNumberTest(numberTest + 1)
        }
    }
    return (
        (questions && questions.length > 0) ? (
            <div className={styles.wrapper}>
                <h5 className={styles.wrapper_title}>
                    вопрос {numberTest + 1} из {questionLength}
                </h5>
                <p className={styles.wrapper_question}>{questions.body}</p>
                <div className={styles.wrapper_progressBar}>
                    <div className={styles.wrapper_progressBar_progress} style={{width: `${progress}%`}}></div>
                </div>
                {questions.answers &&
                    questions?.answers.map(({body: answer}: any, index: number) => (
                        <StudentAnswer key={answer + index} id={answer + index} title={answer} name={nameAnswer}/>
                    ))}
                <Button disabled={numberTest + 1 === questionLength} onClick={hadnleNextQ} text={'Следующий вопрос'}
                        variant="primary" style={{alignSelf: 'flex-start', marginTop: '32px'}}
                />
            </div>
        ) : (
            <div className={styles.wrapper}>
                <p className={styles.wrapper_question}>В тесте отсутствуют вопросы</p>
            </div>
        )
    )
}
