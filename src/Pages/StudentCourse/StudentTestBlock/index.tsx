import {FC, useState} from 'react'
import {StudentQuestion} from './StudentQuestion'

import styles from './studentTestBlock.module.scss'
import {StudentTestResults} from "./StudentTestResults";
import {selectUser} from "../../../selectors";

type questionListT = {
    attempt_count: number
    attempt_limit: boolean
    name: string
    questions: string
    show_right_answers: boolean
    test: string
}

export type AnswersType = {
    [key: string | number]: boolean | string
}

export const StudentTestBlock: FC<any> = ({lesson}) => {
    const [numberTest, setNumberTest] = useState<number>(0)
    const [userAnswers, updateUserAnswers] = useState<AnswersType>({})
    const [testCompleted, setTestCompleted] = useState(false);
    const user = selectUser;

    const completeTest = () => {
        setTestCompleted(true);
    };

    const nullQuestionTest = [{
        body: 'В данном тесте нет вопросов :(',
        answers: [],
        question_id: -9999,
        type: 'Text',
        picture: '',
    },
        {}]
    console.log('UserAnswers из стейтов: ', userAnswers)

    return (
        <div className={styles.wrapper} key={lesson.test_id}>
            {lesson.questions.length > 0 ? (
                testCompleted ? (
                    <StudentTestResults results={userAnswers} test={lesson.test_id} user={user}/>
                ) : (
                    <StudentQuestion questions={lesson.questions[numberTest]}
                                     length={lesson.questions} numberTest={numberTest}
                                     setNumberTest={setNumberTest} userAnswers={userAnswers}
                                     updateUserAnswers={updateUserAnswers} onCompleteTest={completeTest}/>
                )
            ) : (
                <StudentQuestion questions={nullQuestionTest[0]} length={lesson.questions}
                    numberTest={numberTest} setNumberTest={setNumberTest} onCompleteTest={completeTest}
                />
            )}
        </div>
    );
};
