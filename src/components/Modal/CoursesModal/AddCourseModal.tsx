import React, { FormEvent, ChangeEvent, FC, memo, useState, useEffect } from 'react'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeCourseName } from '../../../store/redux/course/slice'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'
import { useCreateCoursesMutation } from 'api/coursesServices'

import styles from '../Modal.module.scss'

type AddCourseModalPropsT = {
  setShowModal: () => void
}
export const AddCourseModal: FC<AddCourseModalPropsT> = memo(({ setShowModal }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [createCourses, { data }] = useCreateCoursesMutation()

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const addCourseName = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (name) {
      dispatch(changeCourseName(name))
      const formdata = new FormData()
      formdata.append('course_id', '17')
      formdata.append('created_at', '2022-08-02T15:34:37Z')
      formdata.append('updated_at', '2022-08-02T15:34:37Z')
      formdata.append('published', 'true')
      formdata.append('order', '1')
      formdata.append('name', name)
      formdata.append('format', 'ОН')
      formdata.append('duration_days', '120')
      formdata.append('price', '20.22')
      formdata.append('description', 'HTML,CSS,JS')
      formdata.append('author_id', '1')
      // formdata.append('photo', img)
      // createCourses(formdata)
      // setShowModal()
      navigate(Path.CreateCourse)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCourse}>
        <div className={styles.mainCourse_container}>
          <div className={styles.mainCourse_closed} onClick={setShowModal}>
            <IconSvg
              width={18}
              height={18}
              d={cross}
              stroke={'#E0DCED'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
            />
          </div>

          <div className={styles.mainCourse_title}>Создание курса</div>
          <form onSubmit={addCourseName}>
            <div className={styles.mainCourse_input}>
              <Input
                style={{ width: '280px' }}
                label="Введите название курса:"
                placeholder="Введите название курса"
                name={'course'}
                type={'text'}
                onChange={nameCourse}
                value={name}
              />
            </div>

            <div className={styles.mainCourse_btn}>
              <Button
                // onClick={addCourseName}
                style={{ width: '280px' }}
                type={'submit'}
                variant={'primary'}
                text={'Создать курс'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})
