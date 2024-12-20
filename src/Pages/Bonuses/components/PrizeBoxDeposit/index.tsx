import { FC, useState } from 'react'
import styles from './prizeBoxDeposit.module.scss'
import singleBox from './assets/single.png'
import { Button } from 'components/common/Button/Button'
import { getNounDeclension } from 'utils/getNounDeclension'
import { ISchoolBoxes } from 'api/apiTypes'
import { useGetBoxPaymentLinkMutation } from 'api/schoolBonusService'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

interface IPrizeDeposit {
  openPayment: (link: string, payment: ISchoolBoxes) => void
}

export const PrizeBoxDeposit: FC<ISchoolBoxes & IPrizeDeposit> = ({
  quantity,
  bonus_quantity,
  price,
  icon,
  prizes,
  id,
  auto_deactivation_time,
  openPayment,
  name,
  school,
  is_active,
}) => {
  const schoolName = useAppSelector(schoolNameSelector)
  const [generateLink, { isLoading }] = useGetBoxPaymentLinkMutation()

  const buyClick = () => {
    if (schoolName) {
      const box: ISchoolBoxes = {
        id,
        icon,
        prizes,
        price,
        bonus_quantity,
        quantity,
        auto_deactivation_time,
        name,
        school,
        is_active,
      }
      const form = new FormData()
      form.append('box_id', String(id))
      generateLink({ school: schoolName, data: form })
        .unwrap()
        .then(data => openPayment(data.payment_link, box))
        .catch(err => console.error('smth went wrong', err))
    }
  }

  if (isLoading) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.wrapperBox}>
      <div className={styles.wrapperBox_imageBox}>
        <img src={icon || singleBox} className={styles.wrapperBox_imageBox_image} alt={`${icon}-box`} />
        {bonus_quantity > 0 && (
          <span className={styles.wrapperBox_imageBox_free}>
            <span>+</span>
            <span className={styles.smallPrizeIcon}>
              <span className={styles.smallPrizeIcon_count}>x{bonus_quantity}</span>
            </span>
          </span>
        )}
        <span className={styles.wrapperBox_imageBox_price}>
          <span>{price}BYN</span>
        </span>
      </div>
      <p className={styles.wrapperBox_text}>{`${quantity} ${getNounDeclension(quantity, ['коробка', 'коробки', 'коробок'])}`}</p>
      <Button variant="newTryForFree" text={'Купить'} className={styles.prizeBuy} onClick={buyClick} />
    </div>
  )
}
