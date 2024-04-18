import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Portal } from '../../components/Modal/Portal'
import { InitPageHeader } from './InitPageHeader'
import { CourseImg } from './CourseImg'
import { RegistrationModal, LoginModal } from 'components/Modal'
import { coursesImgsData } from './config/coursesImgsData'
import { useBoolean } from '../../customHooks'

import styles from './initial.module.scss'
import { RegCodeModal } from '../../components/Modal/RegistrationModal/RegCodeModal'
import { Path } from '../../enum/pathE'

export const Initial = () => {
  const [currentCourse, setCurrentCourse] = useState<string>('-1')
  const [registrationShow, setRegistrationShow] = useState<boolean>(false)
  const [regCodeShow, setRegCodeShow] = useState<boolean>(false)
  const [isLoginModal, { off: open, on: close }] = useBoolean()

  const changeCurrentCourse = (id: string) => setCurrentCourse(id)

  useEffect(() => {
    if (window.screen.width > 1600) {
      setCurrentCourse('1')
    } else {
      setCurrentCourse('-1')
    }
  }, [window])

  return (
    <div className={styles.init}>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap2}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap3}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap4}></div>
      </div>
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
            <strong>Платформа справочных материалов</strong>
          </h1>
          <div className={styles.init_main__link}>
            <div>Найди свое направление</div>
            <NavLink to={Path.InitialPage} className={styles.goBtn}>
              Вперед!
            </NavLink>
          </div>
        </section>
        <div style={{ display: 'flex', position: 'relative', right: '30px' }}>
          {coursesImgsData.map(({ id, title, style }) => (
            <CourseImg key={id} currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse} id={id} title={title} style={style} />
          ))}
        </div>
      </div>
    </div>
  )
}
