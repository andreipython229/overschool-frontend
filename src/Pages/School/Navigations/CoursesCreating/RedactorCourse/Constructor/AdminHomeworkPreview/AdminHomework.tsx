import { IHomework } from '../../../../../../../types/sectionT'
import { FC, useEffect, useState } from 'react'
import styles from '../../../../../../StudentCourse/StudentLessonPreview/lesson.module.scss'
import { StudentCourseNavArr } from '../../../../../../StudentCourse/StudentLessonPreview/StudentCourseNavArr'
import { StudentLessonDesc } from '../../../../../../StudentCourse/StudentLessonPreview/StudentLessonDesc'
import { UploadedFile } from '../../../../../../../components/UploadedFile'
import { AudioPlayer } from '../../../../../../../components/common/AudioPlayer'
import { VideoPlayer } from '../../../../../../../components/VideoPlayer/player'

interface AdminHomeworkT {
  lesson: IHomework
}

export const AdminHomework: FC<AdminHomeworkT> = ({ lesson }) => {
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
              <StudentLessonDesc text={lesson?.description || ''} />
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
              {/* {lesson?.code && (
                <div className={styles.lesson__codeWraper}>
                  <pre className={styles.lesson__code_text}>
                    <code>{lesson?.code}</code>
                  </pre>
                </div>
              )} */}
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id }, index: number) => (
                <UploadedFile key={id} file={file} index={index} size={34487} isHw={true} />
              ))}
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
