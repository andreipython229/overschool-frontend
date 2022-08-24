import React, { FormEvent, ChangeEvent, FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateCoursesMutation } from 'api/coursesServices'
import { useShowModal } from '../../../customHooks/useShowModal'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'

import styles from '../Modal.module.scss'
import { createPath } from '../../../utils/createPath'

type AddCourseModalPropsT = {
  setShowModal: any
}
export const AddCourseModal: FC<AddCourseModalPropsT> = memo(({ setShowModal }) => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [createCourses, { data, isLoading }] = useCreateCoursesMutation()

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const addCourseName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name) {
      const formdata = new FormData()
      formdata.append('course_id', String(100))
      formdata.append('created_at', `${new Date(Date.now())}`)
      formdata.append('updated_at', `${new Date(Date.now())}`)
      formdata.append('published', `${true}`)
      formdata.append('order', String(1))
      formdata.append('name', name)
      formdata.append('format', 'ОН')
      formdata.append('duration_days', String(120))
      formdata.append('price', '20.22')
      formdata.append('description', 'HTML,CSS,JS')
      formdata.append('author_id', String(1))
      await createCourses(formdata)

      setShowModal()

      if (data) {
        navigate(
          createPath({
            path: Path.CreateCourse,
            params: { course_id: data?.course_id },
          }),
        )
      }
    }
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainCourse}>
        <div className={styles.mainCourse_container}>
          <div className={styles.mainCourse_closed} onClick={setShowModal}>
            <IconSvg width={25} height={25} d={cross} stroke={'#E0DCED'} strokeWidth={'2'} strokeLinecap={'round'} strokeLinejoin={'round'} />
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
                focus={true}
              />
            </div>

            <div className={styles.mainCourse_btn}>
              <Button style={{ width: '280px' }} type={'submit'} variant={'primary'} text={'Создать курс'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})
