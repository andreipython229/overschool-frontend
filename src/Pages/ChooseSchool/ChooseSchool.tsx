import { Link, generatePath, useNavigate } from 'react-router-dom'

import { Path } from '../../enum/pathE'

import styles from './chooseSchool.module.scss'
import { useEffect, useState } from 'react'
import { useGetSchoolsMutation } from '../../api/getSchoolService'
import { useAppSelector } from '../../store/hooks'
import { selectUser, schoolNameSelector } from '../../selectors'
import { RoleE } from '../../enum/roleE'
import { SimpleLoader } from '../../components/Loaders/SimpleLoader'
import { setSchoolName } from '../../store/redux/school/schoolSlice'
import { setSchoolId } from '../../store/redux/school/schoolIdSlice'
import { setHeaderId } from '../../store/redux/school/headerIdSlice'
import { useDispatch } from 'react-redux'
import { useBoolean } from '../../customHooks'
import { userRoleName } from 'config/index'
import { Portal } from '../../components/Modal/Portal'
import { AddSchoolModal } from '../../components/Modal/AddSchoolModal/AddSchoolModal'
import { motion } from 'framer-motion'
import { auth, role } from 'store/redux/users/slice'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { useFetchConfiguredDomainsQuery } from '../../api/DomainService'
import {Domain} from "../../types/domainT";
import { logoHeaderLogin, leftArrow, admin, admin2, teacher, teacher2, student, student2 } from '../../assets/img/common/index'

export type SchoolT = {
  school_id: number
  name: string
  header_school: number
  role: string
  tariff_paid: boolean
  contact_link: string
  domain_name?: string
}

