import { FC } from 'react'
import { useParams, Link} from 'react-router-dom'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'
import { useFetchModulesQuery } from '../../api/modulesServices'
import { StudentAccardion } from '../../components/StudentAccardion/StudentAccardion'

import styles from './CourseModules.module.scss'

import lesson from '../../assets/img/createCourse/lesson.svg'
import check from '../../assets/mobileImg/check.svg'
import test from '../../assets/mobileImg/test.svg'


export const CourseModules: FC = () => {

  const { course_id: courseId, name } = useParams()
  const { data: modules } = useFetchModulesQuery(courseId as string)

  return (
    <div className={styles.container}>
      <Link className={styles.back} to={'/login'}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <div className={styles.back__title}>Все курсы</div>
      </Link>
      <div className={styles.header} style={{backgroundImage: 'url(https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?cs=srgb&dl=pexels-pixabay-414102.jpg&fm=jpg)'}}>
        <div className={styles.header__blur}></div>
        <div className={styles.descrip}>
        <p className={styles.course}>ОНЛАЙН-КУРС</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.proccess}>В процессе 295/324</p>
        <div className={styles.wrapper}>
        <div className={styles.info}>
          <img src={lesson} alt="lesson" />
          <span className={styles.text}>324 занятия</span>
        </div>
        <div className={styles.info}>
          <img src={check} alt="check" />
          <span className={styles.text}>85 заданий</span>
        </div>
        <div className={styles.info}>
          <img src={test} alt="test" />
          <span className={styles.text}>14 тестов</span>
        </div>
        </div>
        </div>
      </div>
      <StudentAccardion modules={modules}/>
    </div>
  )
}

