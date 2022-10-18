import { FC } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import { useFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { AddNewStudents } from './AddNewStudents'

export const AddStudentModal: FC<AddStudentModalPropsT> = ({
  setShowModal,
  setChangeCourse,
  setChangeGroup,
  onChangeEmail,
  studentEmail,
  courses,
  changeCourse,
}) => {
  const { data: groups } = useFetchStudentsGroupByCourseQuery(changeCourse['course_id'] || courses[0]['course_id'])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
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
          {courses && <SelectInput optionsList={courses} optionName={'name' as keyof object} setSelectedValue={setChangeCourse} />}
          {groups && <SelectInput optionsList={groups?.results} optionName={'name' as keyof object} setSelectedValue={setChangeGroup} />}
        </div>
        <AddNewStudents studentEmail={studentEmail} onChangeEmail={onChangeEmail} />
        <div className={styles.addStudent_btnBlock}>
          <Button style={{ width: '474px' }} variant={'secondary'} text={'Добавить ещё одного'} />
          <Button style={{ width: '474px' }} variant={'primary'} text={'Отправить приглашение'} />
        </div>
      </div>
    </div>
  )
}
