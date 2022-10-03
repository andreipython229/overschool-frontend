import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import YouTube, { YouTubeProps } from 'react-youtube'

import { AudioPlayer } from 'components/common/AudioPlayer'
import { lessonT } from '../../../types/sectionT'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { useFetchLessonQuery, useFetchModuleLessonsQuery } from '../../../api/modulesServices'
import { backArr } from '../../../components/Previous/config/svgIconPath'
import { arrDownPath } from '../config/svgIconPath'
import { Button } from 'components/common/Button/Button'
import { stackIconPath } from '../../School/config/svgIconsPath'
import { youtubeParser } from 'utils/youtubeParser'
import { StudentLessonDesc } from './StudentLessonDesc/index'
import { StudentLessonTextEditor } from './StudentLessonTextEditor/index'

import styles from './lesson.module.scss'


export const StudentLessonPreview = () => {
  const navigate = useNavigate()

  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = useParams()

  const { data: lessons } = useFetchModuleLessonsQuery(sectionId)
  const { data: lesson } = useFetchLessonQuery({id: lessonId, type: lessonType})

  const [videoLinkId, setVideoLinkId] = useState(youtubeParser(lesson?.video))

  const activeLessonIndex = lessons?.lessons.findIndex((lesson: lessonT) => lessonId && lesson.id === +lessonId)
  const lessonIdBack = lessons?.lessons[activeLessonIndex - 1]?.lesson_id || lessonId
  const lessonIdForward = lessons?.lessons[activeLessonIndex + 1]?.lesson_id || lessonId

  const lessonFileArrName = lesson?.file_url?.split('/')

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
      <div onClick={() => navigate('../')} className={styles.lesson__navBack}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <span className={styles.lesson__navBack_text}>Список занятий</span>
      </div>
      <h1 className={styles.lesson__name}>{lesson?.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
            </div>
            <div>
              <YouTube opts={opts} videoId={videoLinkId as string} />
            </div>
            <div className={styles.lesson__content}>
              {(lesson?.code || lesson?.file_url || lesson?.audio_url) && <span className={styles.lesson__materials}>Материалы к занятию:</span>}
              {lesson?.code && (
                <>
                  <span className={styles.lesson__block_name}>Код</span>
                  <div className={styles.lesson__codeWraper}>
                    <pre className={styles.lesson__code_text}>
                      <code>{lesson?.code}</code>
                    </pre>
                  </div>
                </>
              )}
              {lesson?.audio_url && (
                <>
                  <span className={styles.lesson__block_name}>Аудио</span>
                  <AudioPlayer styles={{ marginBottom: '15px' }} audioUrl={lesson?.audio_url} title="" />
                </>
              )}
              {lesson?.file_url && (
                <>
                  <span className={styles.lesson__block_name}>Файл</span>
                  <a href={lesson?.file_url} download target={'_blanck'}>
                    <div className={styles.lesson__download_container}>
                      <div className={styles.lesson__dowload_wrap}>
                        <div className={styles.lesson__dowload_blackDiv}> </div>
                        <span>{lessonFileArrName[lessonFileArrName.length - 1].slice(0, 20)}</span>
                      </div>
                      <div className={styles.lesson__dowload_wrap}>
                        <span className={styles.lesson__download_size}>445 КБ</span>
                        <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={arrDownPath} />
                      </div>
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className={styles.lesson__btns}>
            <Button
              onClick={() => navigate(`/login/courses/student-course/${courseId}/module/${sectionId}/lesson/${lessonIdBack}`)}
              disabled={lessonId === lessonIdBack}
              className={styles.lesson__btnPrev}
              text="Предыдущее"
            />
            <Button
              onClick={() => navigate(`/login/courses/student-course/${courseId}/module/${sectionId}/lesson/${lessonIdForward}`)}
              className={styles.lesson__btnNext}
              disabled={lessonId === lessonIdForward}
              text="Следующее"
            />
          </div>
          {/* <StudentLessonTextEditor /> */}
        </div>
        <div className={styles.lesson__block}>
          <p className={styles.lesson__block_title}>Занятия модуля:</p>
          <div>
            {lessons?.lessons.length &&
              lessons?.lessons.map(({ name, id }: lessonT, index: number) => (
                <div
                  style={{ cursor: 'pointer' }}
                  key={id}
                  onClick={() => navigate(`/login/courses/student-course/${courseId}/module/${sectionId}/lesson/${id}`)}
                  className={activeLessonIndex === index ? styles.lesson__item_active : styles.lesson__item}
                >
                  <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={stackIconPath} />
                  <span className={styles.lesson__item_name}>{name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
