import { useState, FC } from 'react'
import parse from 'html-react-parser'
import { ILesson, commonLessonT } from 'types/sectionT'
import { UploadedFile } from 'components/UploadedFile/index'
import { AudioPlayer } from 'components/common/AudioPlayer'

import styles from './adminLesson.module.scss'
import { VideoPlayer } from '../../../../../../../components/VideoPlayer/player'
import { BLOCK_TYPE } from 'enum/blockTypeE'
import { Reorder } from 'framer-motion'
import { PreviewCodeBlock } from 'components/blocks/codeBlock'
import { MathEditor } from 'components/MathEditor'
import { BlockLinkButton } from 'components/BlockButtons/BlockLinkButton'

type adminLessonT = {
  lesson: ILesson
}

export const renderStudentBlocks = (lesson: commonLessonT) => {
  if (lesson.type !== 'test') {
    return lesson.blocks.map(block => {
      switch (block.type) {
        case BLOCK_TYPE.TEXT:
          if ('description' in block && block.description) {
            return (
              <div className={styles.lesson__content} key={block.id}>
                <span className={styles.lesson__desc}>{parse(`${block.description}`)}</span>
              </div>
            )
          } else {
            return <></>
          }
        case BLOCK_TYPE.CODE:
          if ('code' in block && block.code) {
            return <PreviewCodeBlock block={block} />
          } else {
            return <></>
          }
        case BLOCK_TYPE.VIDEO:
          if ('video' in block && block.video) {
            return <VideoPlayer isEditing={false} key={block.id} lessonId={lesson.baselesson_ptr_id} videoSrc={block.video} />
          } else if ('url' in block && block.url) {
            return <VideoPlayer isEditing={false} key={block.id} lessonId={lesson.baselesson_ptr_id} videoSrc={block.url} />
          } else {
            return <></>
          }
        case BLOCK_TYPE.PICTURE:
          if ('picture_url' in block && block.picture_url) {
            return <img style={{ width: '100%', maxWidth: '100%', objectFit: 'contain' }} src={block.picture_url} alt={String(block.id)} />
          } else {
            return <></>
          }
        case BLOCK_TYPE.MATH:
          if ('formula' in block && block.formula) {
            return (
              <div className={styles.math}>
                <MathEditor key={block.id} edit={false} block={block} latex={block.formula} />
              </div>
            )} else {
            return <></>
          }
        case BLOCK_TYPE.BUTTONS:
          if ('buttons' in block && block.buttons) {
            return (
              <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {block.buttons.map((button, index) => (
                  <BlockLinkButton key={`${button.id}_${index}`} button={button} color={button.color} />
                ))}
              </div>
            )
          } else {
            return <></>
          }
      }
    })
  }
}

export const AdminLesson: FC<adminLessonT> = ({ lesson }) => {
  const [lessonVideo, setLessonVideo] = useState<boolean>(false)

  return (
    <div className={styles.adminlesson}>
      <div className={styles.adminlesson__blocks}>
        <div className={styles.adminlesson__wrap}>
          <div className={styles.adminlesson__card}>
            {/* <h3 className={styles.adminlesson__name_mini}>{lesson?.name}</h3> */}
            <div className={styles.adminlesson__content}>
              <Reorder.Group values={lesson.blocks} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }} onReorder={() => setLessonVideo}>
                {renderStudentBlocks(lesson)}
              </Reorder.Group>
            </div>
            <div className={styles.adminlesson__content}>
              <AudioPlayer styles={{ margin: '5px' }} audioUrls={lesson?.audio_files} title="" />
              <span className={styles.adminlesson__materials}>Материалы:</span>
              {lesson?.text_files.map(({ file, id, file_url, size }, index: number) => (
                <UploadedFile key={id} file={file} name={file_url} index={index} size={size} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
