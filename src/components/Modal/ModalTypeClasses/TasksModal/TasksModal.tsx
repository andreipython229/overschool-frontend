import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { SelectInput } from '../../../common/SelectInput/SelectInput'
import { Button } from '../../../common/Button/Button'
import { arrNumber, arrTime } from '../../../../constants'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { TasksModalPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks/useCreateLesson'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../Modal.module.scss'
import { timeMaper } from '../../../../constants/timeMaper'
import { TasksModalIcon } from '../constants/tasksModalIcon'
import { PenIcon } from 'Pages/Settings/Main/iconComponents'

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
    <form onSubmit={handleCreateLesson} className={styles.classesContainer} style={{ maxWidth: '600px', width: '100%' }}>
      <div onClick={handleCloseAllModal} className={styles.classesContainer_closed}>
        <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.tasks}>
        <TasksModalIcon width={140} height={140} />
        <span className={styles.classesContainer_title}>Настройте задание</span>
      </div>

      <div className={styles.usually_input}>
        <Input
          placeholder={'Введите название домашнего задания'}
          name={'name classes'}
          onChange={handleNameClasses}
          type={'text'}
          value={nameLesson}
          style={{ marginBottom: '24px' }}
        >
        <PenIcon />
        </Input>
      </div>

      <div className={styles.classesContainer_type_btnBlock} style={{marginTop: 0}}>
        <Button
            style={{padding: '14px'}}
            variant={'cancel'}
            onClick={goToBack}
            text={'Назад'}
          />
        <Button
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить задание'}
          variant={isLoading ? 'inActive' : 'newPrimary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
})
