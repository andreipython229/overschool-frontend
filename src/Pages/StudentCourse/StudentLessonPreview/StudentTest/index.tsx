import { FC } from 'react';
import { Params } from 'react-router-dom';

import { sectionT, ITest } from 'types/sectionT';
import { StudentCourseNavArr } from '../StudentCourseNavArr';
import { StudentLessonSidebar } from '../StudentLessonSidebar';
import { StudentTestPreview } from '../StudentTestPreview';
import styles from './studentTest.module.scss';
import { useFetchQuestionsListQuery } from '../../../../api/questionsAndAnswersService';
import { useBoolean} from '../../../../customHooks';
import { StudentTestBlock } from 'Pages/StudentCourse/StudentTestBlock';

type studentTestT = {
  lesson: ITest
  lessons: sectionT
  params: Params
}

export const StudentTest: FC<studentTestT> = ({ lesson, lessons, params }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const activeLessonIndex = lessons?.lessons.findIndex(lesson => lessonId && lesson.order === +lessonId)
  const { data: questionsList } = useFetchQuestionsListQuery(6);
  const [isOpenTest, { on: closeTest, off: openTest }] = useBoolean()
  console.log(questionsList);
  return (
    <div className={styles.wrapper}>
      <StudentCourseNavArr />
      <div className={styles.wrapper_title}>Тест</div>
      <div className={styles.wrapper_testWrapper}>
        {isOpenTest ? (<StudentTestBlock />) : (<StudentTestPreview />)}
        <StudentLessonSidebar 
            courseId={`${courseId}`}
            sectionId={`${sectionId}`}
            activeLessonIndex={activeLessonIndex as number}
            lessons={lessons as sectionT}
        />
      </div>
    </div>
  )
}
