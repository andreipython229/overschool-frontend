import React, { memo, useState } from 'react'
import styles from './initialPage.module.scss'
import { InitPageHeader } from './InitPageHeader/InitPageHeader'
import { CourseImg } from './CourseImgBlock/CourseImg'
import { RegistrationModal, LoginModal } from 'components/Modal'
import Python from '../../assets/img/course/python.jpg'
import Frontend from '../../assets/img/course/frontend.jpg'
import QA from '../../assets/img/course/qa.jpg'
import UI from '../../assets/img/course/ui.jpg'
import Java from '../../assets/img/course/java.jpg'

import { useAppDispatch } from '../../store/hooks'
import { loginUser } from 'store/redux/users/slice'

export const InitialPage = memo(() => {
  const dispatch = useAppDispatch()
  const [currentCourse, setCurrentCourse] = useState<string>('1')
  const [registrationShow, setRegistrationShow] = useState<boolean>(false)
  const [loginShow, setLoginShow] = useState<boolean>(false)
  const logIn = (value: string | number) => {
    dispatch(loginUser({ value }))
  }

  const python = {
    backgroundImage: 'url(' + Python + ')',
  }
  const frontend = {
    backgroundImage: 'url(' + Frontend + ')',
  }
  const java = {
    backgroundImage: 'url(' + Java + ')',
  }
  const qa = {
    backgroundImage: 'url(' + QA + ')',
  }
  const ui = {
    backgroundImage: 'url(' + UI + ')',
  }

  const changeCurrentCourse = (id: string) => setCurrentCourse(id)

  return (
    <div className={styles.init}>
      {registrationShow ? <RegistrationModal setShowModal={setRegistrationShow} /> : null}
      {loginShow ? <LoginModal logIn={logIn} setShowModal={setLoginShow} /> : null}
      <InitPageHeader setLoginShow={setLoginShow} setRegistrationShow={setRegistrationShow} />
      <div className={styles.init_main}>
        <section className={styles.init_main_wrapper}>
          <h1 className={styles.init_main__title}>Маркетплейс образовательных курсов</h1>
          <div className={styles.init_main__link}>
            <div>Найди свое направление</div>
            <div>Вперед</div>
          </div>
        </section>
        <CourseImg
          currentCourse={currentCourse}
          changeCurrentCourse={changeCurrentCourse}
          id={'1'}
          // alt={'Python course'}
          title={'Python'}
          style={python}
        />
        <CourseImg
          currentCourse={currentCourse}
          changeCurrentCourse={changeCurrentCourse}
          id={'2'}
          // alt={'Java course'}
          title={'Java'}
          style={java}
        />
        <CourseImg
          currentCourse={currentCourse}
          changeCurrentCourse={changeCurrentCourse}
          id={'3'}
          // alt={'Frontend course'}
          title={'Front-end'}
          style={frontend}
        />
        <CourseImg
          currentCourse={currentCourse}
          changeCurrentCourse={changeCurrentCourse}
          id={'4'}
          // alt={'UI/UX course'}
          title={'UX/UI Design'}
          style={ui}
        />
        <CourseImg
          currentCourse={currentCourse}
          changeCurrentCourse={changeCurrentCourse}
          id={'5'}
          // alt={'QA course'}
          title={'QA'}
          style={qa}
        />
      </div>
    </div>
  )
})
