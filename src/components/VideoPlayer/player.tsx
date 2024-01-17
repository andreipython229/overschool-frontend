import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './videoPlayer.module.scss'
import ReactPlayer from 'react-player'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from 'Pages/School/config/svgIconsPath'
import { arrDownIcon } from 'Pages/StudentCourse/constants/svgIcon'
import { addVideoIconPath } from 'components/AddVideo/config/svgIconsPath'
import { sendIconPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { IBlockCode, IBlockDesc, IBlockPic, IBlockVid } from 'types/sectionT'
import { useDeleteBlockMutation } from 'api/blocksService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

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
}

export const VideoPlayer: React.FC<playerProps> = ({ videoSrc, videoSrc2, isEditing, block, isDeleted, lessonId, lessonBlocks, setLessonBlocks }) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>()
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
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

  return (
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
          height="30rem"
          style={{ minWidth: '100%', minHeight: '30rem', borderRadius: '2em' }}
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
      {currentVideoSrc && isEditing && (
        <div style={{ display: 'flex', paddingLeft: '10px' }}>
          {videoSrc && (
            <a href={videoSrc} rel={'noreferrer'} target={'_blank'} download={'videoDownload'}>
              <div className={styles.videoPlayer_btnDownload}>
                <p style={{ marginRight: '0.2em', color: 'grey', fontWeight: '600' }}>Скачать видео</p>
                <IconSvg width={12} height={12} viewBoxSize="10 10 64 64" path={addVideoIconPath} />
              </div>
            </a>
          )}
          <button className={styles.videoPlayer_btnDelete} onClick={handleDeleteVid}>
            {isLoading ? (
              <SimpleLoader />
            ) : (
              <>
                <p style={{ marginRight: '0.2em', color: 'grey', fontWeight: '600' }}>Удалить {videoSrc && videoSrc2 && 'выбранное'} видео</p>
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
