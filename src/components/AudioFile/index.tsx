import { FC } from 'react'

export type AudioPlayerT = {
  audioUrl: string
  styles?: { [key: string]: string | number }
  deleteAudio?: (id: number) => void
}

export const AudioFile: FC<AudioPlayerT> = ({ styles, audioUrl, deleteAudio }) => {
  return (
    <figure style={{ ...styles, width: '100%' }}>
      {deleteAudio && <span>Удалить</span>}
      <audio style={{ width: '100%' }} controls src={audioUrl}>
        <a href={audioUrl}>Download audio</a>
      </audio>
    </figure>
  )
}
