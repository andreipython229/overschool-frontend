import { ChangeEvent, FC } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { programLanguage } from 'constants/other'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'

type AddStudentModalPropsT = {
  setShowModal: (arg: boolean) => void
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void
  studentEmail: string
}
export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, onChangeEmail, studentEmail }) => {
  const handleClose = () => {
    setShowModal(false)
  }
  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div onClick={handleClose} className={styles.container_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.addStudent}>
          <div className={styles.container_header}>
            <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={addStudentIconPath} />
            <span className={styles.container_header_title}>Добавление учеников</span>
          </div>
          <div className={styles.addStudent_select}>
            <SelectInput optionsList={programLanguage} />
            <SelectInput optionsList={['Выберите группу', 'Группа 1-1', ' Группа 1-2', ' Группа 1-3']} />
          </div>
          <div className={styles.addStudent_student}>
            <span className={styles.addStudent_student_title}>Ученик 1</span>
            <Input value={studentEmail} name={'email'} type={'text'} onChange={onChangeEmail} placeholder={'Email ученика'} />
            <div className={styles.addStudent_student_btn}>
              <span>+Добавить имя</span> <span>+Добавить комментарий</span>
            </div>
          </div>
          <div className={styles.addStudent_btnBlock}>
            <Button style={{ width: '474px' }} variant={'secondary'} text={'Добавить ещё одного'} />
            <Button style={{ width: '474px' }} variant={'primary'} text={'Отправить приглашение'} />
          </div>
        </div>
      </div>
    </div>
  )
}
