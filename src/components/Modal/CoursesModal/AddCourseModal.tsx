import { FormEvent, ChangeEvent, FC, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { useCreateCoursesMutation } from 'api/coursesServices'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input/Input/Input'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { AddCourseModalPropsT } from '../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../Modal.module.scss'

export const AddCourseModal: FC<AddCourseModalPropsT> = ({ courses, setShowModal }) => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [createCourses, { isLoading }] = useCreateCoursesMutation()

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const addCourseName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name && courses) {
      const formdata = new FormData()
      formdata.append('order', String(courses.length + 1))
      formdata.append('name', name)
      formdata.append('author_id_id', String(1))
      const data = await createCourses(formdata)

      const { data: course }: any = data

      setShowModal()
      if (course) {
        navigate(
          generatePath(Path.CreateCourse, {
            course_id: course?.course_id,
          }),
        )
      }
    }
  }

  return (
    <div className={styles.mainCourse}>
      <div className={styles.mainCourse_container}>
        <div className={styles.mainCourse_closed} onClick={setShowModal}>
          <IconSvg width={25} height={25} path={crossIconPath} />
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
            <Button
              style={{ minWidth: '280px' }}
              type={'submit'}
              variant={!name || isLoading ? 'disabled' : 'primary'}
              text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать курс'}
              disabled={!name || isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
