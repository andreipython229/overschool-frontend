import { useEffect, useState, FC } from 'react'
import parse from 'html-react-parser'
import { ILesson } from 'types/sectionT'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'

import styles from './adminLesson.module.scss'
import { VideoPlayer } from '../../../../../../../components/VideoPlayer/player'

type adminLessonT = {
  lesson: ILesson
}

export const AdminLesson: FC<adminLessonT> = ({ lesson }) => {
  const [lessonVideo, setLessonVideo] = useState<boolean>(false)

  useEffect(() => {
    if (lesson) {
      if (('video' in lesson && lesson.video) || ('url' in lesson && lesson.url)) {
        setLessonVideo(true)
      } else {
        setLessonVideo(false)
      }
    }
  }, [lesson])

  return (
    <div className={styles.adminlesson}>
      <h1 className={styles.adminlesson__name}>{lesson?.name}</h1>
      <div className={styles.adminlesson__blocks}>
        <div className={styles.adminlesson__wrap}>
          <div className={styles.adminlesson__card}>
            <h3 className={styles.adminlesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.adminlesson__content}>
              <span className={styles.adminlesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
            </div>
            {lessonVideo &&
              (lesson.url && lesson.video ? (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.video} videoSrc2={lesson.url} lessonId={lesson.lesson_id}/>
                </div>
              ) : !lesson.video && lesson.url ? (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.url} videoSrc2={''} lessonId={lesson.lesson_id}/>
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.video} videoSrc2={''} lessonId={lesson.lesson_id}/>
                </div>
              ))}
            <div className={styles.adminlesson__content}>
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
              <span className={styles.adminlesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id, file_url, size }, index: number) => (
                <UploadedFile key={id} file={file} name={file_url} index={index} size={size}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