export const ChooseSchool = () => {
  const navigate = useNavigate()
  const [getSchools, { isSuccess: userSuccess, isError }] = useGetSchoolsMutation()
  const dispatchRole = useDispatch()
  const [logout] = useLazyLogoutQuery()
  const { role: userRole } = useAppSelector(selectUser)
  const schoolName = useAppSelector(schoolNameSelector)
  const [schools, setSchools] = useState<SchoolT[]>([])
  const [selectedSchool, setSelectedSchool] = useState<SchoolT>()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOpen, { off, on }] = useBoolean()
  const dispatch = useDispatch()
  const [showWarning, { on: close, off: open }] = useBoolean(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [search, setSearch] = useState('')

  const [isHoveredAdmin, setIsHoveredAdmin] = useState(false);
  const [isHoveredTeacher, setIsHoveredTeacher] = useState(false);
  const [isHoveredStudent, setIsHoveredStudent] = useState(false);

  useEffect(() => {
    dispatchRole(role(RoleE.Unknown))
    getSchools()
      .unwrap()
      .then((data: SchoolT[]) => {
        setIsLoading(false)
        setSchools(data)
      })
      .catch(err => {
        if (err.status === 401) {
          localStorage.clear()
          logout()
          dispatch(auth(false))
          navigate(generatePath(Path.InitialPage))
        }
      })
  }, [])

  const handleSchool = (school: SchoolT) => {
    localStorage.setItem('school', school.name)
    dispatch(setSchoolName(school.name))
    localStorage.setItem('school_id', String(school.school_id))
    dispatch(setSchoolId(school.school_id))
    localStorage.setItem('header_id', String(school.header_school))
    dispatch(setHeaderId(school.header_school))
    const roleValue = Object.entries(RoleE).find(([key, value]) => key === school.role)?.[1]
    roleValue && dispatch(role(+roleValue))
  }

  useEffect(() => {
    if (userRole) {
      navigate(
        generatePath(
          userRole === RoleE.SuperAdmin
            ? Path.School + Path.Settings
            : userRole === RoleE.Teacher
            ? Path.School + Path.CourseStats
            : Path.School + Path.Courses,
          { school_name: schoolName },
        ),
      )
    }
  }, [userRole])

  const filteredSchool = schools.filter(school => {
    return school.name.toLowerCase().includes(search.toLowerCase())
  })

  
  


  return (
    <div className={styles.con}>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap1}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap2}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap3}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap4}></div>
      </div>
      <div className={styles.bg1}>
        <div className={styles.bg3}>
          {isLoading ? (
            <div
              style={{
                width: '100vw',
                height: '70vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
              }}
            >
              <SimpleLoader style={{ height: '80px' }} />
            </div>
          ) : (
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              initial={{
                opacity: 0,
                scale: 0.1,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                ease: 'easeInOut',
                duration: 1.5,
              }}
            >
              {showWarning && selectedSchool && (
                <Dialog open={showWarning} onClose={close} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                  <DialogTitle
                    id="responsive-dialog-title"
                    sx={{
                      textAlign: 'center',
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '22px',
                    }}
                  >
                    {`Доступ к платформе "${selectedSchool.name}" ограничен`}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Обратитесь к владельцу платформы, для выяснения обстоятельств.{' '}
                      {selectedSchool.contact_link && (
                        <a href={selectedSchool.contact_link} rel="noreferrer" target="_blank">
                          Ссылка для связи
                        </a>
                      )}
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              )}
              <div className={styles.logo}>
                <div className={styles.logo_btnBack}>
                  <a href={Path.InitialPage}><img src={leftArrow} alt="leftArrow"/></a>
                </div>
                <div className={styles.logo_logoWrapper}>
                  <img src={logoHeaderLogin} alt="logoHeaderLogin"/>
                </div>
                <div className={styles.logo_rolePic}>
                  <div className={styles.logo_rolePic_box}>
                    <motion.div
                      onMouseEnter={() => setIsHoveredAdmin(true)} 
                      onMouseLeave={() => setIsHoveredAdmin(false)}
                      className={styles.logo_rolePic_box_role}>
                      {isHoveredAdmin ? (
                        <motion.img 
                          src={admin2} 
                          alt="admin2" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      ) : (
                        <motion.img 
                          src={admin} 
                          alt="admin" 
                          initial={{ opacity: 1 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      )}
                    </motion.div>
                  </div>
                  <div className={styles.logo_rolePic_box}>
                    <motion.div
                      onMouseEnter={() => setIsHoveredTeacher(true)} 
                      onMouseLeave={() => setIsHoveredTeacher(false)}
                      className={styles.logo_rolePic_box_role}>
                      {isHoveredTeacher ? (
                        <motion.img 
                          src={teacher2} 
                          alt="teacher2" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      ) : (
                        <motion.img 
                          src={teacher} 
                          alt="teacher" 
                          initial={{ opacity: 1 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      )}
                    </motion.div>
                  </div>
                  <div className={styles.logo_rolePic_box}>
                    <motion.div
                      onMouseEnter={() => setIsHoveredStudent(true)} 
                      onMouseLeave={() => setIsHoveredStudent(false)}
                      className={styles.logo_rolePic_box_role}>
                      {isHoveredStudent ? (
                        <motion.img 
                          src={student2} 
                          alt="student2" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      ) : (
                        <motion.img 
                          src={student} 
                          alt="student" 
                          initial={{ opacity: 1 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.3 }} 
                        />
                      )}
                    </motion.div>
                  </div>
                </div>
                  <span className={styles.tit}>Выберите платформу для входа:</span>
              </div>
              {/* <motion.div className={styles.search} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <form>
                  <input
                    type="text"
                    placeholder="Название платформы..."
                    className={styles.search}
                    onChange={event => setSearch(event.target.value)}
                  ></input>
                </form>
              </motion.div> */}
              <div className={styles.schoolBox}>
                {schools ? (
                  filteredSchool.map((school, index: number) =>
                    school.tariff_paid ? (
                      <Link
                        key={index}
                        onClick={async e => {
                          e.preventDefault()
                          await handleSchool(school)
                        }}
                        style={{ textDecoration: 'none', overflow: 'hidden' }}
                        to={generatePath(`${Path.School}courses/`, { school_name: school.name })}
                      >
                        <div className={styles.bg}>
                          <div className={styles.bg_container}>
                            <div className={styles.name} style={{ textDecoration: 'none' }}>
                              {school.name}
                            </div>
                            <div className={styles.role}>{userRoleName[school.role]}</div>
                          </div>
                          <span>→</span>
                        </div>
                      </Link>
                    ) : school.role === 'Admin' ? (
                      <Link
                        key={index}
                        onClick={async e => {
                          e.preventDefault()
                          await handleSchool(school)
                        }}
                        style={{ textDecoration: 'none', overflow: 'hidden' }}
                        to={generatePath(`${Path.School}courses/`, { school_name: school.name })}
                      >
                        <div className={styles.bg}>
                          <div className={styles.bg_container}>
                            <div className={styles.name} style={{ textDecoration: 'none' }}>
                              {school.name}
                            </div>
                            <div className={styles.role}>{userRoleName[school.role]}</div>
                          </div>
                          <span>→</span>
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.bg} onClick={() => {
                          setSelectedSchool(school)
                          open()
                        }}
                      >
                        <div className={styles.bg_container}>
                          <div className={styles.name} style={{ textDecoration: 'none' }}>
                            {school.name}
                          </div>
                          <div className={styles.role}>{userRoleName[school.role]}</div>
                        </div>
                        <span>→</span>
                      </div>
                    ),
                  )
                ) : (
                  <p style={{ color: 'blueviolet', fontSize: '20px', textAlign: 'center', padding: '2em', fontWeight: 'bold' }}>
                    {'Нет доступных платформ :('}
                  </p>
                )}
              </div>
              <div className={styles.create} onClick={off}>
                <span>cоздать платформу</span>
              </div>
            </motion.div>
          )}
        </div>
        {isOpen && <Portal closeModal={on}>{schools && <AddSchoolModal setShowModal={on} schools={schools} />}</Portal>}
        
      </div>
    </div>
  )
}
