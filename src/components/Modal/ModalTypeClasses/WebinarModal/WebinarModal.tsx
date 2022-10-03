import { ChangeEvent, FC, useState } from 'react'

import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { SelectInput } from '../../../common/SelectInput/SelectInput'
import { arrNumber, arrTime } from '../../../../utils'
import { Button } from '../../../common/Button/Button'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { modalTypeClassesWebinarBlockPath } from '../config/svgIconsPath'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'

import styles from '../../Modal.module.scss'
import { WebinarModalPropsT } from '../../ModalTypes'


export const WebinarModal: FC<WebinarModalPropsT> = ({ goToBack, addCourse, closedAll }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [nameClasses, setNameClasses] = useState<string>('')
  const [reminderForStudent, setReminderForStudent] = useState<boolean>(false)
  const [secondReminderForStudent, setSecondReminderForStudent] = useState<boolean>(false)
  const [reminderForEmployees, setReminderForEmployees] = useState<boolean>(false)
  const [secondReminderForEmployees, setSecondReminderForEmployees] = useState<boolean>(false)

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameClasses(event.currentTarget.value)
  }
  useShowModal({ closedAll })

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closedAll} className={styles.classesContainer_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>

        <div className={styles.webinar}>
          <IconSvg width={53} height={55} viewBoxSize="0 0 53 55" path={modalTypeClassesWebinarBlockPath} />
          <span className={styles.classesContainer_title}>Настройте вебинар</span>
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
              <span className={styles.usually_title}>Название вебинара:</span>
              <Input placeholder={'Основы языка HTML'} name={'name classes'} onChange={changeName} type={'text'} value={nameClasses} />
            </div>
            <div className={styles.webinar_checkboxPack}>
              <div className={styles.webinar_checkbox}>
                <Checkbox
                  id={'reminderS'}
                  name={'Reminder for student'}
                  checked={reminderForStudent}
                  onChange={() => setReminderForStudent(!reminderForStudent)}
                />
                <div className={styles.webinar_checkbox_text}>
                  <span className={styles.webinar_checkbox_text_for}>Напоминание для учеников</span>
                  <span className={styles.webinar_checkbox_text_desc}>Ученикам будет приходить напоминание о начале вебинара по email</span>
                </div>
              </div>
              <div className={styles.tasks_credit}>
                <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                <div className={styles.tasks_credit_select}>
                  <SelectInput optionsList={arrNumber} />
                  <SelectInput optionsList={arrTime} />
                </div>
                <span className={styles.tasks_credit_desc}>до начала</span>
              </div>

              <div className={styles.webinar_addReminder} onClick={() => setSecondReminderForStudent(!secondReminderForStudent)}>
                {secondReminderForStudent ? (
                  <span style={{ color: '#FF0000' }}>Отключить дополнительное напоминание</span>
                ) : (
                  <span>+ Добавить ещё одно напоминание </span>
                )}
              </div>

              {secondReminderForStudent && (
                <div className={styles.tasks_credit}>
                  <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                  <div className={styles.tasks_credit_select}>
                    <SelectInput optionsList={arrNumber} />
                    <SelectInput optionsList={arrTime} />
                  </div>
                  <span className={styles.tasks_credit_desc}>до начала</span>
                </div>
              )}

              <div className={styles.webinar_checkbox}>
                <Checkbox
                  id={'reminderE'}
                  name={'Reminder for employees'}
                  checked={reminderForEmployees}
                  onChange={() => setReminderForEmployees(!reminderForEmployees)}
                />
                <div className={styles.webinar_checkbox_text}>
                  <span className={styles.webinar_checkbox_text_for}>Напоминание для ответственных сотрудников</span>
                  <span className={styles.webinar_checkbox_text_desc}>Им будут приходить напоминания о начале вебинара по email</span>
                </div>
              </div>
              <div className={styles.tasks_credit}>
                <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                <div className={styles.tasks_credit_select}>
                  <SelectInput optionsList={arrNumber} />
                  <SelectInput optionsList={arrTime} />
                </div>
                <span className={styles.tasks_credit_desc}>до начала</span>
              </div>

              <div className={styles.webinar_addReminder} onClick={() => setSecondReminderForEmployees(!secondReminderForEmployees)}>
                {secondReminderForEmployees ? (
                  <span style={{ color: '#FF0000' }}>Отключить дополнительное напоминание</span>
                ) : (
                  <span>+ Добавить ещё одно напоминание </span>
                )}
              </div>

              {secondReminderForEmployees && (
                <div className={styles.tasks_credit}>
                  <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                  <div className={styles.tasks_credit_select}>
                    <SelectInput optionsList={arrNumber} />
                    <SelectInput optionsList={arrTime} />
                  </div>
                  <span className={styles.tasks_credit_desc}>до начала</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: '15px' }} className={styles.usually_input}>
              <span className={styles.usually_title}>Ответственные сотрудники:</span>
              <Input placeholder={'Основы языка HTML'} name={'name classes'} onChange={changeName} type={'text'} value={nameClasses} />
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
          <Button onClick={goToBack} text={'Назад'} style={{ width: '85px', height: '100%', marginRight: '10px', padding: '17px', fontSize: '18px', fontWeight: '400', borderRadius: '10px' }} />
          <Button onClick={() => addCourse(nameClasses, 'webinar')} text={'Добавить занятие'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
}
