import { PlayIcon, musicIconPath, mutedIconPath } from 'components/NewAudioPlayer/icons'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { FC, useEffect, useState } from 'react'
import useSound from 'use-sound'
import styles from './newAudioPlayer.module.scss'
import style from '../AddAudio/addaudio.module.scss'
import { IDeleteFunc } from 'types/commonComponentsTypes'
import { deletePath } from 'config/commonSvgIconsPath'
import { number } from 'yup'

interface INewPlayer {
  music: string
  delete?: (arg: IDeleteFunc) => void
  index?: number
}

export const NewAudioPlayer: FC<INewPlayer> = ({ music, delete: deleteFile, index }) => {
  const schoolName = window.location.href.split('/')[4]
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(100)
  const [muted, setMuted] = useState<boolean>(false)
  const [play, { pause, duration, sound }] = useSound(music, { volume: muted ? 0 : volume / 100 })
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  }) // общая продолжительность звука в минутах и секундах
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  }) // текущее положение звука в минутах и секундах
  const [seconds, setSeconds] = useState() // текущая позиция звука в секундах

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000
      const min = Math.floor(sec / 60)
      const secRemain = Math.floor(sec % 60)
      setTime({
        min: min,
        sec: secRemain,
      })
    }
  }, [isPlaying])

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])) // состояние с текущим значением в секундах
        const min = Math.floor(sound.seek([]) / 60)
        const sec = Math.floor(sound.seek([]) % 60)
        setCurrTime({
          min,
          sec,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound])

  const playingButton = () => {
    if (isPlaying) {
      pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }

  const handleDelete = async (index: number) => {
    deleteFile && (await deleteFile({ id: index, schoolName }))
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <div className={styles.playerWrapper}>
        {!isPlaying ? (
          <button className={styles.playerWrapper_playButton} onClick={playingButton}>
            <PlayIcon width={40} height={40} />
          </button>
        ) : (
          <button className={styles.playerWrapper_playButton} onClick={playingButton}>
            <PlayIcon width={40} height={40} />
          </button>
        )}
        <div className={styles.playerWrapper_time}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', minWidth: '80px', alignItems: 'center' }}>
            <p>
              {String(currTime.min)}:{String(currTime.sec).padStart(2, '0')}
            </p>
            /
            <p>
              {String(time.min)}:{String(time.sec).padStart(2, '0')}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={Number(duration) / 1000}
            defaultValue="0"
            value={seconds}
            className={styles.playerWrapper_time_timeline}
            onChange={e => {
              sound.seek([e.target.value])
            }}
          />
        </div>
        <button className={styles.playerWrapper_volumeButton} onClick={() => setMuted(!muted)}>
          <IconSvg
            height={20.053223}
            width={20.5137}
            path={muted ? mutedIconPath : musicIconPath}
            viewBoxSize={muted ? '0 0 23.1602 23.0156' : '0 0 20.5137 20.0532'}
          />
        </button>
        <input
          type="range"
          className={styles.playerWrapper_volumeLine}
          value={muted ? 0 : volume}
          max={100}
          min="0"
          onChange={e => {
            setMuted(false)
            setVolume(Number(e.target.value))
          }}
        />
      </div>
      {deleteFile && typeof index === 'number' && (
        <div className={style.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={() => handleDelete(index)}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
        </div>
      )}
    </div>
  )
}
