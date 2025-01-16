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
import { useDropzone } from 'react-dropzone'
import { DoBlockIconPath } from 'Pages/School/config/svgIconsPath'

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
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: video => {
      setVideoError('')

      if (video[0].size <= 4000 * 1024 * 1024) {
        setIsLoadingVideo(true)
        const formData = new FormData()
        formData.append('video', video[0])
        formData.append('section', String(lesson.section))
        formData.append('order', String(lesson.order))
        handleStartUpload(formData)
      } else {
        setVideoError('Превышен допустимый размер файла')
      }
    },
  })

  const [videoError, setVideoError] = useState<string>('')

  const [progress, setProgress] = useState<number>(0)
  const [xhr, setXhr] = useState<XMLHttpRequest | null>(null)

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

  const handleStartUpload = (formData: FormData) => {
    const newXhr = new XMLHttpRequest()
    setXhr(newXhr)

    newXhr.open('PATCH', `/video/${schoolName}/block_video/${Number(block?.id)}/`, true)
    newXhr.setRequestHeader('Authorization', `Bearer ${token}`)
    newXhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        setProgress(percent)
      }
    })

    newXhr.onload = () => {
      if (newXhr.status === 200) {
        const response = JSON.parse(newXhr.response)
        updateLessonsBlocksArray(response.id, response)
        setIsLoadingVideo(false)
      } else {
        setIsLoadingVideo(false)
      }
    }

    newXhr.onerror = () => {
      console.error('Error sending request:', newXhr.status, newXhr.statusText)
      setIsLoadingVideo(false)
    }

    newXhr.send(formData)
  }

  const handleVideoUpload = async (lessonIdAndType: any, video: File) => {
    setVideoError('')

    if (video.size <= 4000 * 1024 * 1024) {
      setIsLoadingVideo(true)
      const formData = new FormData()
      formData.append('video', video)
      formData.append('section', String(lesson.section))
      formData.append('order', String(lesson.order))

      handleStartUpload(formData)
    } else {
      setVideoError('Превышен допустимый размер файла')
    }
  }

  const handleCancelUpload = () => {
    if (xhr) {
      xhr.abort()
      setIsLoadingVideo(false)
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
              <Button text={'Отменить загрузку'} variant="delete" onClick={handleCancelUpload} />
            </div>
          ) : (
            <>
              <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
                <span className={styles.redactorCourse_rightSide_functional_addContent_navBlock_grabBtn} onPointerDown={onPointerDown}>
                  <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={DoBlockIconPath} />
                </span>
                <Button
                  variant="cancel"
                  className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete}
                  text={isLoading ? <SimpleLoader /> : 'Удалить'}
                  onClick={handleDeleteVid}
                />
              </div>
              <div className={styles.videoHandlerWrapper}>
                {!lesson.video && (
                  <div
                    onDragStart={dragStartHandler}
                    onDragLeave={dragEndHandler}
                    onDragOver={dragStartHandler}
                    onDrop={onDropHandler}
                    className={dragVideo ? stylesOnDrop : stylesNoDrop}
                    {...getRootProps()}
                  >
                    <input
                      // disabled={isLoading}
                      className={styles.redactorCourse_rightSide_functional_addContent_input}
                      onChange={e => handleVideoUpload(lessonIdAndType, e.target.files![0])}
                      type="file"
                      multiple
                      {...getInputProps()}
                    />
                    <IconSvg width={59} height={58} viewBoxSize="0 0 59 58">
                      <path
                        d="M46.5853 47.9C46.1261 47.9 45.6669 47.7307 45.3044 47.3682C44.6036 46.6674 44.6036 45.5074 45.3044 44.8066C54.0286 36.0824 54.0286 21.8967 45.3044 13.1967C44.6036 12.4958 44.6036 11.3358 45.3044 10.635C46.0053 9.93417 47.1653 9.93417 47.8661 10.635C57.9919 20.7608 57.9919 37.2424 47.8661 47.3682C47.5036 47.7307 47.0444 47.9 46.5853 47.9Z"
                        fill="#357EEB"
                      />
                      <path
                        d="M12.4138 47.9C11.9546 47.9 11.4954 47.7307 11.1329 47.3682C1.00712 37.2424 1.00712 20.7608 11.1329 10.635C11.8338 9.93417 12.9938 9.93417 13.6946 10.635C14.3954 11.3358 14.3954 12.4958 13.6946 13.1967C4.97044 21.9208 4.97044 36.1066 13.6946 44.8066C14.3954 45.5074 14.3954 46.6674 13.6946 47.3682C13.3321 47.7307 12.8729 47.9 12.4138 47.9Z"
                        fill="#357EEB"
                      />
                      <path
                        d="M29.4995 54.8852C26.4787 54.861 23.6029 54.3776 20.9204 53.4351C19.9779 53.0968 19.4703 52.0577 19.8087 51.1152C20.147 50.1727 21.162 49.6652 22.1287 50.0035C24.4487 50.801 26.9137 51.236 29.5237 51.236C32.1095 51.236 34.5987 50.801 36.8945 50.0035C37.837 49.6893 38.8762 50.1727 39.2145 51.1152C39.5528 52.0577 39.0453 53.0968 38.1028 53.4351C35.3962 54.3776 32.5204 54.8852 29.4995 54.8852Z"
                        fill="#357EEB"
                      />
                      <path
                        d="M37.4747 8.07147C37.2814 8.07147 37.0639 8.04721 36.8705 7.97471C34.5505 7.17721 32.0614 6.74219 29.4755 6.74219C26.8897 6.74219 24.4247 7.17721 22.1047 7.97471C21.1622 8.28888 20.1231 7.80564 19.7847 6.86314C19.4464 5.92064 19.9539 4.88142 20.8964 4.54309C23.5789 3.60059 26.4789 3.11719 29.4755 3.11719C32.4722 3.11719 35.3722 3.60059 38.0547 4.54309C38.9972 4.88142 39.5047 5.92064 39.1664 6.86314C38.9247 7.61231 38.2239 8.07147 37.4747 8.07147Z"
                        fill="#357EEB"
                      />
                      <path
                        d="M26.0204 40.5061C24.9571 40.5061 23.9421 40.2402 23.0479 39.7327C20.9696 38.5244 19.8096 36.156 19.8096 33.0627V24.9669C19.8096 21.8736 20.9454 19.5052 23.0479 18.2969C25.1262 17.0886 27.7605 17.2818 30.443 18.8285L37.4513 22.8644C40.1338 24.4111 41.608 26.5861 41.608 29.0027C41.608 31.4194 40.1338 33.5943 37.4513 35.141L30.443 39.1769C28.9205 40.0711 27.3979 40.5061 26.0204 40.5061ZM26.0204 21.1244C25.5854 21.1244 25.1746 21.221 24.8604 21.4144C23.9662 21.946 23.4346 23.2269 23.4346 24.9427V33.0385C23.4346 34.7544 23.9421 36.0594 24.8604 36.5669C25.7546 37.0744 27.1321 36.881 28.6305 36.0352L35.6388 31.9994C37.1371 31.1294 37.983 30.0419 37.983 29.0027C37.983 27.9636 37.1371 26.8761 35.6388 26.0061L28.6305 21.9703C27.6638 21.4145 26.7696 21.1244 26.0204 21.1244Z"
                        fill="#357EEB"
                      />
                    </IconSvg>
                    <span>Перетащите .mp4 видеофайл или нажмите для загрузки</span>
                    <p>(размер файла не должен превышать 4 ГБ)</p>
                    {videoError && <p className={styles.redactorCourse_rightSide_functional_addContent_error}>{videoError}</p>}
                    <Button
                      type={'button'}
                      // disabled={isLoading}
                      variant={'newPrimary'}
                      text={'Выбрать файл'}
                    />
                  </div>
                )}
                {!lesson.video && !lesson.url && <p style={{ color: 'grey', padding: '0.5em' }}>или</p>}
                {!lesson.url && (
                  <>
                    <div className={styles.youtubeLink_input}>
                      <Input
                        variant="default"
                        name={'youtubeLink'}
                        value={youTubeLink}
                        type={'text'}
                        placeholder={'Вставьте ссылку на видео YouTube'}
                        onChange={handleChangeLink}
                      />
                      <Button
                        style={{ marginLeft: '0.5em', padding: '10px 30px', fontSize: '16px', fontWeight: 500 }}
                        type={'submit'}
                        variant="newPrimary"
                        text={'Добавить'}
                        onClick={handleYTVideo}
                      />
                    </div>
                    {ytVideoError && <p className={styles.redactorCourse_rightSide_functional_addContent_error}>{ytVideoError}</p>}
                  </>
                )}
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
