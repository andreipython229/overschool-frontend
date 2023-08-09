import {FC} from 'react'
import {AddQuestionOptionsT} from '../index'

import styles from './addOptionsWithPictures.module.scss'
import {useCreateQuestionsMutation} from "../../../api/questionsAndAnswersService";

export const AddOptionsWithPictures: FC<AddQuestionOptionsT> = ({setTypeQuestions, testId, setQuestions, questions}) => {
    const [createOption, {data}] = useCreateQuestionsMutation()
    const handleGetTypeQuestion = () => {
        setTypeQuestions('TextPic' as keyof object)
        createOption({
            question_type: 'TextPic',
            body: 'Введите вопрос (ответы с картинками)',
            is_any_answer_correct: false,
            only_whole_numbers: false,
            test: testId,
        })
    }

    return (
        <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
            <div className={styles.wrapper_iconWrapper}>
                <div className={styles.wrapper_iconWrapper_iconColumn}>
                    <span/>
                </div>
                <div className={styles.wrapper_iconWrapper_iconColumn}>
                    <span/>
                </div>
            </div>
            <h4 className={styles.wrapper_title}>Варианты с картинками</h4>
        </button>
    )
}
