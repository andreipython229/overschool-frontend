import { useState, FC, DragEvent, ChangeEvent } from 'react'

import { LESSON_TYPE } from 'enum/lessonTypeE'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addVideoIconPath } from './config/svgIconsPath'
import { arrUpPath, arrDownPath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../../types/componentsTypes'
import { patchData } from '../../utils/patchData'

import styles from './addVideo.module.scss'

export const AddVideo: FC<setShowType & AddPostT> = ({ lessonIdAndType, isPreview, addFile, lesson, setShow }) => {
  // const [addVideoLink, setAddVideoLink] = useState<string>('')

  const [dragVideo, setDragVideo] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(true)
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(false)
  }

  const onDropHandler = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    const audioFiles = [...e.dataTransfer.files]

    setFiles(prev => [...prev, ...audioFiles])
    // const formdata = new FormData()
    // formdata.append('audio', audioFiles[0])
    // await addAudioFile({ formdata, id, type: lessonIdAndType?.type as string })
    setDragVideo(false)
  }

  const handleUploadFiles = (chosenFiles: File[]) => {
    const uploaded = [...files]

    chosenFiles.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })

    setFiles(uploaded)
  }

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files)

    handleUploadFiles(chosenFiles)
  }

  // const opts: YouTubeProps['opts'] = {
  //   height: '500px',
  //   width: '800px',
  //   playerVars: {
  //     autoplay: 0,
  //     apiKey: window.youTubeAPIKey.apiKey,
  //   },
  // }
  // const videoIdLesson = youtubeParser(lesson.type === LESSON_TYPE.LESSON ? lesson?.video : '')

  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

  return (
    <>
      {!isPreview ? (
        <div className={styles.redactorCourse_wrapper}>
          <div
            onDragStart={dragStartHandler}
            onDragLeave={dragEndHandler}
            onDragOver={dragStartHandler}
            onDrop={onDropHandler}
            className={dragVideo ? stylesOnDrop : stylesNoDrop}
          >
            <input
              // disabled={isLoading}
              className={styles.redactorCourse_rightSide_functional_addContent_input}
              onChange={handleChangeFiles}
              type="file"
              multiple
            />
            <IconSvg width={83} height={84} viewBoxSize="0 0 83 84" path={addVideoIconPath} />
            <span>Перетащите .mp4 видеофайл или нажмите для загрузки</span>
            <Button
              type={'button'}
              // disabled={isLoading}
              variant={'primary'}
              text={'Выбрать файл'}
            />
          </div>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
            <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
              <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
            </div>
            <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
              <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
            </div>
            <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={setShow}>
              <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {files.length > 0 && (
            <div className={styles.redactorCourse_video_container}>
              {files.map((video, index) => (
                <video key={index} controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
              ))}
            </div>
          )}
        </>
        // <>{videoIdLesson && <YouTube opts={opts} videoId={videoIdLesson as string} />}</>
      )}
    </>
  )
}
