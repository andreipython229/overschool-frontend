import React, { FC } from 'react'

import { Button } from '../../common/Button/Button'

import styles from '../previou.module.scss'

export const StudentPrevious: FC = () => {
  return (
    <div className={styles.previous}>
      <div className={styles.previous_infoBlock}>
        <img className={styles.previous_infoBlock_avatar} src="" alt="" />
        <div className={styles.previous_infoBlock_title}>
          <p className={styles.previous_infoBlock_title_about}>Без имени</p>
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
