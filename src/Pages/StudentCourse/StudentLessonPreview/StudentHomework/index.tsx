import { FC } from 'react'
import { Params } from 'react-router-dom'

import { sectionT, IHomework } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr/index'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { StudentLessonDesc } from '../StudentLessonDesc/index'
import { StudentLessonTextEditor } from '../StudentLessonTextEditor/index'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns/index'
import { StudentLessonSidebar } from '../StudentLessonSidebar/index'

import styles from '../lesson.module.scss'

type studentHomeworkT = {
  lesson: IHomework
  lessons: sectionT
  params: Params
}

export const StudentHomework: FC<studentHomeworkT> = ({ lesson, lessons, params }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  const activeLessonIndex = lessons?.lessons.findIndex(lesson => lessonId && lesson.order === +lessonId)

  return (
    <div className={styles.lesson}>
      <StudentCourseNavArr />
      <h1 className={styles.lesson__name}>{lesson?.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <StudentLessonDesc text={lesson?.description || ''} />
            </div>
            <div className={styles.lesson__content}>
              {/* {lesson?.code && (
                <div className={styles.lesson__codeWraper}>
                  <pre className={styles.lesson__code_text}>
                    <code>{lesson?.code}</code>
                  </pre>
                </div>
              )} */}
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id }) => (
                <UploadedFile key={id} file={file} />
              ))}
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
            </div>
          </div>
          <StudentLessonNavBtns
            courseId={`${courseId}`}
            lessonId={`${lessonId}`}
            sectionId={`${sectionId}`}
            lessonType={`${lessonType}`}
            activeLessonIndex={activeLessonIndex as number}
            lessons={lessons as sectionT}
          />
          <StudentLessonTextEditor homeworkId={lesson?.homework_id} />
        </div>
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
