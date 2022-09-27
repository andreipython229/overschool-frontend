import React, { FC } from 'react'
import { AudioPlayerT } from '../commonComponentsTypes'

export const AudioPlayer: FC<AudioPlayerT> = ({ audioUrl, title = 'Listen to the T-Rex:' }) => {
  return (
    <figure style={{ width: '900px' }}>
      <figcaption style={{ textAlign: 'center' }}>{title}</figcaption>
      <audio style={{ width: '100%' }} controls src={audioUrl}>
        <a href={audioUrl}>Download audio</a>
      </audio>
    </figure>
  )
}
