import { FC, useEffect, useState } from 'react'
import styles from './prizeBoxDeposit.module.scss'
import singleBox from './assets/single.png'
import fiveBox from './assets/five.png'
import tenBox from './assets/ten.png'
import { Button } from 'components/common/Button/Button'
import { getNounDeclension } from 'utils/getNounDeclension'

export interface IPrizeBox {
  variant: 'single' | 'five' | 'ten' | 'fifty' | 'hundred'
  price: number
  count: number
  freeBoxes: number
}

export const PrizeBoxDeposit: FC<IPrizeBox> = ({ variant, price, count, freeBoxes }) => {
  const [imageBox, setImageBox] = useState<string>('')

  useEffect(() => {
    if (!imageBox.length) {
      switch (variant) {
        case 'single':
          return setImageBox(singleBox)
        case 'five':
          return setImageBox(fiveBox)
        case 'ten':
          return setImageBox(tenBox)
        case 'fifty':
          return setImageBox(tenBox)
        case 'hundred':
          return setImageBox(tenBox)
      }
    }
  }, [imageBox])

  return (
    <div className={styles.wrapperBox}>
      <div className={styles.wrapperBox_imageBox}>
        <img
          src={imageBox}
          className={styles.wrapperBox_imageBox_image}
          // style={
          //   variant === 'fifty'
          //     ? { width: '202px', height: '162px' }
          //     : variant === 'hundred'
          //     ? { width: '286px', height: '229px' }
          //     : variant === 'single'
          //     ? { width: '106px', height: '106px' }
          //     : { width: '156px', height: '120px' }
          // }
          alt={`${count}-box`}
        />
        {freeBoxes > 0 && (
          <span className={styles.wrapperBox_imageBox_free}>
            <span>+</span>
            <span className={styles.smallPrizeIcon}>
              <span className={styles.smallPrizeIcon_count}>x{freeBoxes}</span>
            </span>
          </span>
        )}
        <span className={styles.wrapperBox_imageBox_price}>
        <span>{price}$</span>
      </span>
      </div>
      <p className={styles.wrapperBox_text}>{`${count} ${getNounDeclension(count, ['коробка', 'коробки', 'коробок'])}`}</p>
      <Button variant="newTryForFree" text={'Купить'} className={styles.prizeBuy} />
    </div>
  )
}
