import { ChangeEvent, FC, useState } from 'react'
import styles from '../Modal.module.scss'
import { motion } from 'framer-motion'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { Button } from 'components/common/Button/Button'
import Rating from '@mui/material/Rating'
import { Input } from 'components/common/Input/Input/Input'
import { feedback } from '../../../assets/img/common/index'

export type FeedbackT = {
  setShowModal: (value: boolean) => void
}

const variantAnimation = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 1000,
    opacity: 0,
  },
}

export const AddFeedbackModal: FC<FeedbackT> = ({ setShowModal }) => {
  const [userName, setUserName] = useState<string>('')
  const [value, setValue] = useState<number | null>(null)

  const changeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  return (
    <motion.div
      className={styles.main_feedback}
      variants={variantAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: 0.6,
      }}
    >
      <div className={styles.feedback}>
        <div className={styles.feedback_img}>
          <img src={feedback} alt="feedback" />
        </div>
        <span className={styles.main_closed} onClick={() => setShowModal(false)}>
          <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </span>

        <div className={styles.feedback_content}>
          <p className={styles.feedback_content_title}>Оставить отзыв</p>
          <div className={styles.feedback_content_info}>
            <div className={styles.feedback_content_info_rating}>
              <p className={styles.feedback_content_info_rating_title}>Поставьте оценку</p>
              <div className={styles.feedback_content_info_rating_value}>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                />
                <p className={styles.feedback_content_info_rating_title}>{value ? value : 0}/5</p>
              </div>
            </div>
            <div className={styles.feedback_content_info_input}>
              <Input placeholder={'Ваше имя'} onChange={changeUserName} type={'text'} value={userName} name={'user name'} />
            </div>
            <div className={styles.feedback_content_info_textarea}>
              <textarea placeholder="Написать..."></textarea>
            </div>
            <Button
              style={{ width: '100%', marginTop: '36px' }}
              text={'Отправить'}
              type={'button'}
              variant={'newPrimary'}
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
