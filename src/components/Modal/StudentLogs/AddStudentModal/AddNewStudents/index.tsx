import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'

import { Input } from '../../../../common/Input/Input/Input'

import styles from '../../studentsLog.module.scss'

type AddNewStudentsT = {
  studentEmail: string
  onChangeEmail: (arg: number) => ChangeEventHandler<HTMLInputElement>
  handleRemoveStudent: (arg: number) => MouseEventHandler<HTMLButtonElement>
  index: number
  id: number
}

export const AddNewStudents: FC<AddNewStudentsT> = ({ id, index, studentEmail, handleRemoveStudent, onChangeEmail }) => {
  const [addNameOrComment, setAddNameOrComment] = useState({ name: false, comment: false })

  const handleAddNameStudent = () => {
    setAddNameOrComment({ ...addNameOrComment, name: !addNameOrComment.name })
  }
  const handleAddCommentStudent = () => {
    setAddNameOrComment({ ...addNameOrComment, comment: !addNameOrComment.comment })
  }

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
      {addNameOrComment.name && (
        <Input
          style={{ margin: '5px 0' }}
          value={''}
          name={'name'}
          type={'text'}
          onChange={() => console.log('заглушка')}
          placeholder={'Имя ученика'}
        />
      )}
      {addNameOrComment.comment && (
        <textarea
          className={styles.textarea__field}
          style={{ resize: 'none' }}
          rows={4}
          id="story"
          value={''}
          onChange={() => console.log('заглушка')}
          name="comment"
        >
          Оставьте комментарий.....
        </textarea>
      )}
      <div>
        <button type={'button'} onClick={handleAddNameStudent} className={styles.addStudent_student_btn}>
          {addNameOrComment.name ? '-Удалить имя' : '+Добавить имя'}
        </button>
        <button type={'button'} onClick={handleAddCommentStudent} className={styles.addStudent_student_btn}>
          {addNameOrComment.comment ? '-Удалить комментарий' : '+Добавить комментарий'}
        </button>
      </div>
    </div>
  )
}
