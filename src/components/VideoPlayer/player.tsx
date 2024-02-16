import React, { Dispatch, SetStateAction, useEffect, useState, PointerEvent } from 'react'
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

type playerProps = {
  deleteBlock?: (arg: { id: string | number; schoolName: string }) => any
  setLessonBlocks?: Dispatch<SetStateAction<(IBlockCode | IBlockDesc | IBlockPic | IBlockVid)[]>>
  lessonBlocks?: (IBlockCode | IBlockDesc | IBlockPic | IBlockVid )[]
  lessonId: number
  videoSrc: string | undefined
  videoSrc2?: string
  isEditing?: boolean
  handleDeleteVideo?: (video: string | undefined) => Promise<void>
  isDeleted?: boolean
  block?: IBlockVid
}

export const VideoPlayer: React.FC<playerProps> = ({ videoSrc, videoSrc2, isEditing, block, isDeleted, lessonId, lessonBlocks, setLessonBlocks }) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>()
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const controls = useDragControls()
  const schoolName = window.location.href.split('/')[4]

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
      style={{ display: 'flex', gap: '1em' }}
    >
      <div className={styles.videoPlayer}>
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
          <ReactPlayer
            url={currentVideoSrc}
            width="100%"
            height='min-content'
            style={{ minWidth: '100%', minHeight: '30rem' }}
            controls
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {currentVideoSrc && isEditing && (
        <div className={styles.functionalBtns}>
          <a href={videoSrc} rel={'noreferrer'} target={'_blank'} download={'videoDownload'}>
            <div className={styles.functionalBtns_downloadBtn}>
              <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={downloadIconPath} />
            </div>
          </a>
          <span className={styles.functionalBtns_grabBtn} onPointerDown={onPointerDown}>
            <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
          </span>
          <div className={styles.functionalBtns_delete} onClick={handleDeleteVid}>
            {isLoading ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
          </div>
        </div>
      )}
    </Reorder.Item>
  )
}
