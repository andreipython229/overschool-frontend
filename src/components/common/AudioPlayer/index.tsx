import React, { FC } from 'react'
import { AudioPlayerT } from '../../../types/commonComponentsTypes'

export const AudioPlayer: FC<AudioPlayerT> = ({ styles, audioUrls, title = 'Listen to the T-Rex:' }) => {
  return (
    <>
      {audioUrls?.map(({ file }, index) => (
        <figure key={index} style={{ ...styles, width: '100%' }}>
          <figcaption style={{ textAlign: 'center' }}>{title}</figcaption>
          <audio style={{ width: '100%' }} controls src={file}>
            <a href={file}>Download audio</a>
          </audio>
        </figure>
      ))}
    </>
  )
}
