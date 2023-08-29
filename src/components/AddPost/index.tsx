import { FC, memo, useEffect, useState } from 'react'
import parse from 'html-react-parser'

import { AddVideo } from 'components/AddVideo'
import { AddAudio } from 'components/AddAudio'
import { AddCodeEditor } from 'components/AddCodeEditor'
import { AddTextEditor } from 'components/AddTextEditor'
import { ContentBtn } from 'components/ContentBtn'
import { useBoolean, useDebounceFunc } from '../../customHooks'
import { AddPostT } from '../../types/componentsTypes'
import { usePatchLessonsMutation } from 'api/modulesServices'

import Text from '../.././assets/img/createCourse/text.svg'
import Video from '../.././assets/img/createCourse/video.svg'
import Audio from '../.././assets/img/createCourse/audio.svg'
import Code from '../.././assets/img/createCourse/code.svg'

import styles from './addPost.module.scss'

export const AddPost: FC<AddPostT> = memo(({ lessonIdAndType, lesson, isPreview }) => {
  const [isOpenTextEditor, { on: closeTextEditor, off: openTextEditor }] = useBoolean()
  const [isOpenVideo, { on: closeVideo, off: openVideo }] = useBoolean()
  const [isOpenAudio, { on: closeAudio, off: openAudio }] = useBoolean()
  const [isOpenCodeEditor, { on: closeCodeEditor, off: openCodeEditor }] = useBoolean()
  console.log('lesson', lesson)

  const [addPatchData] = usePatchLessonsMutation()

  const [descriptionLesson, setDescriptionLesson] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const debounced = useDebounceFunc(addPatchData, 2000)

  const description: any = parse(descriptionLesson)

  const disabledBtn: boolean = lessonIdAndType?.type === 'test'

  useEffect(() => {
    console.log('#')
  }, [lesson, lessonIdAndType])

  useEffect(() => {
    if (description[0]?.props?.children && lesson) {
      const formData = new FormData();
      formData.append('description', descriptionLesson.toString())
      formData.append('section', lesson.section.toString())
      formData.append('order', lesson.order.toString())
      debounced({formdata: formData, id: lesson.baselesson_ptr_id as number, type: lesson.type})
      // patchData(lesson, `${lessonIdAndType?.type}_id`, 'description', descriptionLesson, debounced, lessonIdAndType?.type)
    }
  }, [descriptionLesson])

  useEffect(() => {
    if (code && lesson) {
      const formData = new FormData();
      formData.append('code', code.toString())
      formData.append('section', lesson.section.toString())
      formData.append('order', lesson.order.toString())
      debounced({formdata: formData, id: lesson.baselesson_ptr_id as number, type: lesson.type})
      // patchData(lesson, `${lessonIdAndType?.type}_id`, 'code', code.toString(), debounced, lessonIdAndType?.type)
    }
  }, [code.toString()])

  const handleEditorChange = (code: string | undefined) => {
    if (code) {
      setCode(code)
    }
  }

  return (
    <>
      {isOpenTextEditor && (
        <AddTextEditor isPreview={isPreview} lesson={lesson} setShow={closeTextEditor} setDescriptionLesson={setDescriptionLesson} />
      )}
      {isOpenVideo && (
        <AddVideo lessonIdAndType={lessonIdAndType} isPreview={isPreview} addFile={addPatchData} lesson={lesson} setShow={closeVideo} />
      )}
      {isOpenAudio && <AddAudio lessonIdAndType={lessonIdAndType} isPreview={isPreview} lesson={lesson} setShow={closeAudio} />}
      {isOpenCodeEditor && (
        <AddCodeEditor isPreview={isPreview} lesson={lesson} code={code} handleEditorChange={handleEditorChange} setShow={closeCodeEditor} />
      )}

      <section className={styles.redactorCourse_rightSide_functional_creating}>
        <div className={styles.redactorCourse_rightSide_functional_creating_title}>Добавить контент</div>
        <div className={styles.redactorCourse_rightSide_functional_creating_function}>
          {/*{!('description' in lesson && lesson.description) && (<ContentBtn disabled={disabledBtn} func={openTextEditor} text={'Текст'} alt={'Add text for lesson'}*/}
          {/*             src={Text}/>)}*/}
          <ContentBtn disabled={disabledBtn} func={openVideo} text={'Видео'} alt={'Add video for lesson'} src={Video} />
          <ContentBtn disabled={disabledBtn} func={openAudio} text={'Аудио'} alt={'Add audio for lesson'} src={Audio} />
          {/*<ContentBtn disabled={disabledBtn} func={openCodeEditor} text={'Код'} alt={'Add code for lesson'} src={Code} />*/}
        </div>
      </section>
    </>
  )
})
