import { FC, memo } from 'react'
import styles from './socialMediaButton.module.scss'
import { Link } from 'react-router-dom'
import { SocialMediaBtnPropsT } from 'types/componentsTypes'

export const SocialMediaButton: FC<SocialMediaBtnPropsT> = memo(({ path, children }) => {
  return (
    <Link to={path} className={styles.social_btn}>
      {children}
    </Link>
  )
})
