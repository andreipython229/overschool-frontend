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
    <div className={styles.lesson}>
      <h1 className={styles.lesson__name}>{lesson?.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
            </div>
            {lessonVideo &&
              (lesson.url && lesson.video ? (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.video} videoSrc2={lesson.url} />
                </div>
              ) : !lesson.video && lesson.url ? (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.url} videoSrc2={''} />
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  <VideoPlayer videoSrc={lesson.video} videoSrc2={''} />
                </div>
              ))}
            <div className={styles.lesson__content}>
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id }, index: number) => (
                <UploadedFile key={id} file={file} index={index} size={43445} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
