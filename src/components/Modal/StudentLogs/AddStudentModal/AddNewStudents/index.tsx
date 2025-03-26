import { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import { Input } from '../../../../common/Input/Input/Input'
import styles from '../../studentsLog.module.scss'

type AddNewStudentsT = {
  studentEmail: string
  studentName: string
  studentLastName: string
  studentPatronymic: string
  onChangeEmail: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangeName: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangeLastName: (arg: number) => ChangeEventHandler<HTMLInputElement>
  onChangePatronymic: (arg: number) => ChangeEventHandler<HTMLInputElement>
  handleRemoveStudent: (arg: number) => MouseEventHandler<HTMLButtonElement>
  index: number
  id: number
}

export const AddNewStudents: FC<AddNewStudentsT> = ({
  id,
  index,
  studentEmail,
  studentName,
  studentLastName,
  studentPatronymic,
  handleRemoveStudent,
  onChangeEmail,
  onChangeLastName,
  onChangeName,
  onChangePatronymic,
}) => {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        <Input value={studentEmail} name={'email'} type={'text'} onChange={onChangeEmail(id)} placeholder={'Email ученика'} required />
        <Input value={studentLastName} name={'last_name'} type={'text'} onChange={onChangeLastName(id)} placeholder={'Фамилия'} />
        <Input value={studentName} name={'first_name'} type={'text'} onChange={onChangeName(id)} placeholder={'Имя'} />
        <Input value={studentPatronymic} name={'patronymic'} type={'text'} onChange={onChangePatronymic(id)} placeholder={'Отчество'} />
      </div>
    </div>
  )
}
