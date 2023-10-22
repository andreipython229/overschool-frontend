import {FC, useState, useEffect} from 'react'
import {StudentQuestion} from './StudentQuestion'

import styles from './studentTestBlock.module.scss'
import {StudentTestResults} from "./StudentTestResults";
import {selectUser} from "../../../selectors";
import {useSelector} from "react-redux";
import {AnswersT} from "../../../components/AddQuestion";

type questionListT = {
    attempt_count: number
    attempt_limit: boolean
    name: string
    questions: string
    show_right_answers: boolean
    test: string
}
type QuestionT = {
    question_type: keyof object
    body: string
    answers: AnswersT[]
    question_id: number
}


export type AnswersType = {
    [key: string | number]: boolean | string;
}


export const StudentTestBlock: FC<any> = ({lesson}) => {
    const [numberTest, setNumberTest] = useState<number>(0)
    const [userAnswers, updateUserAnswers] = useState<AnswersType>({})
    const [userAnswerFull, setUserAnswerFull] = useState<AnswersT[]>()

    const [testCompleted, setTestCompleted] = useState(false);
    const user = useSelector(selectUser);
    const [questions, setQuestions] = useState(lesson.questions)


    const completeTest = () => {
        setTestCompleted(true);
    };

    useEffect(() => {
      // if (lesson.random_questions) {
        const shuffledQuestions = lesson.questions.map((question: QuestionT) => {
          const shuffledAnswers = shuffleArray([...question.answers]);
          return { ...question, answers: shuffledAnswers };
        });
        setQuestions(shuffleArray(shuffledQuestions));
      // }
    }, [lesson]);

    // Функция для перемешивания массива
    function shuffleArray(array: any): any {
      const newArray = array.slice();
      for (let i = newArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    useEffect(() => {
        if (questions.length > 0 && numberTest >= questions.length) {
          setNumberTest(0);
        }
      }, [questions, numberTest]);


    const nullQuestionTest = [{
        body: 'В данном тесте нет вопросов :(',
        answers: [],
        question_id: -9999,
        type: 'Text',
        picture: '',
    },
        {}]

    useEffect(() => {
        console.log("questions = ", questions)
        console.log("lesson", lesson.show_right_answers)

    }, [questions]);

    useEffect(() => {
        console.log('userAnswers = ', userAnswers)
    }, [userAnswers]);

    useEffect(() => {
        console.log('userAnswerFull = ', userAnswerFull)
    }, [userAnswerFull]);

    return (
        <div className={styles.wrapper} key={lesson.test}>
            {questions.length > 0 ? (
                testCompleted ? (
                    <StudentTestResults results={userAnswers} test={lesson.test} user={user.userId}
                                        success_prercent={lesson.success_percent} questions={questions}
                                        showRightAnswers={lesson.show_right_answers} full_results={userAnswerFull}/>
                ) : (
                    <StudentQuestion questions={questions[numberTest]}
                                     length={questions} numberTest={numberTest}
                                     setNumberTest={setNumberTest} userAnswers={userAnswers} userAnswerFull={userAnswerFull} setUserAnswerFull={setUserAnswerFull}
                                     updateUserAnswers={updateUserAnswers} onCompleteTest={completeTest}/>
                )
            ) : (
                <StudentQuestion questions={nullQuestionTest[0]} length={lesson.questions}
                    numberTest={numberTest} setNumberTest={setNumberTest} onCompleteTest={completeTest} userAnswerFull={userAnswerFull} setUserAnswerFull={setUserAnswerFull}/>
            )}
        </div>
    );
};
