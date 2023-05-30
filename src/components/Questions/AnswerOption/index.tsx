import {FC, memo, ReactNode, useState, ChangeEvent, PointerEvent, useCallback} from 'react'
import {Reorder, useDragControls} from 'framer-motion'

import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {InputBlock} from 'components/common/Input/InputBlock'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {deleteIconPath, addCommentsIconPath, grabIconPath} from '../config/svgIconPath'
import {useDebounceFunc} from 'customHooks/useDebounceFunc'
import {usePatchAnswerMutation, useDeleteAnswerMutation} from 'api/questionsAndAnswersService'

import styles from './answerOption.module.scss'

type AnswerOptionT = {
    children?: ReactNode
    id?: number
    answer?: {
        answer_id?: number
        body?: string
        status?: boolean
    }
}

export const AnswerOption: FC<AnswerOptionT> = memo(({children, id, answer}) => {
    const [answerText, setAnswerText] = useState(answer?.body || '')
    const [isChecked, setIsChecked] = useState(answer?.status || false)

    const answerControls = useDragControls()

    const [patchAnswer] = usePatchAnswerMutation()
    const [deleteAnswer] = useDeleteAnswerMutation()

    const debounced = useDebounceFunc(patchAnswer, 1000)

    const handleChangeAnswer = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setAnswerText(e.target.value);

            const answerToPatch = {
                question: id,
                body: e.target.value,
                status: isChecked,
            };

            debounced({answer: answerToPatch, answerId: answer?.answer_id});
        },
        [debounced, id, setIsChecked, isChecked, answer?.answer_id, setAnswerText],
    );

    const handleDeleteAnswer = useCallback(() => {
        deleteAnswer(answer?.answer_id)
    }, [answer?.answer_id, deleteAnswer])

    const handleCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newChecked = event.target.checked;
            setIsChecked(newChecked);
            const answerToPatch = {
                question: id,
                body: answerText,
                status: newChecked,
            };
            debounced({answer: answerToPatch, answerId: answer?.answer_id});
        },
        [answer?.answer_id, answerText, debounced, id]
    );

    const onAnswerPointerDown = useCallback((event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
        answerControls.start(event)
    }, [answerControls])

    return (
        <Reorder.Item
            className={styles.wrapper}
            dragControls={answerControls}
            dragListener={false}
            draggable={false}
            key={answer?.answer_id}
            value={answer}
            whileDrag={{
                scale: 1.1,
                boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
                borderRadius: '7px',
            }}
        >
            <div className={styles.answerOptionsBlock}>
                <div className={styles.answerOptionsBlock_inputWrapper}>
                    {children}
                    <InputBlock name={''} type={'text'} value={answerText} placeholder={'Вариант ответа'}
                                onChange={handleChangeAnswer}/>
                    <div className={styles.answerOptionsBlock_inputWrapper_correctAnswerWrapper}>
                        <Checkbox id={`${id}`} checked={isChecked} onChange={handleCheckboxChange}>
                            Правильный ответ
                        </Checkbox>
                    </div>
                    <div className={styles.answerOptionsBlock_inputWrapper_comment}>
                        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={addCommentsIconPath}>
                            <line x1="7.97656" y1="6.00781" x2="11.9531" y2="6.00781" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                            <line x1="5.48828" y1="9.00781" x2="11.9531" y2="9.00781" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                            <line x1="5.48828" y1="12.0078" x2="11.9531" y2="12.0078" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                        </IconSvg>
                    </div>
                    <div className={styles.answerOptionsBlock_inputWrapper_delete}>
                        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath}
                                 functionOnClick={handleDeleteAnswer}/>
                    </div>
                    <div className={styles.answerOptionsBlock_inputWrapper_grab}>
                        <IconSvg width={21} height={14} viewBoxSize="0 0 21 14" path={grabIconPath}
                                 onPointerDown={onAnswerPointerDown}/>
                    </div>
                </div>
            </div>
        </Reorder.Item>
    )
})