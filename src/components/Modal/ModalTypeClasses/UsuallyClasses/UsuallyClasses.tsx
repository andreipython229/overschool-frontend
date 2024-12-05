import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { UsuallyClassesIcon } from '../constants/usuallyClassesIcon'
import { SettingClassesPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../../Modal.module.scss'
import { PenIcon } from 'Pages/Settings/Main/iconComponents'

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
    <form onSubmit={handleCreateLesson} className={styles.classesContainer} style={{ maxWidth: '600px', width: '100%' }}>
      <div onClick={closedAll} className={styles.classesContainer_closed}>
        <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.usually_header}>
        <UsuallyClassesIcon width={140} height={140}/>
        <span className={styles.classesContainer_title}>Настройте занятие</span>
      </div>

      <div className={styles.usually_input}>
        <Input
          placeholder={'Введите название занятия'}
          name={'name classes'}
          onChange={changeNameClasses}
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
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить занятие'}
          variant={isLoading ? 'inActive' : 'newPrimary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
