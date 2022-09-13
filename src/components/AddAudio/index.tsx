import { useState, DragEvent, ChangeEvent, FC } from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, arrUpdatePath, deletePath } from '../../config/commonSvgIconsPath'
import { setShowType } from '../componentsTypes'

import styles from './addaudio.module.scss'

export const AddAudio: FC<setShowType> = ({ setShow }) => {
  const [dragAudio, setDragAudio] = useState<boolean>(false)

  const dragStartAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(true)
  }

  const dragLeaveAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(false)
  }

  const onDropAudioHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const audioFiles = [...e.dataTransfer.files]
    const formData = new FormData()
    for (let i = 0; i < audioFiles.length; i += 1) {
      formData.append(`list_${i}`, audioFiles[i])
    }
    setDragAudio(false)
  }

  const onAddAudioFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const index = 0
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[index])
      reader.onloadend = event => {
        if (typeof event?.target?.result === 'string') {
          // addAudioFile(event?.target?.result)
        }
      }
    }
  }
  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

  return (
    <div
      onDragStart={dragStartAudioHandler}
      onDragLeave={dragLeaveAudioHandler}
      onDragOver={dragStartAudioHandler}
      onDrop={onDropAudioHandler}
      className={dragAudio ? stylesOnDrop : stylesNoDrop}
    >
      <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={13} height={17} viewBoxSize="0 0 13 17" path={arrUpdatePath} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={setShow}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      </div>
      <input className={styles.redactorCourse_rightSide_functional_addContent_input} onChange={onAddAudioFile} type="file" />

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
      <Button variant={'primary'} text={'Выбрать файл'} />
    </div>
  )
}
