import { useState, DragEvent, FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { AddPostT, setShowType } from '../../types/componentsTypes'
import { usePostAudioFilesMutation } from 'api/filesService'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import { ILesson } from 'types/sectionT'

import styles from './addaudio.module.scss'
const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

interface AddAudioProps extends setShowType, AddPostT {
  updateLesson: (newLesson: ILesson) => void
}

export const AddAudio: FC<setShowType & AddPostT & AddAudioProps> = ({ lessonIdAndType, lesson, addAudio, setShow, updateLesson }) => {
  const [dragAudio, setDragAudio] = useState<boolean>(false)
  const schoolName = window.location.href.split('/')[4]
  const [audioError, setAudioError] = useState<string>('')

  const [addAudioFiles, { isLoading }] = usePostAudioFilesMutation()
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false)
  const [audioFiles, setAudioFiles] = useState<File[]>([])

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

    setAudioFiles(prevAudioFiles => [...prevAudioFiles, ...audioFiles])
    setDragAudio(false)
  }

  const handleAudioUpload = async (lessonIdAndType: any, audio: File) => {
    setAudioError('')
    if (audio.size <= 200 * 1024 * 1024) {
      setIsLoadingAudio(true)
      const formData = new FormData()
      formData.append('files', audio)
      formData.append('base_lesson', String(lesson.baselesson_ptr_id))

      try {
        const response = await addAudioFiles({ formData, schoolName }).unwrap()

        if (Array.isArray(response) && lesson && 'audio_files' in lesson) {
          const updatedAudioFiles = [...(lesson.audio_files || undefined), ...response]
          if ('lesson_id' in lesson) {
            updateLesson({ ...lesson, audio_files: updatedAudioFiles })
          }
        }
        setIsLoadingAudio(false)
        setShow()
      } catch (error) {
        setIsLoadingAudio(false)
      }
    } else {
      setAudioError('Допустимый размер файла не должен превышать 200 МБ')
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

          <IconSvg styles={{ marginBottom: '20px' }} width={59} height={58} viewBoxSize="0 0 59 58">
            <path
              d="M15 35.9848C14.0092 35.9848 13.1875 35.1631 13.1875 34.1723V23.8047C13.1875 22.8139 14.0092 21.9922 15 21.9922C15.9908 21.9922 16.8125 22.8139 16.8125 23.8047V34.1723C16.8125 35.1873 15.9908 35.9848 15 35.9848Z"
              fill="#357EEB"
            />
            <path
              d="M22.25 39.4386C21.2592 39.4386 20.4375 38.617 20.4375 37.6261V20.3711C20.4375 19.3803 21.2592 18.5586 22.25 18.5586C23.2408 18.5586 24.0625 19.3803 24.0625 20.3711V37.6261C24.0625 38.6411 23.2408 39.4386 22.25 39.4386Z"
              fill="#357EEB"
            />
            <path
              d="M29.5 42.8971C28.5092 42.8971 27.6875 42.0755 27.6875 41.0846V16.918C27.6875 15.9271 28.5092 15.1055 29.5 15.1055C30.4908 15.1055 31.3125 15.9271 31.3125 16.918V41.0846C31.3125 42.0755 30.4908 42.8971 29.5 42.8971Z"
              fill="#357EEB"
            />
            <path
              d="M36.75 39.4386C35.7592 39.4386 34.9375 38.617 34.9375 37.6261V20.3711C34.9375 19.3803 35.7592 18.5586 36.75 18.5586C37.7408 18.5586 38.5625 19.3803 38.5625 20.3711V37.6261C38.5625 38.6411 37.7408 39.4386 36.75 39.4386Z"
              fill="#357EEB"
            />
            <path
              d="M44 35.9848C43.0092 35.9848 42.1875 35.1631 42.1875 34.1723V23.8047C42.1875 22.8139 43.0092 21.9922 44 21.9922C44.9908 21.9922 45.8125 22.8139 45.8125 23.8047V34.1723C45.8125 35.1873 44.9908 35.9848 44 35.9848Z"
              fill="#357EEB"
            />
            <path
              d="M36.7502 54.9779H22.2502C9.12766 54.9779 3.521 49.3712 3.521 36.2487V21.7487C3.521 8.6262 9.12766 3.01953 22.2502 3.01953H36.7502C49.8727 3.01953 55.4793 8.6262 55.4793 21.7487V36.2487C55.4793 49.3712 49.8727 54.9779 36.7502 54.9779ZM22.2502 6.64453C11.1093 6.64453 7.146 10.6079 7.146 21.7487V36.2487C7.146 47.3895 11.1093 51.3529 22.2502 51.3529H36.7502C47.891 51.3529 51.8543 47.3895 51.8543 36.2487V21.7487C51.8543 10.6079 47.891 6.64453 36.7502 6.64453H22.2502Z"
              fill="#357EEB"
            />
          </IconSvg>

          <span className={styles.text}>Перетащите .mp3 аудиофайл или нажмите для загрузки</span>
          {audioError && <p className={styles.redactorCourse_rightSide_functional_addContent_error}>{audioError}</p>}
          <Button
            type={'button'}
            disabled={isLoading}
            variant={'newPrimary'}
            text={isLoading ? <SimpleLoader style={{ width: '125px', height: '25px' }} loaderColor="#ffff" /> : 'Выбрать аудиофайл'}
          />
        </div>
      </div>
    </>
  )
}
