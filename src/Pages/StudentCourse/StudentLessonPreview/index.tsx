import {FC} from 'react'
import {useParams} from 'react-router-dom'

import {StudentTest} from './StudentTest'
import {StudentHomework} from './StudentHomework'
import {StudentLesson} from './StudentLesson'
import {LESSON_TYPE} from 'enum/lessonTypeE'
import {useFetchLessonQuery, useFetchModuleLessonsQuery} from '../../../api/modulesServices'
import {useFetchQuestionsListQuery} from '../../../api/questionsAndAnswersService';

export const StudentLessonPreview: FC = () => {
    const params = useParams()

    const {data: lessons, isSuccess} = useFetchModuleLessonsQuery(`${params?.section_id}`)
    const {data: lesson} = useFetchLessonQuery({
        id: Number(params?.lesson_id) as number,
        type: `${params?.lesson_type}`
    })
    const {data: questionsList} = useFetchQuestionsListQuery(10);

    const renderUI = () => {
        if (isSuccess) {
            switch (lesson?.type) {
                case LESSON_TYPE.LESSON:
                    return <StudentLesson lessons={lessons} lesson={lesson} params={params}/>
                case LESSON_TYPE.HOMEWORK:
                    return <StudentHomework lessons={lessons} lesson={lesson} params={params}/>
                case LESSON_TYPE.TEST:
                    return <StudentTest lessons={lessons} lesson={questionsList} params={params}/>
            }
        }
    }

    return <>{renderUI()}</>
}
