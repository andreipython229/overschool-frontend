import React, { FC } from 'react'
import { AudioPlayerT } from '../../../types/commonComponentsTypes'

export const AudioPlayer: FC<AudioPlayerT> = ({ styles, audioUrl, title = 'Listen to the T-Rex:' }) => {
  return (
    <figure style={{ ...styles, width: '100%' }}>
      <figcaption style={{ textAlign: 'center' }}>{title}</figcaption>
      <audio style={{ width: '100%' }} controls src={audioUrl}>
        <a href={audioUrl}>Download audio</a>
      </audio>
    </figure>
  )
}
