import { FC, useEffect } from 'react'
import styles from './coursePreview.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchCourseDataFromCatalogMutation } from 'api/catalogServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { Star } from '@mui/icons-material'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'

export const CoureCatalogPreview: FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [fetchCourse, { data: course, isLoading }] = useFetchCourseDataFromCatalogMutation()

  useEffect(() => {
    if (params && params.courseId) {
      fetchCourse(Number(params.courseId))
    }
  }, [params])

  console.log(course)

  if (!course || isLoading) {
    return <SimpleLoader />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.previous}>
        <div className={styles.background_image_course}>
          <img src={course.photo} />
        </div>
        <div className={styles.previous_bcgrShadow}></div>
        <div onClick={() => navigate(Path.Catalog)} className={styles.back_all_course}>
          <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
          <span>Назад в каталог</span>
        </div>
        <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
        <div className={styles.previous_title_name}>{course?.name}</div>
      </div>
      <div className={styles.wrapper_courseStats}>
        <div className={styles.wrapper_courseStats_stat}>
          <span>Занятий:</span>
          <span>75+</span>
        </div>
        <div className={styles.wrapper_courseStats_stat}>
          <span>Учеников:</span>
          <span>100+</span>
        </div>
        <div className={styles.wrapper_courseStats_stat}>
          <span>Рейтинг:</span>
          <span>
            5<Star />
          </span>
        </div>
      </div>
      <div className={styles.wrapper_banner}>
        <div className={styles.wrapper_banner_createProject}>
          <h1>Присоединяйтесь к платформе OVERSCHOOL прямо сейчас!</h1>
          <h1>Освойте одну из самых востребованных профессий!</h1>
          <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
          <Button variant="primary" text="Оставить заявку" />
        </div>
        <div className={styles.wrapper_banner_images}>
          <img src={firstStep} alt="Создать проект" className={styles.wrapper_banner_images_firstStep} />
          <img src={secondStep} alt="Создать проект" className={styles.wrapper_banner_images_secondStep} />
        </div>
      </div>
    </div>
  )
}
