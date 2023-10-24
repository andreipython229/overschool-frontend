import React, { useEffect, useState } from 'react'
import './videoPlayer.scss'
import ReactPlayer from 'react-player'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath } from 'Pages/School/config/svgIconsPath'

type playerProps = {
  videoSrc: string | undefined
  videoSrc2?: string
  isEditing?: boolean
  handleDeleteVideo?: (video: string | undefined) => Promise<void>
  isDeleted?: boolean
}

export const VideoPlayer: React.FC<playerProps> = ({ videoSrc, videoSrc2, isEditing, handleDeleteVideo, isDeleted }) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc)

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
    <div className="video-player">
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
          width={'100%'}
          style={{ minHeight: '500px' }}
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
      {currentVideoSrc && isEditing && handleDeleteVideo && (
        <button className="video-player_btnDelete" onClick={() => handleDeleteVideo(currentVideoSrc)}>
          <p style={{ marginRight: '0.2em', color: 'grey', fontWeight: '600' }}>Удалить {videoSrc && videoSrc2 && 'выбранное'} видео</p>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
        </button>
      )}
    </div>
  )
}
