import { Button } from 'components/common/Button'
import styles from './studentTestPreview.module.scss'

export const StudentTestPreview = () => {
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.wrapper_title}>Тестирование для оценки усвоения материала материала :) Удачи! )</h5>
      <Button text={'Приступить к тесту'} variant="primary" />
    </div>
  )
}
