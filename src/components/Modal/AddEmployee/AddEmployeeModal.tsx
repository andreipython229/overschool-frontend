import { ChangeEvent, FC, memo, useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { Radio } from 'components/common/Radio/Radio'
import { cross } from '../../../constants/iconSvgConstants'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors/index'
import { RoleE } from 'enum/roleE'
import { Checkbox } from '../../common/Checkbox/Checkbox'
import { employeeModalSvg } from './constants/svgIcon'
import { checkBoxData } from './config/checkBoxConfig'
import { radioData } from './config/radioConfig'

import styles from '../Modal.module.scss'

type AddEmployeeModalPropsT = {
  setModal: () => void
}

export const AddEmployeeModal: FC<AddEmployeeModalPropsT> = memo(({ setModal }) => {
  const [checkedItem, setCheckedItem] = useState<{ [key: string]: boolean }>({
    python: false,
    java: false,
    frontend: false,
    ui: false,
    english: false,
    englishStart: false,
  })

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setCheckedItem({ ...checkedItem, [target.name]: target.checked })
  }

  const { permission } = useAppSelector(selectUser)
  if (permission === RoleE.Admin) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main_employee}>
          <div className={styles.main_employee_container}>
            <div className={styles.main_employee_closedModal} onClick={setModal}>
              <IconSvg width={26} height={26} d={cross} stroke={'#E0DCED'} strokeWidth={'2'} strokeLinecap={'round'} strokeLinejoin={'round'} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
              <span className={styles.main_employee_subs}>
                Отправим приглашение на Email. <br /> Приняв его, сотрудник сможет настроить свой профиль
              </span>
            </div>
            <div className={styles.main_employee_invite}>
              <label htmlFor="email">Email нового сотрудника:</label>
              <br />
              <div className={styles.main_employee_invite_input}>
                <input type="text" placeholder={'example@mailbox.ru'} />
              </div>
            </div>
            {radioData.map(({ id, title, text }) => (
              <div key={title} className={styles.main_employee_role}>
                <div className={styles.main_employee_role_radio}>
                  <Radio title={title} id={id} />
                </div>
                <div className={styles.main_employee_role_desc}>{text}</div>
              </div>
            ))}
            <div className={styles.main_employee_course}>
              <span className={styles.main_employee_course_title}>Доступ к курсам</span>
              {checkBoxData.map(({ id, name, span }) => (
                <div key={id} className={styles.main_employee_course_checkbox}>
                  <Checkbox id={id} name={name} checked={checkedItem[name]} onChange={handleChecked} />
                  <span>{span}</span>
                </div>
              ))}
            </div>
            <div className={styles.main_employee_btn}>
              <Button style={{ width: '220px' }} text={'Добавить'} variant={'primary'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_employee}>
        <div className={styles.main_employee_container}>
          <div className={styles.main_employee_closedModal} onClick={setModal}>
            <IconSvg
              width={14}
              height={14}
              viewBoxSize={'0 0 14 14'}
              stroke={'#E0DCED'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              d={employeeModalSvg}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
            <span className={styles.main_employee_subs}>
              Отправим приглашение на Email. <br /> Приняв его, сотрудник сможет настроить свой профиль
            </span>
          </div>
          <div className={styles.main_employee_invite}>
            <label htmlFor="email">Email нового сотрудника:</label>
            <br />
            <div className={styles.main_employee_invite_input}>
              <input type="text" placeholder={'example@mailbox.ru'} />
            </div>
          </div>
          <div className={styles.main_employee_role}>
            <div className={styles.main_employee_role_radio}>
              <Radio title={'Администратор'} id={'admin'} />
            </div>
            <div className={styles.main_employee_role_desc}>
              Может создавать и удалять курсы, добавлять сотрудников, производить операции со счетом и тарифами
            </div>
          </div>
          <div className={styles.main_employee_btn}>
            <Button text={'Добавить'} variant={'primary'} />
          </div>
        </div>
      </div>
    </div>
  )
})
