import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'

import { Input } from '../../../../common/Input/Input/Input'

import styles from '../../studentsLog.module.scss'
import { studentsGroupT, studentsGroupsT } from 'types/studentsGroup'
import { SelectInput } from 'components/common/SelectInput/SelectInput'

type AddNewStudentsT = {
  studentEmail: string
  onChangeEmail: (arg: number) => ChangeEventHandler<HTMLInputElement>
  studentGroup: string
  onChangeGroup: (id: number) => ChangeEventHandler<HTMLInputElement>
  handleRemoveStudent: (arg: number) => MouseEventHandler<HTMLButtonElement>
  groupsList?: studentsGroupT
  index: number
  id: number
}

export const AddNewStudents: FC<AddNewStudentsT> = ({ id, index, studentEmail, handleRemoveStudent, onChangeEmail, studentGroup, onChangeGroup, groupsList }) => {
  return (
    <div className={styles.addStudent_student}>
      <div className={styles.addStudent_student_title}>
        <span>Ученик {index + 1}</span>
        {index > 0 && (
          <button className={styles.addStudent_student_btn_remove} type="button" onClick={handleRemoveStudent(id)}>
            Удалить
          </button>
        )}
      </div>
      <Input value={studentEmail} name={'email'} type={'text'} onChange={onChangeEmail(id)} placeholder={'Email ученика'} />
      {groupsList && <div style={{marginTop: '0.5em', height: 'max-content'}}>
        <SelectInput
          optionsList={groupsList?.results.map(({ name, group_id }) => ({ label: name, value: String(group_id) }))}
          defaultOption="Выберите группу"
          selectedOption={studentGroup}
          setSelectedValue={onChangeGroup(id)}
        />
      </div>}
    </div>
  )
}
