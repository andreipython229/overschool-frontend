import React, { useState, DragEvent, ChangeEvent, FC } from 'react'
import { Toggle } from '@skbkontur/react-ui'
import { ContentBtn } from '../../ContentBtn/ContentBtn'
import { Button } from 'components/common/Button/Button'
import { programLanguage } from 'constants/other'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from '../../../../../../../components/common/IconSvg/IconSvg'
import { classesSettingSvgIcon } from '../../../../../../../constants/iconSvgConstants'
import { ClassesSettingSvgBlock } from './ClassesSettingSvgBlock/ClassesSettingSvgBlock'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { showModal } from 'store/redux/modal/slice'

import Text from '../../../../../../../assets/img/createCourse/text.svg'
import Video from '../../../../../../../assets/img/createCourse/video.svg'
import Audio from '../../../../../../../assets/img/createCourse/audio.svg'
import Code from '../../../../../../../assets/img/createCourse/code.svg'

import styles from '../constructor.module.scss'

type ClassesSettingsPropsT = {
  showSettingsClassesModal: () => void
}

export const ClassesSettings: FC<ClassesSettingsPropsT> = ({ showSettingsClassesModal }) => {
  const dispatch = useAppDispatch()
  const [dragVideo, setDragVideo] = useState<boolean>(false)
  const [dragAudio, setDragAudio] = useState<boolean>(false)

  // Драг энд дроп функции

  const showSettingsModal = () => {
    showSettingsClassesModal()
    dispatch(showModal(true))
  }

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

  const dragStartAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(true)
  }

  const dragLeaveAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragAudio(false)
  }

  const onDropAudioHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const audioFiles = [...e.dataTransfer.files]
    const formData = new FormData()
    for (let i = 0; i < audioFiles.length; i += 1) {
      formData.append(`list_${i}`, audioFiles[i])
    }
    console.log(audioFiles)
    setDragAudio(false)
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
  const stylesOnDrop =
    styles.redactorCourse_rightSide_functional_addContent +
    ' ' +
    styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent
  return (
    <div className={styles.redactorCourse_rightSide}>
      <div className={styles.redactorCourse_rightSide_header}>
        <span className={styles.redactorCourse_rightSide_title}>Первый урок</span>
        <div className={styles.redactorCourse_rightSide_header_btnBlock}>
          <button
            onClick={showSettingsModal}
            className={styles.redactorCourse_rightSide_header_btnBlock_setting}
          >
            <IconSvg
              width={16}
              height={16}
              d={classesSettingSvgIcon.setting}
              viewBoxSize="0 0 16 16"
              fill={'#6B7280'}
            />
            Настройки
          </button>
          <button className={styles.redactorCourse_rightSide_header_btnBlock_delete}>
            <IconSvg
              width={19}
              height={19}
              d={classesSettingSvgIcon.deleteIcon}
              viewBoxSize="0 0 19 19"
              fill={'#EF4444'}
            />
          </button>
        </div>
      </div>
      <div className={styles.redactorCourse_rightSide_functional}>
        <div className={styles.redactorCourse_rightSide_functional_content}>
          <span className={styles.redactorCourse_rightSide_title}>Содержание занятия</span>
          <div>
            <span className={styles.redactorCourse_rightSide_functional_content_preview}>
              Предпросмотр
            </span>
            <Toggle />
          </div>
        </div>
        <MyEditor />
        <section style={{ marginBottom: '48px' }}>
          <div
            onDragStart={dragStartVideoHandler}
            onDragLeave={dragLeaveVideoHandler}
            onDragOver={dragStartVideoHandler}
            onDrop={onDropVideoHandler}
            className={dragVideo ? stylesOnDrop : stylesNoDrop}
          >
            <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                <IconSvg
                  width={11}
                  height={15}
                  d={classesSettingSvgIcon.arrowUp}
                  viewBoxSize="0 0 11 15"
                  fill={'#2E4454'}
                />
              </div>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                <IconSvg
                  width={11}
                  height={15}
                  d={classesSettingSvgIcon.arrowDown}
                  viewBoxSize="0 0 11 15"
                  fill={'#2E4454'}
                />
              </div>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                <IconSvg
                  width={13}
                  height={17}
                  d={classesSettingSvgIcon.arrowUpdate}
                  viewBoxSize="0 0 13 17"
                  fill={'#BA75FF'}
                />
              </div>
            </div>
            <input
              className={styles.redactorCourse_rightSide_functional_addContent_input}
              onChange={onAddVideoFile}
              type="file"
            />
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
        </section>

        <section style={{ marginBottom: '48px' }}>
          <div
            onDragStart={dragStartAudioHandler}
            onDragLeave={dragLeaveAudioHandler}
            onDragOver={dragStartAudioHandler}
            onDrop={onDropAudioHandler}
            className={dragAudio ? stylesOnDrop : stylesNoDrop}
          >
            <input
              className={styles.redactorCourse_rightSide_functional_addContent_input}
              onChange={onAddAudioFile}
              type="file"
            />
            <ClassesSettingSvgBlock />
            <span>Перетащите .mp3 аудиофайл или нажмите для загрузки</span>
            <Button variant={'primary'} text={'Выбрать файл'} />
          </div>
        </section>

        <section className={styles.redactorCourse_rightSide_functional_blackBlock}>
          <div className={styles.redactorCourse_rightSide_functional_blackBlock_select}>
            <SelectInput optionsList={programLanguage} />
          </div>
        </section>
        <section className={styles.redactorCourse_rightSide_functional_creating}>
          <div className={styles.redactorCourse_rightSide_functional_creating_title}>
            Добавить контент
          </div>
          <div className={styles.redactorCourse_rightSide_functional_creating_function}>
            <ContentBtn text={'Текс'} alt={'Add text for lesson'} src={Text} />
            <ContentBtn text={'Видео'} alt={'Add video for lesson'} src={Video} />
            <ContentBtn text={'Аудио'} alt={'Add audio for lesson'} src={Audio} />
            <ContentBtn text={'Код'} alt={'Add code for lesson'} src={Code} />
          </div>
        </section>
        <div>
          <span className={styles.redactorCourse_rightSide_title}>Прикреплённые файлы</span>
          <button
            style={{ width: '180px', padding: '11px 0 11px 16px', marginTop: '16px' }}
            className={styles.redactorCourse_rightSide_header_btnBlock_setting}
          >
            <IconSvg
              width={22}
              height={18}
              d={classesSettingSvgIcon.paperClip}
              viewBoxSize="0 0 22 18"
              fill={'#6B7280'}
            />
            Прикрепить файлы
          </button>
          <span className={styles.redactorCourse_rightSide_desc}>
            Любые файлы размером не более 2 гигабайта
          </span>
        </div>
      </div>
    </div>
  )
}
