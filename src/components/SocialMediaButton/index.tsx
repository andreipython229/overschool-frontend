import { FC, memo, useEffect, useState } from 'react'
import styles from './socialMediaButton.module.scss'
import { Link } from 'react-router-dom'
import { SocialMediaBtnPropsT } from 'types/componentsTypes'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { LinkIconPath, InstagramIconPath, VKIconPath, TelegramIconPath, XIconPath, YoutubeIconPath } from 'assets/Icons/svgIconPath'
import { pathT } from 'types/commonComponentsTypes'

export const SocialMediaButton: FC<SocialMediaBtnPropsT> = memo(({ url, variant }) => {
  const [widthIcon, setWidthIcon] = useState<number>(32)
  const [heightIcon, setHeightIcon] = useState<number>(32)
  const [iconPath, setIconPath] = useState<pathT[]>()
  const [propsStyle, setPropsStyle] = useState<string>('')

  useEffect(() => {
    switch (variant) {
      case 'Link':
        setIconPath(LinkIconPath)
        setPropsStyle(styles.link)
        break
      case 'Instagram':
        setIconPath(InstagramIconPath)
        setPropsStyle(styles.instagram)
        break
      case 'VK':
        setIconPath(VKIconPath)
        setPropsStyle(styles.vk)
        break
      case 'Telegram':
        setIconPath(TelegramIconPath)
        setPropsStyle(styles.telegram)
        setWidthIcon(28)
        setHeightIcon(23)
        break
      case 'X':
        setIconPath(XIconPath)
        setPropsStyle(styles.x)
        break
      case 'Youtube':
        setIconPath(YoutubeIconPath)
        setPropsStyle(styles.youtube)
        break
    }
  }, [variant])

  return (
    <a href={url} className={styles.social_button} target="_blank" rel="noreferrer">
      <IconSvg width={widthIcon} height={heightIcon} viewBoxSize={`0 0 ${widthIcon} ${heightIcon}`} path={iconPath} className={propsStyle}>
        <linearGradient id="gradient_link">
          <stop offset="0%" style={{ stopColor: '#0d28bb' }} />
          <stop offset="100%" style={{ stopColor: '#357eeb' }} />
        </linearGradient>
        <radialGradient id="gradient_instagram" cx="26.56%" cy="107.7%">
          <stop offset="0%" style={{ stopColor: '#ffdd55' }} />
          <stop offset="10%" style={{ stopColor: '#ffdd55' }} />
          <stop offset="50%" style={{ stopColor: '#ff543e' }} />
          <stop offset="100%" style={{ stopColor: '#c837ab' }} />
        </radialGradient>
      </IconSvg>
    </a>
  )
})
