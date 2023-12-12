import { useState, FC, DragEvent, ChangeEvent } from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addVideoIconPath } from './config/svgIconsPath'
import { arrUpPath, arrDownPath, deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT, setShowType } from '../../types/componentsTypes'

import styles from './addVideo.module.scss'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import { useUploadLessonVideoMutation } from 'api/videoFilesService'
import { Input } from 'components/common/Input/Input/Input'
import { usePatchLessonsMutation } from 'api/modulesServices'

export const AddVideo: FC<setShowType & AddPostT> = ({ lessonIdAndType, isPreview, addFile, lesson, setShow }) => {
  const [dragVideo, setDragVideo] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [addVideoFile] = useUploadLessonVideoMutation()
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
  const [youTubeLink, setYouTubeLink] = useState<string>('')
  const [addYTVideo] = usePatchLessonsMutation()
  const schoolName = window.location.href.split('/')[4]

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(true)
  }

  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'youtubeLink') {
      setYouTubeLink(event.target.value)
    }
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(false)
  }

  const handleYTVideo = async () => {
    if (youTubeLink.length > 0 && lesson) {
      const formData = new FormData()
      formData.append('section', lesson.section.toString())
      formData.append('order', lesson.order.toString())
      formData.append('url', youTubeLink)
      await addYTVideo({ arg: { formdata: formData, id: lessonIdAndType?.id as number, type: lesson.type }, schoolName })
        .unwrap()
        .then(data => {
          lesson.url = youTubeLink
        })
      await setShow()
    }
  }

  const onDropHandler = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    const videoFiles = [...e.dataTransfer.files]

    setFiles(prev => [...prev, ...videoFiles])
    setDragVideo(false)
  }

  const handleVideoUpload = async (lessonIdAndType: any, video: File) => {
    setIsLoadingVideo(true)
    const formData = new FormData()
    formData.append('video', video)
    formData.append('section', String(lesson.section))
    formData.append('order', String(lesson.order))

    try {
      await addVideoFile({
        arg: {
          id: lessonIdAndType.id,
          type: lessonIdAndType.type,
          formdata: formData,
        },
        schoolName,
      })
        .unwrap()
        .then(data => {
          lesson.video = 'video_url'
          setIsLoadingVideo(false)
          setShow()
        })
    } catch (error) {
      setIsLoadingVideo(false)
    }
  }

  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

  return (
    <>
      {!isPreview && (!lesson.video || !lesson.url) ? (
        <div className={styles.redactorCourse_wrapper}>
          {isLoadingVideo ? (
            <div className={styles.redactorCourse_loader}>
              <SimpleLoader />
              <p style={{ fontSize: '12px', color: 'grey', textAlign: 'center' }}>
                Пока видео грузится ничего не нажимайте в этом окне, скорость загрузки зависит от скорости вашего интернет соединения
              </p>
            </div>
          ) : (
            <>
              <div className={styles.videoHandlerWrapper}>
                {!lesson.video && (
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
                      onChange={e => handleVideoUpload(lessonIdAndType, e.target.files![0])}
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
                )}
                {!lesson.video && !lesson.url && <p style={{ color: 'grey', padding: '0.5em' }}>или</p>}
                {!lesson.url && (
                  <div className={styles.youtubeLink_input}>
                    <Input
                      name={'youtubeLink'}
                      value={youTubeLink}
                      type={'text'}
                      placeholder={'Вставьте ссылку на видео YouTube'}
                      onChange={handleChangeLink}
                    />
                    <Button style={{ marginLeft: '0.5em' }} type={'submit'} text={'Добавить'} onClick={handleYTVideo} />
                  </div>
                )}
              </div>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
                {/* <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                  <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
                </div>
                <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
                  <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
                </div> */}
                <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={setShow}>
                  <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {files.length > 0 && !isLoadingVideo && (
            <div className={styles.redactorCourse_video_container}>
              {files.map((video, index) => (
                <video key={index} controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
