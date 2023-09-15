import { FC, memo } from 'react'

import styles from './avatar.module.scss'

type avatarT = {
  width: string
  height: string
  name: string
  surname: string
  avatar: string
}

export const Avatar: FC<avatarT> = memo(({ width, height, name, surname, avatar }) => {
  return (
    <div className={styles.avatar} style={{ width, height }}>
      {avatar ? <img src={`${avatar}`} alt="avatar" /> : `${surname[0] || 'Б'}${name[0] || 'И'}`}
    </div>
  )
})
