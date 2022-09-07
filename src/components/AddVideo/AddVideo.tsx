import React, { useState, DragEvent, ChangeEvent, FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { classesSettingSvgIcon } from '../../constants/iconSvgConstants'
import styles from './addVideo.module.scss'

type setShowType = {
  setShow: (value: boolean) => void
}

export const AddVideo: FC<setShowType> = ({ setShow }) => {
  const [dragVideo, setDragVideo] = useState<boolean>(false)

  const dragStartVideoHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(true)
  }

  const dragLeaveVideoHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(false)
  }

  const onDropVideoHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const videoFiles = [...e.dataTransfer.files]
    const formData = new FormData()
    for (let i = 0; i < videoFiles.length; i += 1) {
      formData.append(`list_${i}`, videoFiles[i])
      console.log(videoFiles.length)
    }
    console.log(videoFiles)
    setDragVideo(false)
  }
  const onAddVideoFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const index = 0
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[index])
      reader.onloadend = event => {
        if (typeof event?.target?.result === 'string') {
          // console.log(event?.target?.result)
        }
      }
    }
  }
  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent
  return (
    <div
      onDragStart={dragStartVideoHandler}
      onDragLeave={dragLeaveVideoHandler}
      onDragOver={dragStartVideoHandler}
      onDrop={onDropVideoHandler}
      className={dragVideo ? stylesOnDrop : stylesNoDrop}
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
      <input className={styles.redactorCourse_rightSide_functional_addContent_input} onChange={onAddVideoFile} type="file" />
      <IconSvg
        width={83}
        height={84}
        d={classesSettingSvgIcon.videoIcon.circle}
        d2={classesSettingSvgIcon.videoIcon.triangle}
        viewBoxSize="0 0 83 84"
        fill={'#BA75FF'}
      />
      <span>Перетащите видеофайл или нажмите для загрузки</span>
      <Button variant={'primary'} text={'Выбрать файл'} />
    </div>
  )
}
