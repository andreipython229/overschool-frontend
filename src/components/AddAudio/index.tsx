import { useState, DragEvent, ChangeEvent, FC } from 'react'

import { LESSON_TYPE } from 'enum/lessonTypeE'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, arrUpdatePath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../../types/componentsTypes'
import { usePostAudioFilesMutation } from 'api/filesService'
import { AudioPlayer } from '../common/AudioPlayer'
import { SimpleLoader } from '../Loaders/SimpleLoader'

import styles from './addaudio.module.scss'
const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

export const AddAudio: FC<setShowType & AddPostT> = ({ lessonIdAndType, isPreview, lesson, addAudio, setShow }) => {
  const [dragAudio, setDragAudio] = useState<boolean>(false)
  const schoolName = window.location.href.split('/')[4]

  const [addAudioFiles, { isLoading }] = usePostAudioFilesMutation()
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false)

  const dragStartAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(true)
  }

  const dragLeaveAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(false)
  }

  const onDropAudioHandler = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    const audioFiles = [...e.dataTransfer.files]

    addAudio && addAudio((prev: File[]) => [...prev, ...audioFiles])

    // const formdata = new FormData()
    // formdata.append('video', audioFiles[0])

    setDragAudio(false)
  }
  
  const handleAudioUpload = async (lessonIdAndType: any, audio: File) => {
    setIsLoadingAudio(true)
    const formData = new FormData()
    formData.append('files', audio)
    formData.append('base_lesson', String(lesson.baselesson_ptr_id))

    try {
      await addAudioFiles({formData, schoolName})
        .unwrap()
        .then(() => {
          addAudio((prev: File[]) => [...prev, audio])
        })
      setIsLoadingAudio(false)
      setShow()
    } catch (error) {
      setIsLoadingAudio(false)
    }
  }

  return (
    <>
        <div className={styles.redactorCourse_wrapper}>
          <div
            onDragStart={dragStartAudioHandler}
            onDragLeave={dragLeaveAudioHandler}
            onDragOver={dragStartAudioHandler}
            onDrop={onDropAudioHandler}
            className={dragAudio ? stylesOnDrop : stylesNoDrop}
          >
            <input
              disabled={isLoading}
              className={styles.redactorCourse_rightSide_functional_addContent_input}
              onChange={e => handleAudioUpload(lessonIdAndType, e.target.files![0])}
              type="file"
              multiple
            />

            <IconSvg styles={{ marginBottom: '38px' }} width={64} height={55} viewBoxSize="0 0 64 55">
              <rect x="19.7998" width="4.4" height="55" rx="1" fill="#BA75FF" />
              <rect x="48.3994" width="4.4" height="55" rx="1" fill="#BA75FF" />
              <rect x="39.6006" y="6.6001" width="4.4" height="44" rx="1" fill="#BA75FF" />
              <rect x="8.80078" y="11" width="4.4" height="35.2" rx="1" fill="#BA75FF" />
              <rect y="19.7998" width="4.4" height="17.6" rx="1" fill="#BA75FF" />
              <rect x="59.4004" y="19.7998" width="4.4" height="17.6" rx="1" fill="#BA75FF" />
              <rect x="28.6006" y="19.7998" width="4.4" height="15.4" rx="1" fill="#BA75FF" />
            </IconSvg>

            <span>Перетащите .mp3 аудиофайл или нажмите для загрузки</span>
            <Button
              type={'button'}
              disabled={isLoading}
              variant={isLoading ? 'disabled' : 'primary'}
              text={isLoading ? <SimpleLoader style={{ width: '125px', height: '25px' }} loaderColor="#ffff" /> : 'Выбрать файл'}
            />
          </div>
        </div>

    </>
  )
}