import { useEffect, useState, FC } from 'react'
import { Params } from 'react-router-dom'
import parse from 'html-react-parser'
import YouTube, { YouTubeProps } from 'react-youtube'

import { sectionT, ILesson } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr/index'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { youtubeParser } from 'utils/youtubeParser'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns/index'
import { StudentLessonSidebar } from '../StudentLessonSidebar/index'

import styles from '../lesson.module.scss'

type studentLessonT = {
  lesson: ILesson
  lessons: sectionT
  params: Params
}

export const StudentLesson: FC<studentLessonT> = ({ lesson, lessons, params }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  const [videoLinkId, setVideoLinkId] = useState(youtubeParser(lesson?.video))

  const activeLessonIndex = lessons?.lessons.findIndex(lesson => lessonId && lesson.order === +lessonId)

  const opts: YouTubeProps['opts'] = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  useEffect(() => {
    setVideoLinkId(youtubeParser(lesson?.video))
  }, [lesson, lessonId])

  return (
    <div className={styles.lesson}>
      <StudentCourseNavArr />
      <h1 className={styles.lesson__name}>{lesson?.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
            </div>
            <div>
              <YouTube opts={opts} videoId={`${videoLinkId}`} />
            </div>
            <div className={styles.lesson__content}>
              {/* {lesson?.code && (
                <div className={styles.lesson__codeWraper}>
                  <pre className={styles.lesson__code_text}>
                    <code>{lesson?.code}</code>
                  </pre>
                </div>
              )} */}
              {lesson?.audio_files.length && <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />}
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.length && lesson?.text_files.map(({ file, id }) => <UploadedFile key={id} file={file} />)}
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
