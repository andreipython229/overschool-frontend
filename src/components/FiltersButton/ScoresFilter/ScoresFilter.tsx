import { FC, memo, useState, ChangeEvent } from 'react'

import { Input } from '../../common/Input/Input/Input'
import { Button } from '../../common/Button/Button'
import { ScoresFilterT } from '../../../types/componentsTypes'
import { useBoolean } from 'customHooks/index'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { filtersSelector } from 'selectors/index'
import { addFilters } from 'store/redux/filters/slice'

import styles from './scores_filter.module.scss'

export const ScoresFilter: FC<ScoresFilterT> = memo(({ title }) => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(filtersSelector)
  const [isFilterClosed, { off }] = useBoolean()

  const [scoresStart, setScoresStart] = useState<string>(`${filters.start_mark}`)
  const [scoresEnd, setScoresEnd] = useState<string>(`${filters.end_mark}`)

  const handleInputScores = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'start') {
      setScoresStart(event.target.value)
    } else {
      setScoresEnd(event.target.value)
    }
  }

  const handleAddFilters = () => {
    dispatch(addFilters({ start_mark: scoresStart, end_mark: scoresEnd }))
    off()
  }

  if (isFilterClosed) return null

  const isBtnDisabled = +scoresStart < 0 || +scoresEnd < 0

  return (
    <div className={styles.scores_container}>
      <h5>{title}</h5>
      <div className={styles.input_container}>
        <p>от</p>
        <Input name="start" type="number" value={scoresStart} onChange={handleInputScores} min={0} max={10} />
        <p>до</p>
        <Input name="end" type="number" value={scoresEnd} onChange={handleInputScores} min={1} max={10} />
      </div>
      <Button className={styles.scores_btn} variant={isBtnDisabled ? 'disabled' : 'primary'} text="Применить" onClick={handleAddFilters} />
    </div>
  )
})
