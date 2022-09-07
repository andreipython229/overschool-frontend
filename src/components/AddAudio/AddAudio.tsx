import { useState, DragEvent, ChangeEvent, FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants'
import { ClassesSettingSvgBlock } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ClassesSettings/ClassesSettingSvgBlock/ClassesSettingSvgBlock'

import styles from './addaudio.module.scss'

type setShowType = {
  setShow: (value: boolean) => void
}

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
    console.log(audioFiles)
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
          <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowUp} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={11} height={15} d={classesSettingSvgIcon.arrowDown} viewBoxSize="0 0 11 15" fill={'#2E4454'} />
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
          <IconSvg width={13} height={17} d={classesSettingSvgIcon.arrowUpdate} viewBoxSize="0 0 13 17" fill={'#BA75FF'} />
        </div>
        <div
          className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete}
          onClick={() => {
            setShow(false)
          }}
        >
          <IconSvg width={19} height={19} d={classesSettingSvgIcon.deleteIcon} viewBoxSize="0 0 19 19" fill={'#EF4444'} />
        </div>
      </div>
      <input className={styles.redactorCourse_rightSide_functional_addContent_input} onChange={onAddAudioFile} type="file" />

      <ClassesSettingSvgBlock />
      <span>Перетащите .mp3 аудиофайл или нажмите для загрузки</span>
      <Button variant={'primary'} text={'Выбрать файл'} />
    </div>
  )
}
