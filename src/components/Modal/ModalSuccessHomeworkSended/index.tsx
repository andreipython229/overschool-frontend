import { FC } from 'react'
import { SuccessHomeworkSendedT } from '../ModalTypes'
import styles from './modalSuccessHomeworkSended.module.scss'
import image from './assets/image.svg'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'

export const ModalSuccessHomeworkSended: FC<SuccessHomeworkSendedT> = ({ toggle }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.wrapper_btnClose} onClick={toggle}>
        <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </button>
      <h2>Данные отправлены</h2>
      <h3>
        Статус: <p>Отправлен преподавателю</p>
      </h3>
      <img src={image} className={styles.wrapper_image} />
      <Button variant="newPrimary" text="Обратная связь от преподавателя" onClick={toggle} />
    </div>
  )
}
