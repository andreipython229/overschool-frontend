import { useState, useEffect, useRef } from 'react'
import styles from './Game.module.scss'
import UpdateIcon from '@mui/icons-material/Update'

export const Game = () => {
  const [isStart, setIsStart] = useState<boolean>(false)
  const [jumping, setJumping] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [playerStyle, setPlayerStyle] = useState(styles.game_player)
  const [obstacleStyle, setObstacleStyle] = useState(styles.game_obstacle)
  const [containerStyle, setContainerStyle] = useState(styles.game)
  const [restartStyle, setRestartStyle] = useState(styles.game_restart)

  const playerRef = useRef<HTMLDivElement>(null)
  const obstacleRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const restartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === ' ' || event.key === 'ArrowUp') {
        jump()
      }
    })
  }, [])

  const start = () => {
    setIsStart(true)
    const scoreInterval = setInterval(() => {
      if (isCollision()) {
        if (restartRef.current) setRestartStyle(`${styles.game_restart} ${styles.show}`)
        if (containerRef.current) setContainerStyle(`${styles.game} ${styles.stop}`)
        if (playerRef.current) setPlayerStyle(styles.game_player)
        return () => clearInterval(scoreInterval)
      }
      setScore(score => score + 1)
      if (obstacleRef.current) setObstacleStyle(`${styles.game_obstacle} ${styles.move}`)
    }, 1000)
    return () => clearInterval(scoreInterval)
  }

  const jump = () => {
    if (jumping) {
      return
    }

    setJumping(true)
    if (playerRef.current) setPlayerStyle(`${styles.game_player} ${styles.jump}`)
    setTimeout(() => {
      if (playerRef.current) setPlayerStyle(styles.game_player)
      setJumping(false)
    }, 1200)
  }

  const isCollision = () => {
    if (playerRef.current && obstacleRef.current) {
      const playerClientRect = playerRef.current.getBoundingClientRect()
      const playerL = playerClientRect.left
      const playerR = playerClientRect.right
      const playerB = playerClientRect.bottom

      const obstacleClientRect = obstacleRef.current.getBoundingClientRect()
      const obstacleL = obstacleClientRect.left
      const obstacleR = obstacleClientRect.right
      const obstacleT = obstacleClientRect.top

      const xCollision = obstacleR > playerL && obstacleL < playerR
      const yCollision = playerB > obstacleT

      return xCollision && yCollision
    }
  }

  const restart = (): void => {
    setScore(0)
    if (restartRef.current) setRestartStyle(styles.game_restart)
    if (containerRef.current) setContainerStyle(styles.game)
    if (playerRef.current) setPlayerStyle(styles.game_player)
    if (obstacleRef.current) setObstacleStyle(styles.game_obstacle)
  }

  return (
    <div className={containerStyle} ref={containerRef}>
      <div className={styles.game_score}>
        <span>Очки: {score}</span>
      </div>
      {!isStart ? (
        <button onClick={start} className={styles.game_start}>
          Начать
        </button>
      ) : null}
      <div className={playerStyle} ref={playerRef} onClick={jump}></div>
      <div className={obstacleStyle} ref={obstacleRef}></div>
      <div className={restartStyle} ref={restartRef}>
        <div className={styles.game_restart_content}>
          <span className={styles.game_restart_text}>КОНЕЦ ИГРЫ &nbsp;</span>
          <UpdateIcon onClick={restart} fontSize="large" sx={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  )
}
