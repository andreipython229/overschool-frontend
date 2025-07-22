import { Link, generatePath, useNavigate } from 'react-router-dom'
import { Path } from '../../enum/pathE'
import logotype from './components/imgs/logo.png'
import styles from './chooseSchool.module.scss'
import { useEffect, useState } from 'react'
import { useGetSchoolsMutation } from '../../api/getSchoolService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectUser, schoolSelector } from '../../selectors'
import { RoleE } from '../../enum/roleE'
import { clearSchoolData, setSchoolData } from '../../store/redux/school/schoolSlice'
import { useBoolean } from '../../customHooks'
import mobileImg from './components/imgs/mobileBg.png'
import { Portal } from '../../components/Modal/Portal'
import { AddSchoolModal } from '../../components/Modal/AddSchoolModal/AddSchoolModal'
import { motion } from 'framer-motion'
import { logoutState, role } from 'store/redux/users/slice'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { useFetchConfiguredDomainsQuery } from '../../api/DomainService'
import { Domain } from '../../types/domainT'
import { logoHeaderLogin } from '../../assets/img/common/index'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Input } from 'components/common/Input/Input/Input'
import { SchoolSelect } from './components/schoolSelect'
import { SearchIconPath } from 'assets/Icons/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { clearUserProfile } from 'store/redux/users/profileSlice'
import { clearTariffState } from 'store/redux/tariff/tariffSlice'
import { Toaster } from 'react-hot-toast'
import { LoaderLayout } from '@/components/Loaders/LoaderLayout'

export type SchoolT = {
  school_id: number
  name: string
  header_school: number
  role: string
  tariff_paid: boolean
  contact_link: string
  domain_name?: string
  test_course: boolean
}

