import React, { ChangeEvent, FC } from 'react'

import { Input } from '../../../../common/Input/Input/Input'

import styles from '../../studentsLog.module.scss'

type AddNewStudentsT = {
  studentEmail: string
  onChangeEmail: (arg: ChangeEvent<HTMLInputElement>) => void
}

export const AddNewStudents: FC<AddNewStudentsT> = ({ studentEmail, onChangeEmail }) => {
  return (
    <div className={styles.addStudent_student}>
      <span className={styles.addStudent_student_title}>Ученик 1</span>
      <Input value={studentEmail} name={'email'} type={'text'} onChange={onChangeEmail} placeholder={'Email ученика'} />
      <div>
        <button className={styles.addStudent_student_btn}>+Добавить имя</button>
        <button className={styles.addStudent_student_btn}>+Добавить комментарий</button>
      </div>
    </div>
  )
}
