import {Link, useNavigate} from 'react-router-dom'

import {Path} from '../../enum/pathE'

import styles from './chooseSchool.module.scss'
import {useEffect, useState} from 'react'
import {useGetSchoolsMutation} from '../../api/getSchoolService'
import anton from '../../assets/img/common/anton.png'
import {useAppSelector} from "../../store/hooks";
import {selectUser} from "../../selectors";
import {RoleE} from "../../enum/roleE";
import {SimpleLoader} from "../../components/Loaders/SimpleLoader";
import {setSchoolName} from "../../store/redux/school/schoolSlice";
import {useDispatch} from "react-redux";


export const ChooseSchool = () => {
    const navigate = useNavigate();

    const [getSchools, {isSuccess: userSuccess}] = useGetSchoolsMutation()
    const {role: userRole, userName: name} = useAppSelector(selectUser)

    const [schools, setSchools] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const dispatch = useDispatch()

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

    const handleSchool = async (school: string) => {
        localStorage.setItem('school', school)
        await dispatch(setSchoolName(school))
    }

    return (
        <div className={styles.bg1}>
            <div className={styles.bg3}>
                {isLoading ? <SimpleLoader style={{margin: '50px', height: '80px'}}/> :
                    <div><span className={styles.tit}>Выберите школу для входа:</span>
                        {schools.map((s: School) =>
                            <Link key={0} onClick={async (e) => {
                                e.preventDefault();
                                await handleSchool(s.name);
                               navigate(`${userRole === RoleE.SuperAdmin ? `/school/${s.name}/settings/` : userRole === RoleE.Teacher ? `/school/${s.name}/` + Path.CourseStats : `/school/${s.name}/` + Path.Courses}`)
                                window.location.reload();
                            }} to={`#`}>
                            <div className={styles.bg}>
                                <div className={styles.name}>{s.name}</div>
                                <span>→</span></div>
                        </Link>)}
                    </div>}</div>
            {/* <div className={styles.bg2}>
                <img src={anton}/>
                <div className={styles.bg2_citate}>Overschool в разы превосходит по функциональности и работоспособности
                    все ранее используемые нами системы.
                </div>
                <div className={styles.bg2_c}>Антон Селивончик (менеджер)</div>
            </div> */}
        </div>
    )
}
