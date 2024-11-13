import {FC, useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {Button} from '../../common/Button/Button'
import {useFetchProfileDataQuery} from 'api/profileService'
import {useLazyLogoutQuery} from '../../../api/userLoginService'
import {useAppDispatch, useAppSelector} from 'store/hooks'
import {auth} from '../../../store/redux/users/slice'
import {profileT} from 'types/profileT'
import styles from '../previou.module.scss'
import {Path} from "../../../enum/pathE";
import {logoHeaderLogin, admin, leftArrow} from "../../../assets/img/common";
import {RoleE} from "../../../enum/roleE";
import {selectUser} from "../../../selectors";
import {arrowLeftIconPath} from "../../../config/commonSvgIconsPath";
import {IconSvg} from "../../common/IconSvg/IconSvg";

export const StudentPrevious: FC = () => {
    const dispatch = useAppDispatch()

    const {data, isSuccess} = useFetchProfileDataQuery()

    const [profileData, setProfileData] = useState<profileT>()

    const [logout] = useLazyLogoutQuery()

    const handleLogout = () => {
        dispatch(auth(false))
        logout()
    }

    useEffect(() => {
        isSuccess && setProfileData(data[0])
    }, [isSuccess])

    return (
        <div>
            <p className={styles.previous_infoBlock_title_name}>Профиль</p>
            <div>
                <NavLink to={Path.Courses}>
                    <Button style={{width: '280px',
                        position: 'absolute',
                        top: '40px',
                        height: '55px',
                       fontSize: '18px',
                       fontWeight: '500',}} variant={"emptyInside"} text={'К материалам курса'}>
                    <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
                        </Button>
                </NavLink>
            </div>
         <div className={styles.previous}>
             <img className={styles.background_image_course} src="/images/Изображение курса.png" alt="bg"/>
                {/*<img className={styles.previous_infoBlock_avatar} src="/images/Логотип.png" alt=""/>*/}
                {/*    <p className={styles.previous_infoBlock_title_about}>*/}
                {/*        {(!profileData?.user.last_name && !profileData?.user.first_name) ?*/}
                {/*            'Без Имени' :*/}
                {/*            `${profileData?.user.last_name} ${profileData?.user.first_name}`}*/}
                {/*    </p>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<Link to={Path.Rating}>*/}
            {/*<div className={styles.previous_btn_rate}>*/}
            {/*    <Button*/}
            {/*        variant="primary"*/}
            {/*        style={{*/}
            {/*            width: '148px',*/}
            {/*            fontSize: '12px',*/}
            {/*            fontWeight: '500',*/}
            {/*        }}*/}
            {/*        text={'Рейтинг учеников'}*/}
            {/*    />*/}
            {/*</div>*/}
            {/* </Link>*/}
            {/*<div className={styles.previous_btn}>*/}
            {/*    <Button*/}
            {/*        variant="delete"*/}
            {/*        onClick={handleLogout}*/}
            {/*        style={{*/}
            {/*            width: '148px',*/}
            {/*            fontSize: '12px',*/}
            {/*            fontWeight: '500',*/}
            {/*        }}*/}
            {/*        text={'Выйти из профиля'}*/}
            {/*    />*/}
        </div>
            </div>
    )
}
