import {FC, useState, useEffect} from 'react'
import {orderBy} from 'lodash';
import {PropsQuestionBlockT} from 'components/AddQuestion'
import styles from '../../../../../../../../components/Questions/TextOptions/textOptions.module.scss'
import {useBoolean} from "../../../../../../../../customHooks";
import {AnswerOption} from "../../../../../../../../components/Questions/AnswerOption";
import {Question} from "../../../../../../../../components/Questions/Question";
import {AdminQuestionHeader} from "./AdminQuestionHeader";
import {AdminAnswerOption} from "./AdminAnswerOption";

export const AdminTextOptions: FC<PropsQuestionBlockT> = ({question, answers, title, id}) => {
    const [isOpen, {onToggle}] = useBoolean()
    const [answersToRender, setAnswersToRender] = useState(answers || [])

    useEffect(() => {
        setAnswersToRender(answers || []);
    }, [answers]);

    return (
        <>
            <div className={styles.wrapper}>
                <AdminQuestionHeader title={title} id={id} isOpen={isOpen} onToggle={onToggle}>
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
                </AdminQuestionHeader>
            </div>

            {isOpen && (
                <div className={styles.wrapper_drop_down_menu}>
                    <h4 className={styles.answerOptionsBlock_title}>Варианты ответов:</h4>
                    <div className={styles.settings_list}>
                        {answersToRender ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                            <AdminAnswerOption key={`${answer.body}_${index}`} id={index} answer={answer}/>
                        )) : ''}
                    </div>
                </div>
            )}
        </>
    )
}