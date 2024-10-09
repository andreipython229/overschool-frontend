import { IHomework } from '../../../../../../../types/sectionT'
import { FC, useEffect, useState } from 'react'
import styles from './adminHomework.module.scss'
import { StudentLessonDesc } from '../../../../../../StudentCourse/StudentLessonPreview/StudentLessonDesc'
import { UploadedFile } from '../../../../../../../components/UploadedFile'
import { AudioPlayer } from '../../../../../../../components/common/AudioPlayer'
import { VideoPlayer } from '../../../../../../../components/VideoPlayer/player'
import { Reorder } from 'framer-motion'
import { renderStudentBlocks } from '../AdminLessonPreview/AdminLesson'
import { NewAudioPlayer } from 'components/NewAudioPlayer'

interface AdminHomeworkT {
  lesson: IHomework
}

export const AdminHomework: FC<AdminHomeworkT> = ({ lesson }) => {
  const [lessonVideo, setLessonVideo] = useState<boolean>(false)

  return (
    <div className={styles.lesson}>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lesson?.name}</h3>
            <div className={styles.lesson__content}>
              <Reorder.Group values={lesson.blocks} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }} onReorder={() => setLessonVideo}>
                {renderStudentBlocks(lesson)}
              </Reorder.Group>
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson.audio_files &&
                lesson.audio_files.length > 0 &&
                lesson.audio_files.map(audio => <NewAudioPlayer music={audio.file} key={audio.id} />)}
              {lesson?.text_files.map(({ file, id, file_url, size }, index: number) => (
                <UploadedFile key={id} file={file} index={index} size={size} name={file_url} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
