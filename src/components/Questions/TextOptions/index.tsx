import {FC, MouseEvent, useState, useEffect} from 'react'
import {orderBy} from 'lodash';
import {Question} from '../Question'
import {AnswerOption} from '../AnswerOption'
import {QuestionHeader} from '../QuestionHeader'
import {PropsQuestionBlockT} from 'components/AddQuestion'
import {useBoolean} from '../../../customHooks'
import {Button} from '../../common/Button/Button'
import {useAddAnswerMutation} from 'api/questionsAndAnswersService'

import styles from './textOptions.module.scss'

export const TextOptions: FC<PropsQuestionBlockT> = ({question, answers, title, id, testId}) => {
    const [isOpen, {onToggle}] = useBoolean()
    const [answersToRender, setAnswersToRender] = useState(answers || [])

    const [addAnswer] = useAddAnswerMutation()


    const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const answerToAdd = {
            question: question?.question_id,
            body: 'Введите ответ',
        }

        addAnswer(answerToAdd)
    }

    useEffect(() => {
        setAnswersToRender(answers || []);
    }, [answers]);

    return (
        <>
            <div className={styles.wrapper}>
                <QuestionHeader title={title} id={id} isOpen={isOpen} onToggle={onToggle} testId={testId}>
                    <div className={styles.wrapper_header_iconWrapper}>
                        <div className={styles.wrapper_header_iconWrapper_iconRow}>
                            <span/>
                        </div>
                        <div className={styles.wrapper_header_iconWrapper_iconRow}>
                            <span/>
                        </div>
                        <div className={styles.wrapper_header_iconWrapper_iconRow}>
                            <span/>
                        </div>
                    </div>
                </QuestionHeader>
            </div>

            {isOpen && (
                <div className={styles.wrapper_drop_down_menu}>
                    <Question id={id} title={title} testId={testId}/>
                    <h4 className={styles.answerOptionsBlock_title}>Добавьте варианты ответов:</h4>
                    <div className={styles.settings_list}>
                        {answersToRender ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                            <AnswerOption key={`${answer.body}_${index}`} id={id} answer={answer}/>
                        )) : ''}
                    </div>
                    <Button text={'+ Добавить вариант'} style={{marginTop: '26px'}} variant={'primary'}
                            onClick={handleAddAnswer}/>
                </div>
            )}
        </>
    )
}
