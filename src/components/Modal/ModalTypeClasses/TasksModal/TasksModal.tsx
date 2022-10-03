import { ChangeEvent, FC, memo, useState } from 'react'

import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { SelectInput } from '../../../common/SelectInput/SelectInput'
import { Button } from '../../../common/Button/Button'
import { arrNumber, arrTime } from 'utils'
import { MyEditor } from 'components/MyEditor/MyEditor'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { taskModalPath } from '../config/svgIconsPath'

import styles from '../../Modal.module.scss'
import { TasksModalPropsT } from '../../ModalTypes'

export const TasksModal: FC<TasksModalPropsT> = memo(({ modulesList, goToBack, addCourse, closedAll }) => {
  const [nameClasses, setNameClasses] = useState<string>('')
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [checkbox, setCheckbox] = useState<boolean>(false)

  useShowModal({ closedAll })

  const handleAddCourse = () => {
    addCourse(nameClasses, 'task')
  }
  const handleCheckbox = () => {
    setCheckbox(!checkbox)
  }

  const handleNameClasses = (event: ChangeEvent<HTMLInputElement>) => {
    setNameClasses(event.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closedAll} className={styles.classesContainer_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.tasks}>
          <IconSvg width={58} height={58} viewBoxSize="0 0 58 58" path={taskModalPath} />
          <span className={styles.classesContainer_title}>Настройте задания</span>
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
          <>
            <div style={{ marginTop: '15px' }} className={styles.usually_input}>
              <span className={styles.usually_title}>Название занятие:</span>
              <Input placeholder={'Основы языка HTML'} name={'name classes'} onChange={handleNameClasses} type={'text'} value={nameClasses} />
            </div>
            <div className={styles.tasks_checkbox}>
              <Checkbox id={'autoTest'} name={'Auto test work'} checked={checkbox} onChange={handleCheckbox} />
              <div className={styles.tasks_checkbox_desc}>
                <span>Автоматически принимать работы спустя время</span>
                <p>После отправки учеником работы спустя указанное количество времени будет автоматически поставлен зачет</p>
              </div>
            </div>
            <div className={styles.tasks_credit}>
              <span className={styles.tasks_credit_desc}>Поставить зачёт через</span>
              <div className={styles.tasks_credit_select}>
                <SelectInput optionsList={arrNumber} />
                <SelectInput optionsList={arrTime} />
              </div>
              <span className={styles.tasks_credit_desc}>после отправки</span>
            </div>
            <div className={styles.tasks_editor}>
              <span className={styles.tasks_editor_desc}>Сообщение, которое будет автоматически отправлено ученику после принятия работы:</span>
              <MyEditor />
            </div>
          </>
        ) : (
          <div>
            <span className={styles.usually_title}>Сколько баллов будет выдано ученику по завершению занятия:</span>
            <div className={styles.usually_grade}>
              <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
              <span>баллов</span>
            </div>
          </div>
        )}

        <div className={styles.btnBlock}>
          <Button onClick={goToBack} text={'Назад'} style={{ width: '85px', height: '100%', marginRight: '10px', padding: '17px', fontSize: '18px', fontWeight: '400', borderRadius: '10px' }}/>
          <Button onClick={handleAddCourse} text={'Добавить занятие'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
})
