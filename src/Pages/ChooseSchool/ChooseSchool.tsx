import { useNavigate } from 'react-router-dom'

import { Path } from '../../enum/pathE'

import styles from './chooseSchool.module.scss'
import { Button } from '../../components/common/Button/Button'
import { useEffect, useState } from 'react'
import { useGetSchoolsMutation } from '../../api/getSchoolService'
import anton from '../../assets/img/common/anton.png'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../selectors'
import { RoleE } from '../../enum/roleE'
import { SimpleLoader } from '../../components/Loaders/SimpleLoader'

export const ChooseSchool = () => {
  type School = {
    name: string
  }

  const [getSchools, { data, isSuccess, isLoading }] = useGetSchoolsMutation()
  const navigate = useNavigate()
  const [schools, setSchools] = useState<[]>([])
  const { role } = useAppSelector(selectUser)

  useEffect(() => {
    getSchools()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setSchools(data)
    }
  }, [isLoading])

  const onChoose = (s: School) => {
    if (role.valueOf() == RoleE.Admin) navigate('/school/' + s.name + '/courses/')
    if (role.valueOf() == RoleE.Teacher) navigate('/school/' + s.name + '/' + Path.Profile)
  }

  return (
    <div className={styles.bg1}>
      <div className={styles.bg3}>
        {isLoading ? (
          <SimpleLoader style={{ margin: '50px', height: '80px' }} />
        ) : (
          <div>
            <span className={styles.tit}>Выберите школу для входа:</span>
            {schools.map((s: School) => (
              <div
                onClick={() => {
                  onChoose(s)
                }}
                key={0}
                className={styles.bg}
              >
                <div className={styles.name}>{s.name}</div>
                <span>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.bg2}>
        <img src={anton} />
        <div className={styles.bg2_citate}>
          Overschool в разы превосходит по функциональности и работоспособности все ранее используемые нами системы.
        </div>
        <div className={styles.bg2_c}>Антон Селивончик (менеджер)</div>
      </div>
    </div>
  )
}
