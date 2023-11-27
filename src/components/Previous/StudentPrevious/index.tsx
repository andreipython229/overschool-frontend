import {FC, useState, useEffect} from 'react'

import {Button} from '../../common/Button/Button'
import {useFetchProfileDataQuery} from 'api/profileService'
import {useLazyLogoutQuery} from '../../../api/userLoginService'
import {useAppDispatch} from 'store/hooks'
import {auth} from '../../../store/redux/users/slice'
import {profileT} from 'types/profileT'

import styles from '../previou.module.scss'

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
        <div className={styles.previous}>
            <div className={styles.previous_infoBlock}>
                <img className={styles.previous_infoBlock_avatar} src={profileData?.avatar} alt=""/>
                <div className={styles.previous_infoBlock_title}>
                    <p className={styles.previous_infoBlock_title_about}>
                        {(!profileData?.user.last_name && !profileData?.user.first_name) ?
                            'Без Имени' :
                            `${profileData?.user.last_name} ${profileData?.user.first_name}`}
                    </p>
                </div>
            </div>
            <div className={styles.previous_btn}>
                <Button
                    variant="delete"
                    onClick={handleLogout}
                    style={{
                        width: '148px',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}
                    text={'Выйти из профиля'}
                />
            </div>
        </div>
    )
}
