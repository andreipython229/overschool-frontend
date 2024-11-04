import { FC, useState, ChangeEvent } from 'react'

import { Input } from '../../common/Input/Input/Input'
import { Button } from '../../common/Button/Button'
import { ScoresFilterT } from '../../../types/componentsTypes'
import { useBoolean } from 'customHooks/index'

import styles from './scores_filter.module.scss'

export const ScoresFilter: FC<ScoresFilterT> = ({ title, addMarkFilter, endMark, startMark }) => {
  const [isFilterClosed, { off }] = useBoolean()

  const [scoresStart, setScoresStart] = useState<string>(`${startMark}`)
  const [scoresEnd, setScoresEnd] = useState<string>(`${endMark}`)

  const handleInputScores = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'start') {
      setScoresStart(event.target.value)
    } else {
      setScoresEnd(event.target.value)
    }
  }

  const handleAddFilters = () => {
    const startMark = scoresStart === 'undefined' ? '' : scoresStart
    const endMark = scoresEnd === 'undefined' ? '' : scoresEnd

    addMarkFilter && addMarkFilter(startMark, endMark)
    off()
  }

  if (isFilterClosed) return null

  const isBtnDisabled = +scoresStart < 0 || +scoresEnd < 0

  return (
    <div className={styles.scores_container}>
      <h5>{title}</h5>
      <div className={styles.input_container}>
        <Input name="start" type="number" value={scoresStart} onChange={handleInputScores} min={0} max={10} placeholder="От"/>
          <Input name="end" type="number" value={scoresEnd} onChange={handleInputScores} min={1} max={10} className={styles.input} placeholder="До"/>
      </div>
      <Button className={styles.scores_btn} variant={isBtnDisabled ? 'disabled' : 'primary'} text="Применить" onClick={handleAddFilters} />
    </div>
  )
}
