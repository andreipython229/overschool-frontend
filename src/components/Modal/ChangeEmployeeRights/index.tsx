import { ChangeEvent, FC, useState, useEffect } from 'react'

import { checkCoursesDataT } from 'types/CoursesT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { Button } from 'components/common/Button/Button'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from '../../Modal/Modal.module.scss'

type changeEmployeeRightsT = {
  closeModal: () => void
  name: string
  email: string
  role: string
}

export const ChangeEmployeeRights: FC<changeEmployeeRightsT> = ({ closeModal, name, email, role }) => {
  const { data: courses, isSuccess, isFetching } = useFetchCoursesQuery()

  const [checkCourses, setCheckCourses] = useState<checkCoursesDataT[]>()

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckCourses(prevCourses =>
      prevCourses?.map(course => (course.course_id === +e.target.id ? { ...course, checked: e.target.checked } : course)),
    )
  }

  useEffect(() => {
    if (isSuccess) {
      const updatedCourses: checkCoursesDataT[] = courses.results.map(course => ({ ...course, checked: true }))
      setCheckCourses(updatedCourses)
    }
  }, [courses])

  return (
    <form /*onSubmit={handleCreatEmployee}*/ className={styles.main_employee}>
      {isFetching && (
        <div className={styles.loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      <div className={styles.main_employee_container}>
        <div className={styles.main_employee_closedModal} onClick={closeModal}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.main_employee_info}>
          <h3 className={styles.main_employee_name}>{name}</h3>
          <span className={styles.main_employee_email}>Email: {email}</span>
        </div>
        <div className={styles.main_employee_chosenRole}>
          Роль:
          <span> {role}</span>
        </div>

        <div className={styles.main_employee_course}>
          <span className={styles.main_employee_course_title}>Доступ к курсам</span>
          {checkCourses?.map(({ course_id, name, checked }: checkCoursesDataT) => (
            <Checkbox key={course_id} id={course_id.toString()} name={name} checked={checked} onChange={handleChecked}>
              <span>{name}</span>
            </Checkbox>
          ))}
        </div>
        <div className={styles.main_employee_btn}>
          <Button type="submit" text={'Удалить из школы'} variant={'delete'} />
          <Button type="submit" text={'Сохранить изменения'} variant={'primary'} />
        </div>
      </div>
    </form>
  )
}
