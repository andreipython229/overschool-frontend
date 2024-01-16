import { useEffect, useState, FC } from 'react'
import { Params } from 'react-router-dom'
import parse from 'html-react-parser'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { sectionT, ILesson } from 'types/sectionT'
import { StudentCourseNavArr } from '../StudentCourseNavArr'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'
import { StudentLessonNavBtns } from '../StudentLessonNavBtns'
import { VideoPlayer } from '../../../../components/VideoPlayer/player'

import styles from '../lesson.module.scss'
import { BLOCK_TYPE } from 'enum/blockTypeE'

type studentLessonT = {
  lesson: ILesson
  lessons: sectionT
  params: Params
  activeLessonIndex: number
}

export const StudentLesson: FC<studentLessonT> = ({ lesson, lessons, params, activeLessonIndex }) => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId, lesson_type: lessonType } = params

  const renderBlocks = () => {
    return lesson.blocks.map(block => {
      switch (block.type) {
        case BLOCK_TYPE.TEXT:
          if ('description' in block && block.description) {
            return (
              <div className={styles.lesson__content}>
                <span className={styles.lesson__desc}>{parse(`${block.description}`)}</span>
              </div>
            )
          } else {
            return <></>
          }
        case BLOCK_TYPE.CODE:
          if ('code' in block && block.code) {
            return (
              <div className={styles.lesson__codeWraper}>
                <pre className={styles.lesson__code_text}>
                  <code>{block.code}</code>
                </pre>
              </div>
            )
          } else {
            return <></>
          }
        case BLOCK_TYPE.VIDEO:
          if ('video' in block && block.video) {
            return <VideoPlayer isEditing={false} lessonId={lesson.baselesson_ptr_id} videoSrc={block.video} />
          } else if ('url' in block && block.url) {
            return <VideoPlayer isEditing={false} lessonId={lesson.baselesson_ptr_id} videoSrc={block.url} />
          } else {
            return <></>
          }
        case BLOCK_TYPE.PICTURE:
          return <></>
      }
    })
  }

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
            {/* <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>{lesson?.description ? parse(`${lesson?.description}`) : 'Нет описания'}</span>
            </div> */}
            {/* {lessonVideo &&
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
              ))} */}
            <div className={styles.lesson__content}>{renderBlocks()}</div>

            <div className={styles.lesson__content}>
              {/* {lesson?.code && (
                                <div className={styles.lesson__codeWraper}>
                                  <pre className={styles.lesson__code_text}>
                                    <code>{lesson?.code}</code>
                                  </pre>
                                </div>
                              )} */}
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              {lesson?.text_files.map(({ file, id, file_url, size }, index: number) => (
                <UploadedFile key={id} file={file} name={file_url} index={index} size={size} />
              ))}
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
        </div>
      </div>
    </div>
  )
}
