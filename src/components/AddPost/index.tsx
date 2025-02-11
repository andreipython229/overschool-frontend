import { FC, memo, useState } from 'react'
import { ContentBtn } from 'components/ContentBtn'
import { useDebounceFunc } from '../../customHooks'
import { AddPostT } from '../../types/componentsTypes'
import { usePatchLessonsMutation } from 'api/modulesServices'
import Text from '../../assets/img/createCourse/text.svg'
import Audio from '../../assets/img/createCourse/audio.svg'
import File from '../../assets/img/createCourse/file.svg'
import Table from '../../assets/img/createCourse/table.svg'
import Embed from '../../assets/img/createCourse/embed.svg'
import ButtonIcon from '../../assets/img/createCourse/button.svg'
import Quote from '../../assets/img/createCourse/quote.svg'
import Video from '../../assets/img/createCourse/video.svg'
import Code from '../../assets/img/createCourse/code.svg'
import Picture from '../../assets/img/createCourse/picture.svg'
import Formula from '../../assets/img/createCourse/formula.svg'
import styles from './addPost.module.scss'
import { useCreateBlockMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { BLOCK_TYPE } from 'enum/blockTypeE'

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
        formula?: string
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
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.VIDEO)}
              text={'Видео'}
              alt={'Add video for lesson'}
              src={Video}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('description')}
              text={'Файл'}
              alt={'Add file for lesson'}
              src={File}
            />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.CODE)}
              text={'Код'}
              alt={'Add code for lesson'}
              src={Code}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('picture')}
              text={'Презентация'}
              alt={'Add presentation for lesson'}
              src={Picture}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('formula')}
              text={'Аудио'}
              alt={'Add audio for lesson'}
              src={Audio}
            />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.TEXT)}
              text={'Текст'}
              alt={'Add text for lesson'}
              src={Text}
            />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.PICTURE)}
              text={'Картинка'}
              alt={'Add picture for lesson'}
              src={Picture}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('description')}
              text={'Таблица'}
              alt={'Add table for lesson'}
              src={Table}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('description')}
              text={'Цитата'}
              alt={'Add text for lesson'}
              src={Quote}
            />
            <ContentBtn
              disabled={disabledBtn}
              // func={() => blockCreateFunc('description')}
              text={'Embed'}
              alt={'Add embed for lesson'}
              src={Embed}
            />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.BUTTONS)}
              text={'Кнопка'}
              alt={'Add button for lesson'}
              src={ButtonIcon}
            />
            <ContentBtn
              disabled={disabledBtn}
              func={() => blockCreateFunc(BLOCK_TYPE.MATH)}
              text={'Формула'}
              alt={'Add formula for lesson'}
              src={Formula}
            />
          </>
        )}
      </div>
    </section>
  )
})
