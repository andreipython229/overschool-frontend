import React, { FC, memo, useState } from 'react'
import { Input } from '../../common/Input/Input/Input'
import { Button } from '../../common/Button/Button'

import styles from './scores_filter.module.scss'

type ScoresFilterT = {
  title: string
}

export const ScoresFilter: FC<ScoresFilterT> = memo(({ title }) => {
  const [scoresStart, setScoresStart] = useState<string>('')
  const [scoresEnd, setScoresEnd] = useState<string>('')

  const handleInputScores = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'start') {
      setScoresStart(event.target.value)
    } else {
      setScoresEnd(event.target.value)
    }
  }

  return (
    <div className={styles.scores_container}>
      <h5>{title}</h5>
      <div className={styles.input_container}>
        <p>от</p>
        <Input name="start" type="text" value={scoresStart} onChange={handleInputScores} />
        <p>до</p>
        <Input name="end" type="text" value={scoresEnd} onChange={handleInputScores} />
      </div>
      <Button className={styles.scores_btn} variant="primary" text="Применить" onClick={() => console.log(scoresStart, scoresEnd)} />
    </div>
  )
})
