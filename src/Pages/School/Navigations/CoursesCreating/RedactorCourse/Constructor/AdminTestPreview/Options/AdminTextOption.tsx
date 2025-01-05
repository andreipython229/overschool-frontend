import {FC, useState, useEffect} from 'react'
import {orderBy} from 'lodash';
import {PropsQuestionBlockT} from 'components/AddQuestion'
import styles from '../../../../../../../../components/Questions/TextOptions/textOptions.module.scss'
import {AnswerOption} from "../../../../../../../../components/Questions/AnswerOption";
import {Question} from "../../../../../../../../components/Questions/Question";
import {AdminQuestionHeader} from "./AdminQuestionHeader";
import {AdminAnswerOption} from "./AdminAnswerOption";

export const AdminTextOptions: FC<PropsQuestionBlockT> = ({questions, answers, title, id, question}) => {
    const [answersToRender, setAnswersToRender] = useState(answers || [])

    useEffect(() => {
        setAnswersToRender(answers || []);
    }, [answers]);

    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.wrapper_question_count}>Вопрос {questions && question && questions?.indexOf(question)+1} из {questions?.length}</h2>
                <div style={{maxWidth: '444px', width: '100%'}}>
                    <AdminQuestionHeader title={title} id={id} questions={questions} question={question}/>
                </div>
                <div className={styles.wrapper_drop_down_menu}>
                    <div className={styles.settings_list}>
                        {answersToRender ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                            <AdminAnswerOption key={`${answer.body}_${index}`} id={index} answer={answer}/>
                        )) : ''}
                    </div>
                </div>
            </div>
        </>
    )
}