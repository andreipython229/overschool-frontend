import { FC, memo } from 'react'
import styles from './socialMediaButton.module.scss'
import { Link } from 'react-router-dom'
import { SocialMediaBtnPropsT } from 'types/componentsTypes'
// import { IconSvg } from 'components/common/IconSvg/IconSvg'
// import { InstagramIconPath } from 'assets/Icons/svgIconPath'

export const SocialMediaButton: FC<SocialMediaBtnPropsT> = memo(({ path, variant }) => {
  return (
    <Link to={path} className={styles.social_btn} target='_blank'>
      {/* <IconSvg width={32} height={32} viewBoxSize="0 0 32 32" path={InstagramIconPath}/> */}
    </Link>
  )
})
