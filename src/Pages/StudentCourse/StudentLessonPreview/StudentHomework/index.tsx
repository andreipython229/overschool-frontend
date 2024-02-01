import { FC, useState } from 'react'
import { Params } from 'react-router-dom'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { sectionT, IHomework } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { StudentLessonTextEditor } from '../StudentLessonTextEditor'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import styles from '../lesson.module.scss'
import { renderStudentBlocks } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/AdminLessonPreview/AdminLesson'
import { Reorder } from 'framer-motion'

type studentHomeworkT = {
  lesson: IHomework
  lessons: sectionT
  params: Params
  activeLessonIndex: number
}

export const StudentHomework: FC<studentHomeworkT> = ({ lesson, lessons, params, activeLessonIndex }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params
  const [order, setOrder] = useState([])

  return (
    <div className={styles.lesson}>
      <StudentCourseNavArr />
      <h1 className={styles.lesson__name}>
        {activeLessonIndex + 1}. {lesson?.name}
      </h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <Reorder.Group style={{ display: 'flex', flexDirection: 'column', gap: '1em' }} onReorder={() => setOrder} values={order}>
                {renderStudentBlocks(lesson)}
              </Reorder.Group>
            </div>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id, file_url, size }, index: number) => (
                <UploadedFile key={id} file={file} index={index} name={file_url} size={size} />
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
          {!lessons.group_settings.task_submission_lock && <StudentLessonTextEditor homeworkId={lesson?.homework_id} homework={lesson} />}
        </div>
      </div>
    </div>
  )
}
