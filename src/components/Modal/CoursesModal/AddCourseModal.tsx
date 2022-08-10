import React, { ChangeEvent, FC, memo, useState } from 'react'
import styles from '../Modal.module.scss'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'
import { useAppDispatch } from '../../../store/hooks'
import { changeCourseName } from '../../../store/redux/course/slice'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../enum/pathE'

type AddCourseModalPropsT = {
  setShowModal: () => void
}
export const AddCourseModal: FC<AddCourseModalPropsT> = memo(({ setShowModal }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const addCourseName = () => {
    console.log(name)
    if (name) {
      dispatch(changeCourseName(name))
      setShowModal()
      navigate(Path.CreateCourse)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCourse}>
        <div className={styles.mainCourse_container}>
          <div className={styles.mainCourse_closed} onClick={setShowModal}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125"
                stroke="#E0DCED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.mainCourse_title}>Создание курса</div>

          <div className={styles.mainCourse_input}>
            <Input
              style={{ width: '280px' }}
              label="Введите название курса:"
              placeholder="Введите название курса"
              name={'course'}
              type={'text'}
              onChange={e => nameCourse(e)}
              value={name}
            />
          </div>

          <div className={styles.mainCourse_btn}>
            <Button
              onClick={addCourseName}
              style={{ width: '280px' }}
              type={'submit'}
              variant={'primary'}
              text={'Создать курс'}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
