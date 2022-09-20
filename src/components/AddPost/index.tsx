import { FC, memo } from 'react'

import { AddVideo } from 'components/AddVideo'
import { AddAudio } from 'components/AddAudio'
import { AddCodeEditor } from 'components/AddCodeEditor'
import { AddTextEditor } from 'components/AddTextEditor'
import { ContentBtn } from 'components/ContentBtn'
import { useBoolean } from '../../customHooks/useBoolean'
import { AddPostT } from '../componentsTypes'

import Text from '../.././assets/img/createCourse/text.svg'
import Video from '../.././assets/img/createCourse/video.svg'
import Audio from '../.././assets/img/createCourse/audio.svg'
import Code from '../.././assets/img/createCourse/code.svg'

import styles from './addPost.module.scss'

export const AddPost: FC<AddPostT> = memo(({ lesson }) => {
  const [isOpenTextEditor, { on: closeTextEditor, off: openTextEditor }] = useBoolean()
  const [isOpenVideo, { on: closeVideo, off: openVideo }] = useBoolean()
  const [isOpenAudio, { on: closeAudio, off: openAudio }] = useBoolean()
  const [isOpenCodeEditor, { on: closeCodeEditor, off: openCodeEditor }] = useBoolean()

  return (
    <>
      {isOpenTextEditor && <AddTextEditor lesson={lesson} setShow={closeTextEditor} />}
      {isOpenVideo && <AddVideo lesson={lesson} setShow={closeVideo} />}
      {isOpenAudio && <AddAudio lesson={lesson} setShow={closeAudio} />}
      {isOpenCodeEditor && <AddCodeEditor lesson={lesson} setShow={closeCodeEditor} />}

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
})
