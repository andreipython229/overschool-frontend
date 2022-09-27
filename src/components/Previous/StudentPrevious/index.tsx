import { FC } from 'react'

import { Button } from '../../common/Button/Button'
import { useFetchProfileDataQuery } from '../../../api/profileService'

import styles from '../previou.module.scss'

export const StudentPrevious: FC = () => {
  const { data } = useFetchProfileDataQuery(1)

  console.log(data)

  return (
    <div className={styles.previous}>
      <div className={styles.previous_infoBlock}>
        <img className={styles.previous_infoBlock_avatar} src={data?.avatar_url} alt="" />
        <div className={styles.previous_infoBlock_title}>
          <p className={styles.previous_infoBlock_title_about}>{`${data?.user?.first_name} ${data?.user?.last_name} `}</p>
        </div>
      </div>
      <div className={styles.previous_btn}>
        <Button
          variant="primary"
          style={{
            width: '148px',
            fontSize: '12px',
            fontWeight: '500',
          }}
          text={'Выйти из профиля'}
          // onClick={edit ? onChangeSchoolHeader : handleChangePrevious}
        />
      </div>
    </div>
  )
}
