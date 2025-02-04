import { FC } from 'react'
import styles from './schoolSelect.module.scss'
import adminImg from './imgs/admin.png'
import teacherImg from './imgs/teacher.png'
import studentImg from './imgs/student.png'
import selectedAdmin from './imgs/selectedAdmin.png'
import selectedTeacher from './imgs/selectedTeacher.png'
import selectedStudent from './imgs/selectedStudent.png'

interface ISchoolSelect {
  role: string
  schoolName: string
  logo: string
}

export const SchoolSelect: FC<ISchoolSelect> = ({ role, schoolName, logo }) => {
  return (
    <div className={styles.wrapper}>
      <img
        src={role === 'Admin' ? adminImg : role === 'Teacher' ? teacherImg : studentImg}
        alt={role + ' picture'}
        className={styles.wrapper_mainImage}
      />
      <img
        src={role === 'Admin' ? selectedAdmin : role === 'Teacher' ? selectedTeacher : selectedStudent}
        alt="secondary"
        style={role === 'Admin' ? { top: '-20px' } : role === 'Teacher' ? { top: '-10px' } : {}}
        className={styles.wrapper_secondaryImage}
      />
      <div className={styles.wrapper_schoolBlock}>
        <div className={styles.wrapper_schoolBlock_content}>
          <img src={logo} alt="" className={styles.wrapper_schoolBlock_content_logoSchool} />
          <div className={styles.wrapper_schoolBlock_content_text}>
            <p className={styles.wrapper_schoolBlock_content_text_role}>
              {role === 'Admin' ? 'Администратор' : role === 'Teacher' ? 'Преподаватель' : 'Ученик'}
            </p>
            <p className={styles.wrapper_schoolBlock_content_text_name}>{schoolName}</p>
          </div>
        </div>
        <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.30954 0.814039C0.976678 0.814039 0.643818 0.93667 0.381034 1.19945C-0.127015 1.7075 -0.127015 2.54841 0.381034 3.05646L11.8034 14.4788C12.6443 15.3197 12.6443 16.6862 11.8034 17.5271L0.381037 28.9495C-0.127012 29.4575 -0.127012 30.2984 0.381037 30.8065C0.889086 31.3145 1.72999 31.3145 2.23804 30.8065L13.6604 19.3841C14.5539 18.4906 15.0619 17.2818 15.0619 16.003C15.0619 14.7241 14.5714 13.5153 13.6604 12.6218L2.23804 1.19945C1.97526 0.954189 1.6424 0.814039 1.30954 0.814039Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}
