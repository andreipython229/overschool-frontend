import { Link, useNavigate } from 'react-router-dom'

import { Path } from '../../enum/pathE'

import styles from './chooseSchool.module.scss'
import { useEffect, useState } from 'react'
import { useGetSchoolsMutation } from '../../api/getSchoolService'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../selectors'
import { RoleE } from '../../enum/roleE'
import { SimpleLoader } from '../../components/Loaders/SimpleLoader'
import { setSchoolName } from '../../store/redux/school/schoolSlice'
import { setSchoolId } from '../../store/redux/school/schoolIdSlice'
import { setHeaderId } from '../../store/redux/school/headerIdSlice'
import { useDispatch } from 'react-redux'


export const ChooseSchool = () => {
  const navigate = useNavigate()
  const [getSchools, { isSuccess: userSuccess }] = useGetSchoolsMutation()
  const { role: userRole, userName: name } = useAppSelector(selectUser)

  const [schools, setSchools] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const dispatch = useDispatch()

  useEffect(() => {
    getSchools().then((datas: any) => {
      setIsLoading(false)
      const co = JSON.parse(JSON.stringify(datas))
      setSchools(JSON.parse(co.data))
    })
  }, [])

  type School = {
    school_id: number
    name: string
    header_school: number
  }

  const handleSchool = async (school_id: number, school: string, header_id: number) => {
    await localStorage.setItem('school', school)
    await dispatch(setSchoolName(school))
    await localStorage.setItem('school_id', String(school_id))
    await dispatch(setSchoolId(school_id))
    await localStorage.setItem('header_id', String(header_id))
    await dispatch(setHeaderId(header_id))
    await navigate(
        `${
          userRole === RoleE.SuperAdmin
            ? `/school/${school}/settings/`
            : userRole === RoleE.Teacher
            ? `/school/${school}/` + Path.CourseStats
            : `/school/${school}/` + Path.Courses
        }`)
    await window.location.reload()
  }

  return (
    <div className={styles.bg1}>
      <div className={styles.bg3}>
        {isLoading ? (
          <SimpleLoader style={{ margin: '50px', height: '80px' }} />
        ) : (
          <div>
            <span className={styles.tit}>Выберите школу для входа:</span>
            {schools.map((s: School, index: number) => (
              <Link
                key={index}
                onClick={async e => {
                  e.preventDefault()
                  await handleSchool(s.school_id, s.name, s.header_school)
                }}
                to={`#`}
              >
                <div className={styles.bg}>
                  <div className={styles.name}>{s.name}</div>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
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
  )
}
