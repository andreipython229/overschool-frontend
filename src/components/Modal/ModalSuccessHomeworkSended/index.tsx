import { FC } from 'react'
import { SuccessHomeworkSendedT } from '../ModalTypes'
import styles from './modalSuccessHomeworkSended.module.scss'
import image from './assets/image.svg'
import { Button } from 'components/common/Button/Button'

export const ModalSuccessHomeworkSended: FC<SuccessHomeworkSendedT> = ({ toggle }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Данные отправлены</h2>
      <h3>
        Статус: <p>Отправлен преподавателю</p>
      </h3>
      <img src={image} className={styles.wrapper_image} />
      <Button variant="newPrimary" text="Обратная связь от преподавателя" onClick={toggle}/>
    </div>
  )
}
