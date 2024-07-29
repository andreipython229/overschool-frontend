import { useState, FC, DragEvent, ChangeEvent, PointerEvent, useEffect } from 'react'

import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addVideoIconPath } from './config/svgIconsPath'
import { deletePath } from '../../config/commonSvgIconsPath'
import { AddPostT } from '../../types/componentsTypes'

import styles from './addVideo.module.scss'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import { useUploadLessonVideoMutation } from 'api/videoFilesService'
import { Input } from 'components/common/Input/Input/Input'
import { usePatchLessonsMutation } from 'api/modulesServices'
import { IBlockCode, IBlockDesc, IBlockPic, IBlockVid } from 'types/sectionT'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { Reorder, useDragControls } from 'framer-motion'
import { useDeleteBlockMutation, useUpdateBlockDataMutation } from 'api/blocksService'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { createTheme, alpha, ThemeProvider } from '@mui/material/styles'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#BA75FF',
    },
  },
})

export const AddVideo: FC<AddPostT> = ({ lessonIdAndType, isPreview, block, lesson, setLessonBlocks, lessonBlocks }) => {
  const [dragVideo, setDragVideo] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [addVideoFile] = useUploadLessonVideoMutation()
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
  const [youTubeLink, setYouTubeLink] = useState<string>('')
  const [addYTVideo] = useUpdateBlockDataMutation()
  const controls = useDragControls()
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const schoolName = window.location.href.split('/')[4]
  const { access: token } = useAppSelector(selectUser).authState
  const [ytVideoError, setYTVideoError] = useState<string>('')

  const [videoError, setVideoError] = useState<string>('')

  const [progress, setProgress] = useState<number>(0)

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(true)
  }

  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'youtubeLink') {
      setYTVideoError('')
      setYouTubeLink(event.target.value)
    }
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragVideo(false)
  }

  const handleDeleteVid = () => {
    if (block && lessonBlocks && setLessonBlocks) {
      deleteBlock({ id: block.id, schoolName })
        .unwrap()
        .then(data => {
          const updatedLessons = lessonBlocks.filter(item => item.id !== block.id)
          setLessonBlocks(updatedLessons)
        })
    }
  }

  const handleYTVideo = async () => {
    if (youTubeLink.length > 0 && lesson && block) {
      const dataToSend: IBlockVid = {
        id: block.id,
        url: youTubeLink,
        type: block.type,
        order: block.order,
      }
      await addYTVideo({ data: dataToSend, schoolName })
        .unwrap()
        .then(data => {
          setIsLoadingVideo(false)
          updateLessonsBlocksArray(block.id, dataToSend)
        })
        .catch(() => setYTVideoError('Введите правильный URL'))
    }
  }

  const updateLessonsBlocksArray = (id: number, newValue: IBlockCode | IBlockDesc | IBlockPic | IBlockVid) => {
    if (lessonBlocks && setLessonBlocks) {
      const updatedBlocks = lessonBlocks.map(item => {
        if (item.id === id) {
          return newValue
        }
        return item
      })
      setLessonBlocks(updatedBlocks)
    }
  }

  const onDropHandler = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault()
    const videoFiles = [...e.dataTransfer.files]

    setFiles(prev => [...prev, ...videoFiles])
    setDragVideo(false)
  }

  const handleVideoUpload = async (lessonIdAndType: any, video: File) => {
    setVideoError('')

    if (video.size <= 4000 * 1024 * 1024) {
      setIsLoadingVideo(true)
      const formData = new FormData()
      formData.append('video', video)
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))

      const xhr = new XMLHttpRequest()
      xhr.open('PATCH', `/video/${schoolName}/block_video/${Number(block?.id)}/`, true)
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setProgress(percent)
        }
      })

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.response)
          updateLessonsBlocksArray(response.id, response)
          setIsLoadingVideo(false)
        } else {
          setIsLoadingVideo(false)
        }
      }

      xhr.onerror = () => {
        console.error('Error sending request:', xhr.status, xhr.statusText)
        setIsLoadingVideo(false)
      }

      xhr.send(formData)
    } else {
      setVideoError('Превышен допустимый размер файла')
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.1,
        borderRadius: '7px',
      }}
      key={block && block.id}
    >
      {!isPreview && (!lesson.video || !lesson.url) ? (
        <div className={styles.redactorCourse_wrapper}>
          {isLoadingVideo ? (
            <div className={styles.redactorCourse_loader}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <ThemeProvider theme={theme}>
                    <CircularProgress variant="determinate" value={progress} sx={{ bgcolor: 'violet.light', width: 40, height: 20 }} />
                  </ThemeProvider>
                  <Box
                    sx={{
                      top: '55%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" component="div" color="text.secondary">{`${progress}%`}</Typography>
                  </Box>
                </Box>
              </div>
              <p style={{ fontSize: '13px', color: 'grey', textAlign: 'center', marginBlockStart: '10px' }}>
                Пока видео грузится, ничего не нажимайте в этом окне. Скорость загрузки зависит от скорости вашего интернет-соединения.
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
                    <p>(размер файла не должен превышать 4 ГБ)</p>
                    {videoError && <p className={styles.redactorCourse_rightSide_functional_addContent_error}>{videoError}</p>}
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
                  <>
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
                    {ytVideoError && <p className={styles.redactorCourse_rightSide_functional_addContent_error}>{ytVideoError}</p>}
                  </>
                )}
              </div>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
                <span className={styles.redactorCourse_rightSide_functional_addContent_navBlock_grabBtn} onPointerDown={onPointerDown}>
                  <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
                </span>
                <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={handleDeleteVid}>
                  {isLoading ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
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
    </Reorder.Item>
  )
}
