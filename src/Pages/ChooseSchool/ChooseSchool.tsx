import {Link, useNavigate} from 'react-router-dom'

import { Path } from '../../enum/pathE'

import styles from './chooseSchool.module.scss'
import { Button } from '../../components/common/Button/Button'
import { useEffect, useState } from 'react'
import { useGetSchoolsMutation } from '../../api/getSchoolService'
import anton from '../../assets/img/common/anton.png'
import {useAppSelector} from "../../store/hooks";
import {selectUser} from "../../selectors";
import {RoleE} from "../../enum/roleE";
import {SimpleLoader} from "../../components/Loaders/SimpleLoader";


export const ChooseSchool = () => {
  const [getSchools, { data, isSuccess: userSuccess }] = useGetSchoolsMutation()
  const navigate = useNavigate()
  const [schools, setSchools] = useState<[]>([])
    const { role: userRole, userName: name} = useAppSelector(selectUser)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
      getSchools().then((datas: any) => {
          setIsLoading(false)
          const co = JSON.parse(JSON.stringify(datas))
          setSchools(JSON.parse(co.data))
      })

  }, [])
  type School = {
    name: string
  }
  return (
    <div className={styles.bg1}>
    <div className={styles.bg3}>
        {isLoading ? <SimpleLoader style={{margin: '50px', height: '80px'}}/> :
           <div><span className={styles.tit}>Выберите школу для входа:</span>
        {schools.map((s: School) => <Link key={0}
                                          to={`${userRole === RoleE.SuperAdmin ? `/school/${s.name}/settings/` : userRole === RoleE.Teacher ? `/school/${s.name}/`+Path.CourseStats : `/school/${s.name}/`+Path.Courses}`}
        ><div className={styles.bg}><div className={styles.name}>{s.name}</div><span>→</span></div></Link>)}
        </div>}</div>
      <div className={styles.bg2}>
       <img src={anton}/>
        <div className={styles.bg2_citate}>Overschool в разы превосходит по функциональности и работоспособности все ранее используемые нами системы.</div>
        <div className={styles.bg2_c}>Антон Селивончик (менеджер)</div>
      </div>
    </div>
  )
}
