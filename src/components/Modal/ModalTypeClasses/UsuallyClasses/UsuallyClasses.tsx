import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { basicModalHeaderIconPath } from '../config/svgIconsPath'
import { SettingClassesPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../../Modal.module.scss'

export const SettingClassesUsually: FC<SettingClassesPropsT> = ({ setLessonIdAndType, modulesList, setType, setModulesList }) => {
  const { nameLesson, isLoading, setNameLesson, handleCreateLesson } = useCreateLesson({
    setType,
    modulesList,
    typeLesson: 'lessons',
    setLessonIdAndType,
    setModulesList
  })

  const changeNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const closedAll = () => {
    setType(null as keyof object)
  }
  const goToBack = () => {
    setType('lessonsModal' as keyof object)
  }

  return (
    <form onSubmit={handleCreateLesson} className={styles.classesContainer}>
      <div onClick={closedAll} className={styles.classesContainer_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.usually_header}>
        <IconSvg width={60} height={53} viewBoxSize="0 0 60 53" path={basicModalHeaderIconPath} />
        <span>Настройте занятие</span>
      </div>

      <div className={styles.usually_input}>
        <span className={styles.usually_title}>Название занятие:</span>
        <Input
          placeholder={'Название занятия'}
          name={'name classes'}
          onChange={changeNameClasses}
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
}
