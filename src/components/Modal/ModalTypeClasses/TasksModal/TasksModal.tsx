import { ChangeEvent, FC, memo, useState } from 'react'

import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { SelectInput } from '../../../common/SelectInput/SelectInput'
import { Button } from '../../../common/Button/Button'
import { arrNumber, arrTime } from '../../../../constants'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { taskModalPath } from '../config/svgIconsPath'
import { TasksModalPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks/useCreateLesson'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../Modal.module.scss'
import { timeMaper } from '../../../../constants/timeMaper'

export const TasksModal: FC<TasksModalPropsT> = memo(({ setLessonIdAndType, modulesList, setType }) => {
  const [descriptionHomeWork, setDescriptionHomeWork] = useState<string>('')

  const { nameLesson, isLoading, setNameLesson, handleCreateLesson } = useCreateLesson({
    modulesList,
    setType,
    typeLesson: 'homeworks',
    description: descriptionHomeWork,
    setLessonIdAndType,
  })

  const handleNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const handleCloseAllModal = () => {
    setType(null as keyof object)
  }

  const goToBack = () => {
    setType('lessonsModal' as keyof object)
  }

  return (
    <form onSubmit={handleCreateLesson} className={styles.classesContainer}>
      <div onClick={handleCloseAllModal} className={styles.classesContainer_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.tasks}>
        <IconSvg width={58} height={58} viewBoxSize="0 0 58 58" path={taskModalPath} />
        <span className={styles.classesContainer_title}>Настройте задания</span>
      </div>

      <div style={{ marginTop: '15px' }} className={styles.usually_input}>
        <span className={styles.usually_title}>Название занятие:</span>
        <Input
          placeholder={'Основы языка HTML'}
          name={'name classes'}
          onChange={handleNameClasses}
          type={'text'}
          value={nameLesson}
          style={{ marginBottom: '25px' }}
        />
      </div>

      <div className={styles.btnBlock}>
        <Button onClick={goToBack} text={'Назад'} />
        <Button
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить занятие'}
          variant={isLoading ? 'disabled' : 'primary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
})
