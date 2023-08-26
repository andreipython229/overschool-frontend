import { FC } from 'react'
import { Params } from 'react-router-dom'

import { LESSON_TYPE } from 'enum/lessonTypeE'
import { sectionT, IHomework } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { StudentLessonDesc } from '../StudentLessonDesc'
import { StudentLessonTextEditor } from '../StudentLessonTextEditor'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'

import styles from '../lesson.module.scss'

type studentHomeworkT = {
  lesson: IHomework
  lessons: sectionT
  params: Params
  activeLessonIndex: number
}

export const StudentHomework: FC<studentHomeworkT> = ({ lesson, lessons, params, activeLessonIndex }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  return (
    <div className={styles.lesson}>
      <StudentCourseNavArr />
      <h1 className={styles.lesson__name}>{activeLessonIndex + 1}. {lesson?.name}</h1>
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
              {lesson?.text_files.map(({ file, id }, index: number) => (
                <UploadedFile key={id} file={file} index={index} size={34487} />
              ))}
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
            </div>
          </div>
          <StudentLessonNavBtns
            courseId={`${courseId}`}
            lessonId={`${lessonId}`}
            sectionId={`${sectionId}`}
            lessonType={`${lessonType}` as LESSON_TYPE}
            activeLessonIndex={activeLessonIndex as number}
            lessons={lessons as sectionT}
          />
          <StudentLessonTextEditor homeworkId={lesson?.homework_id} />
        </div>
      </div>
    </div>
  )
}
