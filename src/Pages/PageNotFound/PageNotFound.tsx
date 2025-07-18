import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from '@/enum/pathE'
import styles from './pageNotFound.module.scss'
import { RoleE } from '@/enum/roleE'
import { useAppSelector } from '@/store/hooks'
import { schoolNameSelector, selectUser } from '@/selectors'
import { motion } from 'framer-motion'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const { role } = useAppSelector(selectUser)
  const schoolName = useAppSelector(schoolNameSelector)
  
  const goBack = () => {
    const pathLink =
      schoolName.length > 0 && role
        ? generatePath(role === RoleE.Teacher ? `${Path.School}/${Path.CourseStudent}` : `${Path.School}/${Path.Courses}`, {
            school_name: schoolName,
            course_id: null,
          })
        : generatePath(Path.InitialPage)
    navigate(pathLink)
  }

  const goHome = () => {
    navigate(generatePath(Path.InitialPage))
  }

  return (
    <div className={styles.pageNotFound}>
      <div className={styles.stars}></div>
      
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.errorCode}
        >
          404
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.title}
        >
          Страница не найдена
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.description}
        >
          Извините, но запрашиваемая страница не существует или была перемещена.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.buttonContainer}
        >
          <button className={styles.backButton} onClick={goBack}>
            Вернуться назад
          </button>
          <button className={styles.homeButton} onClick={goHome}>
            На главную
          </button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className={styles.cosmicIllustration}
      >
        <div className={styles.astronaut}>
          <div className={styles.helmet}></div>
          <div className={styles.body}></div>
        </div>
        <div className={styles.planet}>
          <div className={styles.crater1}></div>
          <div className={styles.crater2}></div>
          <div className={styles.crater3}></div>
        </div>
      </motion.div>
    </div>
  )
}
