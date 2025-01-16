import React, { Dispatch, SetStateAction, useEffect, useState, PointerEvent, useRef } from 'react'
import styles from './videoPlayer.module.scss'
import ReactPlayer from 'react-player'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { downloadIconPath } from 'components/AddVideo/config/svgIconsPath'
import { IBlockCode, IBlockDesc, IBlockPic, IBlockVid } from 'types/sectionT'
import { useDeleteBlockMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { deletePath } from 'config/commonSvgIconsPath'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { Reorder, useDragControls } from 'framer-motion'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from '../../enum/roleE'
import previewImage from './assets/previewImage.png'
import { PlayIcon } from 'components/NewAudioPlayer/icons'
import { DoBlockIconPath } from 'Pages/School/config/svgIconsPath'
import { Button } from 'components/common/Button/Button'

type playerProps = {
  deleteBlock?: (arg: { id: string | number; schoolName: string }) => any
  setLessonBlocks?: Dispatch<SetStateAction<(IBlockCode | IBlockDesc | IBlockPic | IBlockVid)[]>>
  lessonBlocks?: (IBlockCode | IBlockDesc | IBlockPic | IBlockVid)[]
  lessonId: number
  videoSrc: string | undefined
  videoSrc2?: string
  isEditing?: boolean
  handleDeleteVideo?: (video: string | undefined) => Promise<void>
  isDeleted?: boolean
  block?: IBlockVid
  download?: boolean
}

export const VideoPlayer: React.FC<playerProps> = ({
  videoSrc,
  videoSrc2,
  isEditing,
  block,
  isDeleted,
  lessonId,
  lessonBlocks,
  setLessonBlocks,
  download,
}) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>()
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const controls = useDragControls()
  const schoolName = window.location.href.split('/')[4]
  const { role } = useAppSelector(selectUser)
  const videoPreviewRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    setCurrentVideoSrc('')
    if (videoSrc) {
      setCurrentVideoSrc(videoSrc)
    }
  }, [lessonId])

  const handleToggle = () => {
    if (videoSrc && videoSrc2) {
      setCurrentVideoSrc(currentVideoSrc === videoSrc ? videoSrc2 : videoSrc)
    }
  }

  useEffect(() => {
    if (isDeleted) {
      if (videoSrc && currentVideoSrc === videoSrc2) {
        setCurrentVideoSrc(videoSrc)
      }
      if (videoSrc2 && currentVideoSrc === videoSrc) {
        setCurrentVideoSrc(videoSrc2)
      }
      if (videoSrc && !videoSrc2 && currentVideoSrc === videoSrc) {
        setCurrentVideoSrc('')
      }
      if (videoSrc2 && !videoSrc && currentVideoSrc === videoSrc2) {
        setCurrentVideoSrc('')
      }
    }
  }, [isDeleted])

  useEffect(() => {
    if (videoPreviewRef.current) {
      videoPreviewRef.current.classList.add(styles['react-player__preview'])
    }
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

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
      style={
        isEditing
          ? { display: 'flex', flexDirection: 'column', gap: '1em', boxShadow: '0px 0px 8px 0px #3241954d', borderRadius: '20px', padding: '1rem' }
          : { display: 'flex', flexDirection: 'column', gap: '1em' }
      }
    >
      {currentVideoSrc && isEditing && (
        <div className={styles.functionalBtns}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className={styles.functionalBtns_grabBtn} onPointerDown={onPointerDown}>
              <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={DoBlockIconPath} />
            </span>
            <a href={videoSrc} rel={'noreferrer'} target={'_blank'} download={'videoDownload'}>
              <Button variant="newPrimary" text={'Скачать'} style={{ padding: '7px 25px', fontSize: '16px', fontWeight: 500 }} />
            </a>
          </div>
          <Button
            variant="cancel"
            className={styles.functionalBtns_delete}
            text={isLoading ? <SimpleLoader /> : 'Удалить'}
            onClick={handleDeleteVid}
          />
        </div>
      )}
      <div className={styles.videoPlayer} onContextMenu={event => role === RoleE.Student && !download && event.preventDefault()}>
        {currentVideoSrc && videoSrc && videoSrc2 && (
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={currentVideoSrc}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList textColor="secondary" indicatorColor="secondary" onChange={handleToggle} aria-label="player">
                  <Tab label="Наш плеер" value={videoSrc} />
                  <Tab label="YouTube плеер" value={videoSrc2} />
                </TabList>
              </Box>
            </TabContext>
          </Box>
        )}
        {currentVideoSrc ? (
          <div className={styles.playerWrapper}>
            <ReactPlayer
              url={currentVideoSrc}
              width="100%"
              height="100%"
              light={previewImage}
              playIcon={<PlayIcon width={124} height={124} />}
              style={{
                borderRadius: '1.5rem',
                boxShadow: '0px 0px 9.3px 4px rgba(53, 126, 235, 0.45)',
              }}
              // style={{ minWidth: '100%', minHeight: '30rem' }}
              controls={true}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Reorder.Item>
  )
}
