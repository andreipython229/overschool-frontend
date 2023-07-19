import { useState } from 'react'
import { Portal } from '../../components/Modal/Portal'
import { InitPageHeader } from './InitPageHeader'
import { CourseImg } from './CourseImg'
import { RegistrationModal, LoginModal } from 'components/Modal'
import { coursesImgsData } from './config/coursesImgsData'
import { useBoolean } from '../../customHooks'

import styles from './initial.module.scss'
import { RegCodeModal } from '../../components/Modal/RegistrationModal/RegCodeModal'

export const Initial = () => {
  const [currentCourse, setCurrentCourse] = useState<string>('1')
  const [registrationShow, setRegistrationShow] = useState<boolean>(false)
  const [regCodeShow, setRegCodeShow] = useState<boolean>(false)
  const [isLoginModal, { off: open, on: close }] = useBoolean()

  const changeCurrentCourse = (id: string) => setCurrentCourse(id)

  return (
    <div className={styles.init}>
      {registrationShow && <RegistrationModal setShowModal={setRegistrationShow} setCodeModal={setRegCodeShow} />}
      {regCodeShow && <RegCodeModal setCodeModal={setRegCodeShow} />}
      {isLoginModal ? (
        <Portal closeModal={close}>
          <LoginModal setShowModal={close} />
        </Portal>
      ) : null}
      <InitPageHeader setLoginShow={open} setRegistrationShow={setRegistrationShow} />
      <div className={styles.init_main}>
        <section className={styles.init_main_wrapper}>
          <h1 className={styles.init_main__title}>
            <strong>Маркетплейс образовательных курсов</strong>
          </h1>
          <div className={styles.init_main__link}>
            <div>Найди свое направление</div>
            <div>Вперед</div>
          </div>
        </section>
        {coursesImgsData.map(({ id, title, style }) => (
          <CourseImg key={id} currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse} id={id} title={title} style={style} />
        ))}
      </div>
    </div>
  )
}
