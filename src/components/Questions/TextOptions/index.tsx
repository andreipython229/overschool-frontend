import {FC, PointerEvent, MouseEvent, useState, useEffect} from 'react'
import {Reorder, useDragControls} from 'framer-motion'

import {Question} from '../Question'
import {AnswerOption} from '../AnswerOption'
import {QuestionHeader} from '../QuestionHeader'
import {AnswersT, PropsQuestionBlockT} from 'components/AddQuestion'
import {useBoolean} from '../../../customHooks'
import {Button} from '../../common/Button/Button'
import {useAddAnswerMutation} from 'api/questionsAndAnswersService'

import styles from './textOptions.module.scss'

export const TextOptions: FC<PropsQuestionBlockT> = ({question, answers, title, id}) => {
    const [isOpen, {onToggle}] = useBoolean()
    const [answersToRender, setAnswersToRender] = useState(answers || [])

    const [addAnswer] = useAddAnswerMutation()

    const controls = useDragControls()

    const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const answerToAdd = {
            question: id,
            body: 'введите ответ',
        }

        addAnswer(answerToAdd)
    }

    const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
        controls.start(event)
    }

    useEffect(() => {
        setAnswersToRender(answers || []);
    }, [answers]);


    return (
        <>
            <Reorder.Item
                className={styles.wrapper}
                dragControls={controls}
                dragListener={false}
                draggable={false}
                key={id}
                value={question}
                whileDrag={{
                    scale: 1.1,
                    boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
                    borderRadius: '7px',
                }}
            >
                <QuestionHeader onPointerDown={onPointerDown} title={title} id={id} isOpen={isOpen} onToggle={onToggle}>
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
            </Reorder.Item>

            {isOpen && (
                <div className={styles.wrapper_drop_down_menu}>
                    <Question id={id} title={title}/>
                    <h4 className={styles.answerOptionsBlock_title}>Добавьте варианты ответов:</h4>
                    <Reorder.Group className={styles.settings_list} onReorder={setAnswersToRender}
                                   values={answersToRender}>
                        {answersToRender?.map(answer => (
                            <AnswerOption key={answer.answer_id} id={id} answer={answer}/>
                        ))}
                    </Reorder.Group>

                    <Button text={'+ Добавить вариант'} style={{marginTop: '26px'}} variant={'primary'}
                            onClick={handleAddAnswer}/>
                </div>
            )}
        </>
    )
}
