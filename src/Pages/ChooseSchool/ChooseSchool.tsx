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
                <svg style={{ marginBottom: '3em' }} width="230" height="103" viewBox="0 0 230 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M174.192 -0.000967405C174.904 -0.00278475 175.589 0.265959 176.117 0.752598L210.92 32.9128L229.043 49.3535C230.294 50.4876 230.322 52.4704 229.104 53.6405L216.612 65.6498L181.693 101.708C181.157 102.26 180.429 102.571 179.669 102.573L136.491 102.684C133.936 102.69 132.661 99.5321 134.482 97.7044L179.251 52.7929C179.93 52.0414 179.888 51.7491 179.251 51.0602L170.272 41.4769L131.505 5.15145C129.594 3.36052 130.832 0.110076 133.429 0.1034L174.192 -0.000967405Z"
                    fill="url(#paint0_linear_1323_4107)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M68.4455 74.6878C67.4499 75.8543 67.5243 77.6104 68.614 78.6856L91.5215 101.278C92.7028 102.443 94.6034 102.352 95.6726 101.08L176.552 4.79767C178.139 2.90863 176.818 -0.00723445 174.377 -0.000966474L133.392 0.103958C132.569 0.106072 131.787 0.470392 131.246 1.10331L68.4455 74.6878Z"
                    fill="url(#paint1_linear_1323_4107)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.0084 26.3669L46.0685 1.16134C46.6015 0.620036 47.3227 0.315242 48.0754 0.313313L90.3417 0.205088C92.8834 0.198561 94.1643 3.32724 92.3713 5.16357L48.7023 49.8892C48.3891 50.2232 48.3837 50.4334 48.7023 50.8181L95.3713 97.8173C97.1716 99.6447 95.9061 102.778 93.3651 102.785L90.656 102.792C90.6366 102.792 90.6175 102.792 90.5981 102.792L52.2512 102.891C52.2328 102.891 52.2145 102.891 52.1962 102.89L51.538 102.892C50.7604 102.894 50.0157 102.572 49.4761 102.002L0.798224 50.4967C-0.289989 49.3451 -0.262078 47.5144 0.86075 46.3981L21.0084 26.3669Z"
                    fill="url(#paint2_linear_1323_4107)"
                  />
                  <defs>
                    <linearGradient id="paint0_linear_1323_4107" x1="140.844" y1="0.0844086" x2="209.849" y2="59.4753" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9228FF" />
                      <stop offset="1" stopColor="#EC40FF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1323_4107" x1="150.641" y1="0.0597811" x2="67.4794" y2="103.714" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#CD99FF" />
                      <stop offset="1" stopColor="#6D1CBA" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_1323_4107" x1="8.10532" y1="38.9434" x2="70.8075" y2="102.291" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#61A3ED" />
                      <stop offset="1" stopColor="#5048D8" />
                    </linearGradient>
                  </defs>
                </svg>
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
                        <motion.div className={styles.bg} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                          <div className={styles.bg_container}>
                            <div className={styles.name} style={{ textDecoration: 'none' }}>
                              {school.name}
                            </div>
                            <div className={styles.role}>{userRoleName[school.role]}</div>
                          </div>
                          <span>→</span>
                        </motion.div>
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
                        <motion.div className={styles.bg} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                          <div className={styles.bg_container}>
                            <div className={styles.name} style={{ textDecoration: 'none' }}>
                              {school.name}
                            </div>
                            <div className={styles.role}>{userRoleName[school.role]}</div>
                          </div>
                          <span>→</span>
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.div
                        className={styles.bg}
                        style={{ cursor: 'pointer' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
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
                      </motion.div>
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
        {/* <div className={styles.bg2}>
                  <div style={{marginRight: '1em', marginLeft: '1em'}}>
                      <img src={anton}/>
                  </div>
                  <div>
                      <div className={styles.bg2_citate}>Overschool в разы превосходит по функциональности и
                          работоспособности все ранее используемые нами системы.
                      </div>
                      <div className={styles.bg2_c}>Антон Селивончик (менеджер)</div>
                  </div>
              </div> */}
      </div>
    </div>
  )
}
