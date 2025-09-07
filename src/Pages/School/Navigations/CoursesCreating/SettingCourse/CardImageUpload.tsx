import { FC, useEffect, useState } from 'react'
import { usePatchCoursesMutation } from 'api/coursesServices'
import { CoursesDataT } from 'types/CoursesT'
import stylesCard from '../courseCard.module.scss'
import styles from './setting_course.module.scss'
import { SimpleLoader } from '../../../../../components/Loaders/SimpleLoader'
import tests_admin from 'assets/img/CourseCardsTS/tests-admin.svg'
import video_admin from 'assets/img/CourseCardsTS/video-admin.svg'
import homeTask_admin from 'assets/img/CourseCardsTS/home-tasks-admin.svg'
import tests_dark from 'assets/img/CourseCardsTS/tests-dark.svg'
import video_dark from 'assets/img/CourseCardsTS/video-dark.svg'
import homeTask_dark from 'assets/img/CourseCardsTS/home-tasks-dark.svg'
import { Link } from 'react-router-dom'
import { getNounDeclension } from 'utils/getNounDeclension'
import { CheckboxBall } from 'components/common/CheckboxBall'

type CardImageDownloadsT = {
  toggleCheckbox: boolean
  courseFind: CoursesDataT
}

export const CardImageUpload: FC<CardImageDownloadsT> = ({ toggleCheckbox, courseFind }) => {
  const [courseImage, setCourseImage] = useState<string>(String(courseFind?.photo))
  const [updateImg, { isSuccess, isLoading }] = usePatchCoursesMutation()
  const [imgError, setImgError] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  const handleImageChange = () => {
    setImgError('')
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = event => {
      const files = (event.target as HTMLInputElement).files
      if (courseFind && courseFind.order && courseFind.school && files) {
        if (files[0].size <= 7 * 1024 * 1024) {
          const formData = new FormData()
          formData.append('photo', files[0])
          formData.append('order', courseFind.order.toString())
          formData.append('school', courseFind.school.toString())
          updateImg({ arg: { formdata: formData, id: courseFind.course_id }, schoolName })
            .unwrap()
            .then(data => {
              if ('photo' in data && data.photo) {
                setCourseImage(String(data.photo))
              }
            })
        } else {
          setImgError('Размер файла не должен превышать 7 МБ')
        }
      }
    }
    fileInput.click()
  }

  return (
    <div
      style={{
        background: courseFind?.public === 'О' ? '#CFE2FF' : '#CDCDCD',
        boxShadow: courseFind?.public === 'О' ? '2px 2px 7px 0px #357EEB73' : '2px 2px 7px 0px #CDCDCD8C',
      }}
      id={`${courseFind?.course_id}`}
      className={stylesCard.CourseCardsTS__admin}
    >
      <div className={stylesCard.CourseCardsTS__admin_top}>
        <p className={stylesCard.CourseCardsTS__admin_studentCount}>
          {courseFind?.public === 'О' &&
            `${courseFind.students_count} ${getNounDeclension(courseFind.students_count || 0, ['ученик', 'ученика', 'учеников'])}`}
        </p>

        {toggleCheckbox ? (
          <div className={stylesCard.wrapper_switch}>
            <span style={{ color: courseFind?.public === 'О' ? '#357EEB' : '#808080' }} className={stylesCard.CourseCardsTS__public}>
              Опубликован
            </span>
            <CheckboxBall isChecked={toggleCheckbox} />
          </div>
        ) : (
          <div className={stylesCard.wrapper_switch}>
            <span style={{ color: courseFind?.public === 'О' ? '#357EEB' : '#808080' }} className={stylesCard.CourseCardsTS__public}>
              Не опубликован
            </span>
            <CheckboxBall isChecked={toggleCheckbox} />
          </div>
        )}
      </div>

      {!isLoading ? (
        <label className={stylesCard.CourseCardsTS__admin_main}>
          <span className={stylesCard.CourseCardsTS__admin_title} style={{ display: 'inline-block', width: 'auto' }}>
            {courseFind.name}
          </span>
          {courseImage ? (
            <img src={courseImage} alt={courseFind.name} className={stylesCard.CourseCardsTS__admin_main_img} onClick={handleImageChange} />
          ) : (
            <div className={styles.no_image}>
              <span onClick={handleImageChange}>Нет изображения курса :(</span>
            </div>
          )}
          {imgError && <p className={styles.card_image_downloads_error}>{imgError}</p>}
        </label>
      ) : (
        <label className={styles.block_download_image}>
          <SimpleLoader style={{ width: '100%', height: '100%' }} />
        </label>
      )}

      <div className={stylesCard.CourseCardsTS__admin_property_wrapper}>
        <div className={stylesCard.CourseCardsTS__admin_property}>
          <img src={courseFind?.public === 'О' ? video_admin : video_dark} className={stylesCard.CourseCardsTS__admin_property_img} alt="" />
          <p className={stylesCard.CourseCardsTS__admin_property_name}>{courseFind.video_count || 0} Видео</p>
        </div>
        <div className={stylesCard.CourseCardsTS__admin_property}>
          <img src={courseFind?.public === 'О' ? homeTask_admin : homeTask_dark} className={stylesCard.CourseCardsTS__admin_property_img} alt="" />
          <p className={stylesCard.CourseCardsTS__admin_property_name}>{`${courseFind.homework_count || 0} ${getNounDeclension(
            courseFind.homework_count || 0,
            ['Практическая работа', 'Практические работы', 'Практических работ'],
          )}`}</p>
        </div>
        <div className={stylesCard.CourseCardsTS__admin_property}>
          <img src={courseFind?.public === 'О' ? tests_admin : tests_dark} className={stylesCard.CourseCardsTS__admin_property_img} alt="" />
          <p className={stylesCard.CourseCardsTS__admin_property_name}>{`${courseFind.test_count || 0} ${getNounDeclension(
            courseFind.test_count || 0,
            ['Тест', 'Теста', 'Тестов'],
          )}`}</p>
        </div>
      </div>

      <div className={stylesCard.CourseCardsTS__bottom}>
        <Link
          style={{
            maxWidth: courseFind?.public === 'О' ? '100%' : '0',
            padding:
              courseFind?.public === 'О' && window.innerWidth > 500
                ? '16px 40px'
                : courseFind?.public === 'О' && window.innerWidth <= 500
                  ? '10px'
                  : '0',
          }}
          className={stylesCard.CourseCardsTS__admin_button_students}
          to={window.location.pathname.replace('settings', 'student')}
        >
          {courseFind?.public === 'О' && 'Ученики курса'}
        </Link>
        <Link className={stylesCard.CourseCardsTS__admin_button_edit} to={window.location.pathname.replace('settings', '')}>
          Редактировать
        </Link>
      </div>
    </div>
  )
}