export const ChooseSchool = () => {
  const navigate = useNavigate()
  const [getSchools, { isLoading }] = useGetSchoolsMutation()
  const [logout] = useLazyLogoutQuery()
  const { role: userRole } = useAppSelector(selectUser)
  const { schoolName } = useAppSelector(schoolSelector)
  const [schools, setSchools] = useState<SchoolT[]>([])
  const [selectedSchool, setSelectedSchool] = useState<SchoolT>()
  const [isOpen, { off, on }] = useBoolean()
  const dispatch = useAppDispatch()
  const [showWarning, { on: close, off: open }] = useBoolean(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [search, setSearch] = useState('')
  const { data: DomainData, isSuccess: DomainSuccess } = useFetchConfiguredDomainsQuery()
  const [schoolsWithDomain, setSchoolsWithDomain] = useState<SchoolT[]>()

  useEffect(() => {
    if (DomainData && schools && schools.length > 0) {
      const domainArray = Array.isArray(DomainData) ? DomainData : (DomainData as { data: Domain[] }).data || []

      if (Array.isArray(domainArray)) {
        const domainSchoolsArray = schools.map(school => {
          const configuredDomain = domainArray.find(domain => domain.school === school.school_id)
          if (configuredDomain) {
            return {
              ...school,
              domain_name: configuredDomain.domain_name,
            }
          }
          return school
        })
        setSchoolsWithDomain(domainSchoolsArray)
      }
    }
    console.log('Schools:', schools, 'Filtered:', filteredSchool, 'Length:', filteredSchool?.length)
  }, [DomainSuccess, DomainData, schools])

  useEffect(() => {
    dispatch(role(RoleE.Unknown))
    dispatch(clearSchoolData())
    dispatch(clearTariffState())
    getSchools()
      .unwrap()
      .then((data: SchoolT[]) => {
        setSchools(data)
      })
      .catch(err => {
        localStorage.clear()
        logout()
        dispatch(logoutState())
        dispatch(clearUserProfile())
        navigate(generatePath(Path.LoginPage))
      })
  }, [])

  const handleSchool = (school: SchoolT) => {
    dispatch(
      setSchoolData({
        schoolId: school.school_id,
        headerId: school.header_school,
        schoolName: school.name,
        contactLink: school.contact_link,
      }),
    )
    localStorage.setItem('test_course', String(school.test_course))
    const roleValue = Object.entries(RoleE).find(([key, value]) => key === school.role)
    roleValue && dispatch(role(Number(roleValue[1])))
  }

  const filteredSchool = schools.filter(school => {
    return school.name.toLowerCase().includes(search.toLowerCase())
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      console.log('Window width:', window.innerWidth, 'Is mobile:', mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (userRole && schoolName) {
      navigate(
        generatePath(
          userRole === RoleE.SuperAdmin
            ? Path.School + '/' + Path.Settings
            : userRole === RoleE.Teacher
            ? Path.School + '/' + Path.CourseStats
            : Path.School + '/' + Path.Courses,
          { school_name: schoolName },
        ),
      )
    }
  }, [userRole, schoolName])

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
            <LoaderLayout />
          ) : (
            <motion.div
              className={styles.container}
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
              <Toaster position="bottom-right" reverseOrder={true} />
              {showWarning && selectedSchool && (
                <Dialog open={showWarning} onClose={close} aria-labelledby="responsive-dialog-title">
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
                  <a href={Path.InitialPage}>
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18.297 4.05796C18.5234 4.05796 18.7497 4.14135 18.9284 4.32004C19.2739 4.66552 19.2739 5.23734 18.9284 5.58281L11.1612 13.35C10.5894 13.9218 10.5894 14.851 11.1612 15.4228L18.9284 23.19C19.2739 23.5355 19.2739 24.1073 18.9284 24.4528C18.5829 24.7983 18.0111 24.7983 17.6656 24.4528L9.89843 16.6856C9.29088 16.0781 8.9454 15.2561 8.9454 14.3864C8.94541 13.5168 9.27897 12.6948 9.89843 12.0872L17.6656 4.32004C17.8443 4.15326 18.0707 4.05796 18.297 4.05796Z"
                        fill="#332F36"
                      />
                    </svg>
                  </a>
                </div>
                <div className={styles.logo_logoWrapper}>
                  <img src={logoHeaderLogin} alt="logoHeaderLogin" />
                </div>
                {window.innerWidth <= 505 && <img src={mobileImg} alt="" style={{ width: '100%', objectFit: 'contain', marginBottom: '1rem' }} />}
                <span className={styles.tit}>Выберите платформу для входа:</span>
                {window.innerWidth <= 505 && (
                  <form style={{ padding: '1rem 0', width: '100%' }}>
                    <div className={styles.input}>
                      <Input
                        name="search"
                        id="searchInput"
                        type="text"
                        placeholder="Поиск..."
                        value={search}
                        style={{ width: '100%', margin: '0 auto' }}
                        onChange={event => setSearch(event.target.value)}
                      >
                        <IconSvg width={16} height={16} viewBoxSize="0 0 24 24" path={SearchIconPath} className={styles.searchIcon} />
                      </Input>
                    </div>
                  </form>
                )}
              </div>
              <div className={styles.schoolBox}>
                {schools && filteredSchool ? (
                  <Swiper
                    className={`${styles.swiper} ${isMobile ? 'swiper-vertical' : ''}`}
                    modules={[Navigation, Pagination]}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    spaceBetween={isMobile ? 20 : 10}
                    slidesPerView={isMobile ? 1 : 3}
                    direction={isMobile ? "vertical" : "horizontal"}
                    style={{
                      height: isMobile ? '400px' : 'auto',
                      overflow: 'hidden',
                      width: '100%'
                    }}
                    onInit={(swiper) => {
                      console.log('Swiper initialized:', {
                        isMobile: isMobile,
                        slidesPerView: swiper.params.slidesPerView,
                        direction: swiper.params.direction
                      })
                    }}
                  >
                    {filteredSchool.map((school, index) => (
                      <SwiperSlide className={styles.slide} key={index}>
                        {school.tariff_paid ? (
                          <Link
                            onClick={e => {
                              e.preventDefault()
                              handleSchool(school)
                            }}
                            style={{ textDecoration: 'none', width: '100%', height: '100%' }}
                            to={generatePath(`${Path.School}/${Path.Courses}`, { school_name: school.name })}
                          >
                            <SchoolSelect role={school.role} logo={logotype} schoolName={school.name} />
                          </Link>
                        ) : school.role === 'Admin' ? (
                          <Link
                            onClick={e => {
                              e.preventDefault()
                              handleSchool(school)
                            }}
                            style={{ textDecoration: 'none', width: '100%', height: '100%' }}
                            to={generatePath(`${Path.School}/${Path.Courses}`, { school_name: school.name })}
                          >
                            <SchoolSelect role={school.role} logo={logotype} schoolName={school.name} />
                          </Link>
                        ) : (
                          <div
                            style={{ width: '100%', height: '100%' }}
                            onClick={() => {
                              setSelectedSchool(school)
                              open()
                            }}
                          >
                            <SchoolSelect role={school.role} logo={logotype} schoolName={school.name} />
                          </div>
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p style={{ color: 'blueviolet', fontSize: '20px', textAlign: 'center', padding: '2em', fontWeight: 'bold' }}>
                    {'Нет доступных платформ :('}
                  </p>
                )}
              </div>

              {window.innerWidth > 505 && (
                <form style={{ padding: '2rem', width: '100%' }}>
                  <div className={styles.input}>
                    <Input
                      name="search"
                      id="searchInput"
                      type="text"
                      placeholder="Поиск"
                      value={search}
                      style={{ width: '80%', margin: '0 auto' }}
                      onChange={event => setSearch(event.target.value)}
                    >
                      <IconSvg width={16} height={16} viewBoxSize="0 0 24 24" path={SearchIconPath} className={styles.searchIcon} />
                    </Input>
                  </div>
                </form>
              )}
              {window.innerWidth > 505 && (
                <div className={styles.create} onClick={off}>
                  <span>cоздать платформу</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
        {isOpen && <Portal closeModal={on}>{schools && <AddSchoolModal setShowModal={on} schools={schools} />}</Portal>}
      </div>
    </div>
  )
}
