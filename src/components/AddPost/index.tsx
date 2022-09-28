import { FC, useEffect, useState } from 'react'
import parse from 'html-react-parser'

import { AddVideo } from 'components/AddVideo'
import { AddAudio } from 'components/AddAudio'
import { AddCodeEditor } from 'components/AddCodeEditor'
import { AddTextEditor } from 'components/AddTextEditor'
import { ContentBtn } from 'components/ContentBtn'
import { useBoolean } from '../../customHooks/useBoolean'
import { AddPostT } from '../componentsTypes'
import { patchData } from '../../utils/patchData'
import { useDebounce } from '../../customHooks/useDebounce'
import { usePatchLessonsMutation } from 'api/modulesServices'

import Text from '../.././assets/img/createCourse/text.svg'
import Video from '../.././assets/img/createCourse/video.svg'
import Audio from '../.././assets/img/createCourse/audio.svg'
import Code from '../.././assets/img/createCourse/code.svg'

import styles from './addPost.module.scss'

export const AddPost: FC<AddPostT> = ({ lesson, isPreview }) => {
  const [isOpenTextEditor, { on: closeTextEditor, off: openTextEditor }] = useBoolean()
  const [isOpenVideo, { on: closeVideo, off: openVideo }] = useBoolean()
  const [isOpenAudio, { on: closeAudio, off: openAudio }] = useBoolean()
  const [isOpenCodeEditor, { on: closeCodeEditor, off: openCodeEditor }] = useBoolean()

  const [addPatchData] = usePatchLessonsMutation()

  const [descriptionLesson, setDescriptionLesson] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const [debounced] = useDebounce(code, 1000)

  const description: any = parse(descriptionLesson)

  useEffect(() => {
    if (description[0]?.props?.children && lesson) {
      patchData(lesson, 'lesson_id', 'description', descriptionLesson, addPatchData)
    }
  }, [descriptionLesson])

  useEffect(() => {
    if (code && lesson) {
      patchData(lesson, 'lesson_id', 'code', debounced.toString(), addPatchData)
    }
  }, [debounced.toString()])

  const handleEditorChange = (code: string) => {
    setCode(code)
  }

  return (
    <>
      {isOpenTextEditor && (
        <AddTextEditor isPreview={isPreview} lesson={lesson} setShow={closeTextEditor} setDescriptionLesson={setDescriptionLesson} />
      )}
      {isOpenVideo && <AddVideo isPreview={isPreview} addFile={addPatchData} lesson={lesson} setShow={closeVideo} />}
      {isOpenAudio && <AddAudio isPreview={isPreview} lesson={lesson} setShow={closeAudio} />}
      {isOpenCodeEditor && (
        <AddCodeEditor isPreview={isPreview} lesson={lesson} code={code} handleEditorChange={handleEditorChange} setShow={closeCodeEditor} />
      )}

      <section className={styles.redactorCourse_rightSide_functional_creating}>
        <div className={styles.redactorCourse_rightSide_functional_creating_title}>Добавить контент</div>
        <div className={styles.redactorCourse_rightSide_functional_creating_function}>
          <ContentBtn func={openTextEditor} text={'Текс'} alt={'Add text for lesson'} src={Text} />
          <ContentBtn func={openVideo} text={'Видео'} alt={'Add video for lesson'} src={Video} />
          <ContentBtn func={openAudio} text={'Аудио'} alt={'Add audio for lesson'} src={Audio} />
          <ContentBtn func={openCodeEditor} text={'Код'} alt={'Add code for lesson'} src={Code} />
        </div>
      </section>
    </>
  )
}
