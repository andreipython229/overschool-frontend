import { FormEvent, ChangeEvent, FC, memo, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { useCreateCoursesMutation } from 'api/coursesServices'
import { useShowModal } from '../../../customHooks/useShowModal'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'
import { useAppDispatch } from '../../../store/hooks'
import { addCourseId } from 'store/redux/course/slice'
import { crossIconPath } from '../../../config/commonSvgIconsPath'

import styles from '../Modal.module.scss'

type AddCourseModalPropsT = {
  setShowModal: () => void
}
export const AddCourseModal: FC<AddCourseModalPropsT> = memo(({ setShowModal }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [createCourses] = useCreateCoursesMutation()

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const addCourseName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name) {
      const formdata = new FormData()
      // formdata.append('published', `${true}`)
      formdata.append('order', String(1))
      formdata.append('name', name)
      formdata.append('author_id_id', String(1))
      const data = await createCourses(formdata)

      const { data: course }: any = data
      setShowModal()
      if (course) {
        dispatch(addCourseId(course?.course_id))
        navigate(
          generatePath(Path.CreateCourse, {
            course_id: course?.course_id,
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
              <Button style={{ width: '280px' }} type={'submit'} variant={'primary'} text={'Создать курс'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})
