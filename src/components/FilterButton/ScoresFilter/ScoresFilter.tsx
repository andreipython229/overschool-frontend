import React, { FC } from 'react'
import { Input } from '../../common/Input/Input/Input'
import { Button } from '../../common/Button/Button'

import styles from './scores_filter.module.scss'

type ScoresFilterT = {
  scoresStart: string
  scoresEnd: string
  setScoresStart: (event: string) => void
  setScoresEnd: (event: string) => void
  handleApplyFilter: () => void
}

export const ScoresFilter: FC<ScoresFilterT> = ({
  scoresStart,
  scoresEnd,
  setScoresStart,
  setScoresEnd,
  handleApplyFilter,
}) => {
  const handleInputScores = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'start') {
      setScoresStart(event.target.value)
    } else {
      setScoresEnd(event.target.value)
    }
  }

  return (
    <div className={styles.scores_container}>
      <h5>ВЫБЕРИТЕ ДИАПАЗОН БАЛЛОВ</h5>
      <div className={styles.input_container}>
        <p>от</p>
        <Input name="start" type="text" value={scoresStart} onChange={handleInputScores} />
        <p>до</p>
        <Input name="end" type="text" value={scoresEnd} onChange={handleInputScores} />
      </div>
      <Button variant="primary" text="Применить" onClick={handleApplyFilter} />
    </div>
  )
}
