import { memo, useState } from 'react'

import { InitPageHeader } from './InitPageHeader'
import { CourseImg } from './CourseImg'
import { RegistrationModal, LoginModal } from 'components/Modal'
import { coursesImgsData } from './config/coursesImgsData'

import styles from './initial.module.scss'

export const Initial = memo(() => {
  const [currentCourse, setCurrentCourse] = useState<string>('1')
  const [registrationShow, setRegistrationShow] = useState<boolean>(false)
  const [loginShow, setLoginShow] = useState<boolean>(false)

  const changeCurrentCourse = (id: string) => setCurrentCourse(id)

  return (
    <div className={styles.init}>
      {registrationShow ? <RegistrationModal setShowModal={setRegistrationShow} /> : null}
      {loginShow ? <LoginModal setShowModal={setLoginShow} /> : null}
      <InitPageHeader setLoginShow={setLoginShow} setRegistrationShow={setRegistrationShow} />
      <div className={styles.init_main}>
        <section className={styles.init_main_wrapper}>
          <h1 className={styles.init_main__title}>Маркетплейс образовательных курсов</h1>
          <div className={styles.init_main__link}>
            <div>Найди свое направление</div>
            <div>Вперед</div>
          </div>
        </section>
        {coursesImgsData.map(({ id, title, style }) => (
          <CourseImg
            key={id}
            currentCourse={currentCourse}
            changeCurrentCourse={changeCurrentCourse}
            id={id}
            // alt={'Python course'}
            title={title}
            style={style}
          />
        ))}
      </div>
    </div>
  )
})
