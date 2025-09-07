import { FormEvent, ChangeEvent, FC, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { useCreateCoursesMutation } from 'api/coursesServices'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { AddCourseModalPropsT } from '../ModalTypes'

import styles from '../Modal.module.scss'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../Portal'
import { LimitModal } from '../LimitModal/LimitModal'
import { CreateCourseModalIcon } from './constants/createCourseModalIcon'
import { penIconPath } from 'Pages/Settings/Main/iconComponents'

export const AddCourseModal: FC<AddCourseModalPropsT> = ({ courses, setShowModal, refetch }) => {
  const navigate = useNavigate()
  const schoolName = window.location.href.split('/')[4]

  const [name, setName] = useState<string>('')
  const [createCourses, { isLoading }] = useCreateCoursesMutation()
  // const [createCourses, {isLoading}] = useLazyFetchCourseQuery()

  const nameCourse = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }
  const school = window.location.href.split('/')[4]

  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')

  const addCourseName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name && school) {
      const formdata = new FormData()
      formdata.append('name', name)
      formdata.append('school', school)

      await createCourses({ course: formdata, schoolName })
        .unwrap()
        .then(async (data: any) => {
          const { data: course }: any = data
          refetch({ schoolName, page: 1 })
          setShowModal()
          if (course) {
            navigate(
              generatePath(Path.School + '/' + Path.Courses + '/' + Path.CreateCourse, {
                course_id: course?.course_id,
                schoolName: schoolName,
              }),
            )
          }
        })
        .catch(error => {
          console.log('Error creating course:', error)
          let errorMessage = 'Произошла ошибка при создании курса'

          if (error.data) {
            errorMessage = error.data
          } else if (error.status) {
            errorMessage += `. Статус ошибки: ${error.status}`
          }

          setMessage(errorMessage)
          onToggle()
        })
    }
    // window.location.reload();
  }

  return (
    <div className={styles.mainCourse}>
      <div className={styles.mainCourse_container}>
        <div className={styles.classesContainer_closed} onClick={setShowModal}>
          <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </div>

        <div className={styles.mainCourse_header}>
          <CreateCourseModalIcon width={157} height={121} />
          <span className={styles.mainCourse_title}>Создание курса</span>
        </div>
        <form onSubmit={addCourseName}>
          <div className={styles.usually_input}>
            <Input
              placeholder="Введите название курса"
              name={'course'}
              type={'text'}
              onChange={nameCourse}
              value={name}
              focus={true}
              style={{ marginBottom: '36px' }}
            >
              <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
            </Input>
          </div>

          <div className={styles.mainCourse_btn}>
            <Button
              style={{ width: '100%' }}
              type={'submit'}
              variant={!name || isLoading ? 'inActive' : 'newPrimary'}
              text={
                //isLoading  ? <SimpleLoader style={{width: '25px', height: '25px'}}
                //loaderColor="#ffff"/> :
                'Создать курс'
              }
              disabled={!name || isLoading}
            />
          </div>
        </form>
      </div>
      {isOpenLimitModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={message} setShowLimitModal={onToggle} setShowMainModal={setShowModal} />
        </Portal>
      ) : null}
    </div>
  )
}
