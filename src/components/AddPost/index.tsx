import { FC, memo, useState } from 'react'
import { ContentBtn } from 'components/ContentBtn'
import { useDebounceFunc } from '../../customHooks'
import { AddPostT } from '../../types/componentsTypes'
import { usePatchLessonsMutation } from 'api/modulesServices'
import Text from '../.././assets/img/createCourse/text.svg'
import Video from '../.././assets/img/createCourse/video.svg'
import Code from '../.././assets/img/createCourse/code.svg'
import Picture from '../.././assets/img/createCourse/picture.svg'

import styles from './addPost.module.scss'
import { useCreateBlockMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

export const AddPost: FC<AddPostT> = memo(({ lessonIdAndType, lesson, isPreview, setLessonBlocks, lessonBlocks }) => {
  const schoolName = window.location.href.split('/')[4]
  const [createBlock, { isLoading: isCreating }] = useCreateBlockMutation()
  const [files, setFiles] = useState<File[]>([])
  const [addPatchData] = usePatchLessonsMutation()
  const debounced = useDebounceFunc(addPatchData, 2000)
  const disabledBtn: boolean = lessonIdAndType?.type === 'test'
  
  const blockCreateFunc = (blockType: string) => {
    if (lesson && blockType) {
      interface ISendData {
        type: string
        base_lesson: number
        description?: string
        code?: string
        video?: string
        picture?: string
        url?: string
      }

      const dataToSend: ISendData = {
        type: blockType,
        base_lesson: lesson.baselesson_ptr_id,
      }

      createBlock({ data: dataToSend, schoolName })
        .unwrap()
        .then(data => {
          if (lessonBlocks && setLessonBlocks) {
            setLessonBlocks(lessonBlocks.concat(data))
          }
        })
    }
  }

  return (
    <section className={styles.redactorCourse_rightSide_functional_creating}>
      <div className={styles.redactorCourse_rightSide_functional_creating_title}>Добавить контент</div>
      <div className={styles.redactorCourse_rightSide_functional_creating_function}>
        {isCreating ? (
          <SimpleLoader style={{ width: '200px', height: '100px' }} />
        ) : (
          <>
            <ContentBtn disabled={disabledBtn} func={() => blockCreateFunc('description')} text={'Текст'} alt={'Add text for lesson'} src={Text} />
            <ContentBtn disabled={disabledBtn} func={() => blockCreateFunc('video')} text={'Видео'} alt={'Add video for lesson'} src={Video} />
            <ContentBtn disabled={disabledBtn} func={() => blockCreateFunc('code')} text={'Код'} alt={'Add code for lesson'} src={Code} />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc('picture')}
              text={'Картинка'}
              alt={'Add picture for lesson'}
              src={Picture}
            />
          </>
        )}
      </div>
    </section>
  )
})
