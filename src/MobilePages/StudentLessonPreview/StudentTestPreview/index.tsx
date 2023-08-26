import { Button } from 'components/common/Button/Button'
import styles from './studentTestPreview.module.scss'
import { FC } from 'react'

import { setShowType } from '../../../../src/types/componentsTypes'

export const StudentTestPreview: FC<setShowType> = ({ setShow }) => {
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.wrapper_title}>Тестирование для оценки усвоения материала материала :) Удачи! )</h5>
      <Button text={'Приступить к тесту'} variant="primary" onClick={setShow} />
    </div>
  )
}
