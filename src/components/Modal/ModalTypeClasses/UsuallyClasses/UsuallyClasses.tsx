import { ChangeEvent, FC, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { basicModalHeaderIconPath } from '../config/svgIconsPath'
import { SettingClassesPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks/useCreateLesson'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../../Modal.module.scss'

export const SettingClassesUsually: FC<SettingClassesPropsT> = ({ setLessonIdAndType, modulesList, setType }) => {
  const { nameLesson, balls, isLoading, setNameLesson, setBalls, handleCreateLesson } = useCreateLesson({
    setType,
    modulesList,
    typeLesson: 'lessons',
    setLessonIdAndType,
  })

  const [settingsActive, setSettingsActive] = useState<number>(0)

  const changeNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const changeBallsClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setBalls(+event.target.value)
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

      <div className={styles.navBtn}>
        <span
          onClick={() => setSettingsActive(0)}
          className={settingsActive === 0 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
        >
          Основные
        </span>
        <span
          onClick={() => setSettingsActive(1)}
          className={settingsActive === 1 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
        >
          Баллы за прохождение
        </span>
      </div>
      {settingsActive === 0 ? (
        <div className={styles.usually_input}>
          <span className={styles.usually_title}>Название занятие:</span>
          <Input placeholder={'Основы языка HTML'} name={'name classes'} onChange={changeNameClasses} type={'text'} value={nameLesson} />
        </div>
      ) : (
        <div>
          <span className={styles.usually_title}>Сколько баллов будет выдано ученику по завершению занятия:</span>
          <div className={styles.usually_grade}>
            <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} value={balls} onChange={changeBallsClasses} />
            <span>баллов</span>
          </div>
        </div>
      )}

      <div className={styles.btnBlock}>
        <Button
          onClick={goToBack}
          text={'Назад'}
          style={{ width: '85px', height: '100%', marginRight: '10px', padding: '17px', fontSize: '18px', fontWeight: '400', borderRadius: '10px' }}
        />
        <Button
          style={{ minWidth: '186px' }}
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить занятие'}
          variant={isLoading ? 'disabled' : 'primary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
