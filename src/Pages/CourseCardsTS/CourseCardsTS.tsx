import React, { useEffect, useState } from 'react'
import CardBack from 'assets/img/CourseCardsTS/course.png'
import tests from 'assets/img/CourseCardsTS/tests.svg'
import video from 'assets/img/CourseCardsTS/video.svg'
import homeTask from 'assets/img/CourseCardsTS/home-tasks.svg'

import tests_dark from 'assets/img/CourseCardsTS/tests-dark.svg'
import video_dark from 'assets/img/CourseCardsTS/video-dark.svg'
import homeTask_dark from 'assets/img/CourseCardsTS/home-tasks-dark.svg'

import './CourseCardsTS.scss'
import { is } from 'immutable'

import tests_admin from 'assets/img/CourseCardsTS/tests-admin.svg'
import video_admin from 'assets/img/CourseCardsTS/video-admin.svg'
import homeTask_admin from 'assets/img/CourseCardsTS/home-tasks-admin.svg'
export default function CourseCardsTS() {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const checkbox = document.getElementById('something') as HTMLInputElement | null
    if (checkbox) {
      const handleCheckboxChange = () => {
        setIsChecked(checkbox.checked)
      }
      checkbox.addEventListener('change', handleCheckboxChange)

      return () => {
        checkbox.removeEventListener('change', handleCheckboxChange)
      }
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.CourseCardsTS__admin-property-name')

    elements.forEach(element => {
      const htmlElement = element as HTMLElement
      htmlElement.style.color = isChecked ? '#000000' : '#332F36'
    })
  }, [isChecked])
  return (
    <div className="CourseCardsTS">
      <div
        className="CourseCardsTS__student"
        style={{ background: `url(${CardBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="CourseCardsTS__bg-filter"></div>
        <div className="CourseCardsTS__title ">The Way UX/UI Design</div>
        <div className="CourseCardsTS__properties">
          <div className="CourseCardsTS__property-wrapper">
            <div className="CourseCardsTS__property">
              <img src={video} className="CourseCardsTS__property-img" alt="" />
              <p className="CourseCardsTS__property-name">32/152 видео</p>
            </div>
            <div className="CourseCardsTS__line"></div>
            <div className="CourseCardsTS__property">
              <img src={homeTask} className="CourseCardsTS__property-img" alt="" />
              <p className="CourseCardsTS__property-name">4/11 Домашних заданий</p>
            </div>
            <div className="CourseCardsTS__line"></div>
            <div className="CourseCardsTS__property">
              <img src={tests} className="CourseCardsTS__property-img" alt="" />
              <p className="CourseCardsTS__property-name">4/9 тестов</p>
            </div>
          </div>
          <div className="progress">
            <progress max="100" value="36"></progress>
            <div className="progress-value"></div>
            <div className="progress-bg">
              <div className="progress-bar"></div>
            </div>
          </div>
          <div className="CourseCardsTS__bottom">
            <a href="#" className="CourseCardsTS__button">
              Продолжить обучаться
            </a>
            <p className="CourseCardsTS__percents">36%</p>
          </div>
        </div>
      </div>
      <div
        style={{ background: isChecked ? '#CFE2FF' : '#CDCDCD', boxShadow: isChecked ? '2px 2px 7px 0px #357EEB73' : '2px 2px 7px 0px #CDCDCD8C' }}
        className="CourseCardsTS__admin"
      >
        <div className="CourseCardsTS__admin-top">
          <p className="CourseCardsTS__admin-student-count">{isChecked && '152 ученика'}</p>

          <label className="wraper" htmlFor="something">
            <p style={{ color: isChecked ? '#357EEB' : '#808080' }} className="CourseCardsTS__public">
              {isChecked ? 'Опубликован' : 'Не опубликован'}
            </p>
            <div style={{ background: isChecked ? 'white' : '#808080' }} className="switch-wrap">
              <input type="checkbox" id="something" />
              <div className="switch"></div>
            </div>
          </label>
        </div>
        <div
          style={{ background: `url(${CardBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          className="CourseCardsTS__admin-main "
        >
          <div className="CourseCardsTS__admin-bg-filter"></div>

          <div className="CourseCardsTS__admin-title ">The Way UX/UI Design</div>
        </div>
        <div className="CourseCardsTS__admin-property-wrapper">
          <div className="CourseCardsTS__admin-property">
            <img  src={isChecked ? video_admin :video_dark} className="CourseCardsTS__admin-property-img" alt="" />
            <p className="CourseCardsTS__admin-property-name">152 видео</p>
          </div>
          <div className="CourseCardsTS__admin-property">
            <img src={isChecked ? homeTask_admin: homeTask_dark} className="CourseCardsTS__admin-property-img" alt="" />
            <p className="CourseCardsTS__admin-property-name">11 Домашних заданий</p>
          </div>
          <div className="CourseCardsTS__admin-property">
            <img src={isChecked ? tests_admin : tests_dark} className="CourseCardsTS__admin-property-img" alt="" />
            <p className="CourseCardsTS__admin-property-name">9 тестов</p>
          </div>
        </div>
        <div className="CourseCardsTS__admin-buttons">
          <a
            href="#"
            style={{ maxWidth: !isChecked ? '0' : '100%', padding: !isChecked ? '0' : ' 16px 40px' }}
            className="CourseCardsTS__admin-button-students"
          >
            {isChecked && 'Ученики курса'}
          </a>
          <a href="#" className="CourseCardsTS__admin-button-edit">
            Редактировать
          </a>
        </div>
      </div>
    </div>
  )
}
