import { FC, useEffect, useState } from 'react'
import styles from './bonuses.module.scss'
import p20 from './assets/iconsPng/20.png'
import boxes from './assets/iconsPng/boxes.png'
import noPrize from './assets/noPrize.png'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { AnimatedTabs } from 'components/AnimatedTabs'
import { PrizeBoxDeposit } from './components/PrizeBoxDeposit'
import prizeBox from './assets/box.png'
import tip1Image from './assets/tip1.png'
import { motion } from 'framer-motion'
import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'
import { PrizeWinner } from './components/PrizeWinner'
import { useBoolean } from 'customHooks'
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth'
import { Prize } from './components/Prize'
import { useFetchSchoolBoxesQuery, useFetchSchoolPrizesQuery, useFetchUserBoxesQuery, useOpenUserBoxMutation } from 'api/schoolBonusService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { IBox, IPrize, ISchoolBoxes } from 'api/apiTypes'
import { AnimatedModal } from 'components/Modal/AnimatedModal'

const tabs = [{ label: 'Баллы' }, { label: 'Деньги' }]

export const BonusesPage: FC = () => {
  const schoolName = useAppSelector(schoolNameSelector)
  const { data: userBoxes } = useFetchUserBoxesQuery(schoolName)
  const { data: schoolBoxes } = useFetchSchoolBoxesQuery(schoolName)
  const { data: schoolPrizes } = useFetchSchoolPrizesQuery(schoolName)
  const [openNewBox, { isLoading: isOpeningBox }] = useOpenUserBoxMutation()
  const [show, setShow] = useState<boolean>(true)
  const [showTopTips, { onToggle: toggleTips }] = useBoolean(false)
  const [showMore, { onToggle: toggleWinners }] = useBoolean(false)
  const [isOpening, { onToggle: toggleBox, off: showOpening, on: hideOpening }] = useBoolean(false)
  const [isOpen, { onToggle: toggleOpenBox, off: showPrize }] = useBoolean(false)
  const [unopenedCount, setUnopenedCount] = useState<number>(0)
  const [userPrize, setUserPrize] = useState<IPrize | null>(null)
  const [userWonPrize, setUserWonPrize] = useState<boolean>(false)
  const [paymentLink, setPaymentLink] = useState<string>('')
  const [order, setOrder] = useState<ISchoolBoxes>()
  const [isShowPayment, { off: showPayment, on: hidePayment }] = useBoolean(false)
  const navigate = useNavigate()

  const openPayment = (link: string, payment: ISchoolBoxes) => {
    setOrder(payment)
    setPaymentLink(link)
    showPayment()
  }

  const closePayment = () => {
    setOrder(undefined)
    setPaymentLink('')
    hidePayment()
  }

  useEffect(() => {
    if (isOpeningBox) {
      showOpening()
      setTimeout(hideOpening, 2000)
      setTimeout(showPrize, 2000)
    }
  }, [isOpeningBox])

  useEffect(() => {
    if (userBoxes && userBoxes.length > 0) {
      const count = userBoxes.reduce((total: number, box: IBox) => total + box.unopened_count, 0)
      if (count > 0) {
        setUnopenedCount(count)
      }
    }
  }, [userBoxes])

  const openBox = () => {
    if (!isOpeningBox && !isOpen && unopenedCount > 0 && userBoxes && userBoxes.length > 0) {
      openNewBox({ schoolName, boxId: userBoxes[0].box_id })
        .unwrap()
        .then(data => {
          setUserPrize(data.prize)
          setUserWonPrize(true)
        })
        .catch(err => console.log('smth went wrong =>', err))
    }
  }

  const repeatOpening = () => {
    if (isOpen) {
      setUserWonPrize(false)
      toggleOpenBox()
    }
  }

  if (!userBoxes || !schoolBoxes || !schoolPrizes) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_lights}></div>
      {isOpening && <div className={styles.wrapper_openingLights}></div>}
      <div className={styles.wrapper_body} style={isOpen ? (userWonPrize ? {} : { backdropFilter: 'grayscale(100%)' }) : {}}>
        {isOpen ? (
          <div></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className={styles.wrapper_body_prizes}>
              <div className={styles.wrapper_body_prizes_title}>Возможные призы</div>
              <div className={styles.wrapper_body_prizes_icons}>
                {schoolPrizes.map(prize => (
                  <img src={prize.icon} alt={prize.name} key={prize.id} />
                ))}
              </div>
            </div>
            <Button
              variant="newTryForFree"
              text="Вернуться"
              style={{ margin: '0 auto', width: '281px', height: '54px' }}
              onClick={() => navigate(generatePath(`${Path.School}${Path.Courses}`, { school_name: schoolName }))}
            />
          </div>
        )}
        <div className={styles.wrapper_body_main}>
          {isOpen ? (
            <div className={styles.wrapper_body_main_winners}>
              <div className={styles.wrapper_body_main_winners_header} style={{ justifyContent: 'center' }}>
                {userWonPrize ? <h2>Вы выиграли!</h2> : <h2>Выигрыша нет :(</h2>}
              </div>
              {userWonPrize && userPrize && (
                <div className={styles.wrapper_body_main_winners_list} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Prize image={userPrize.icon} header={userPrize.name} description="" />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.wrapper_body_main_winners}>
              <div className={styles.wrapper_body_main_winners_header}>
                <h2>Победители</h2>
                <span onClick={toggleWinners}>{showMore ? 'Закрыть' : 'Кто еще выйграл'}</span>
              </div>
              <div className={styles.wrapper_body_main_winners_list}>
                <PrizeWinner />
                <PrizeWinner />
              </div>
              <div className={styles.wrapper_body_main_winners_tipsButton}>
                <span onClick={toggleTips}>i</span>
                {showTopTips && (
                  <div className={styles.wrapper_body_main_winners_tipsButton_tips}>
                    <div className={styles.wrapper_body_main_winners_tipsButton_tips_tip}>
                      <img src={tip1Image} alt="first-tip" />
                      <p>Призы внутри коробки выбираются случайным образом, но с определёнными шансами на выпадение редких и эпических призов.</p>
                    </div>
                    <div className={styles.wrapper_body_main_winners_tipsButton_tips_tip}>
                      <p>Для открытия коробок нужны ключи, которые можно получить за выполнение заданий или купить.</p>
                      <img src={boxes} alt="keys-tip" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <img src={isOpen ? (userWonPrize ? userPrize?.icon : noPrize) : prizeBox} className={styles.wrapper_body_main_box} alt="prize-box" />
          <div className={styles.wrapper_body_main_bottom}>
            {isOpen ? <></> : <div className={styles.wrapper_body_main_bottom_lasts}>Осталось коробок: {unopenedCount}</div>}
            {isOpen ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant="newPrimary" text={userWonPrize ? 'Получить приз' : 'Попробовать еще'} onClick={repeatOpening} />
              </div>
            ) : (
              <div className={styles.wrapper_body_main_bottom_buttons}>
                <Button variant="newSecondary" text="1 шт" style={{ color: 'white', borderColor: 'white', padding: '0.3rem 0.3rem' }} />
                <Button variant="newSecondary" text="10 шт" style={{ color: 'white', borderColor: 'white', padding: '0.3rem 0.3rem' }} />
                <Button variant="newPrimary" text="Открыть" onClick={openBox} />
                <Button variant="newPrimary" text="Купить" onClick={() => setShow(true)} />
              </div>
            )}
            {!userWonPrize && userBoxes.length > 0 && typeof userBoxes[0].remaining_to_guarantee === 'number' && (
              <div className={styles.wrapper_body_main_bottom_garant}>
                Гарантированный приз через: {userBoxes[0].remaining_to_guarantee} коробок <span className={styles.bubbleI}>i</span>
              </div>
            )}
          </div>
        </div>
        {!show && (
          <div className={styles.showBtnWrapper} onClick={() => setShow(true)}>
            <IconSvg path={arrowLeftIconPath} viewBoxSize="0 0 24 24" width={30} height={30} />
          </div>
        )}
        <motion.div className={`${show ? '' : styles.hide} ${styles.wrapper_body_deposit}`}>
          <div className={styles.wrapper_body_deposit_header}>
            <p>Коробки</p>
            <div onClick={() => setShow(!show)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconSvg path={closeHwModalPath} viewBoxSize="0 0 17 17" height={30} width={30} />
            </div>
          </div>
          <div className={styles.wrapper_body_deposit_slider}>
            <AnimatedTabs tabs={tabs} />
          </div>
          <div className={styles.wrapper_body_deposit_menu}>
            {schoolBoxes.map((box, index) => (
              <PrizeBoxDeposit
                prizes={box.prizes}
                auto_deactivation_time={box.auto_deactivation_time}
                quantity={box.quantity}
                id={box.id}
                name={box.name}
                is_active={box.is_active}
                school={box.school}
                bonus_quantity={box.bonus_quantity}
                icon={box.icon}
                price={box.price}
                key={index}
                openPayment={openPayment}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatedModal handleClose={closePayment} show={isShowPayment}>
        <div className={styles.paymentModal}>
          <h3 className={styles.paymentModal_title}>Подтверждение заказа</h3>
          <div className={styles.paymentModal_paymentInfo}>
            <p>Информация о заказе:</p>
            {order && (
              <ul>
                <li>Заказ: {order.name}</li>
                <li>Количество коробок: {`${order.quantity} ${order.bonus_quantity > 0 ? `+ ${order.bonus_quantity} бонусные` : ''}`}</li>
                <li>Стоимость: {order.price}$</li>
              </ul>
            )}
            <p>Для совершения оплаты перейдите по ссылке ниже:</p>
          </div>
          <a href={paymentLink} rel="noreferrer" target="_blank">
            Перейти к оплате
          </a>
        </div>
      </AnimatedModal>
    </div>
  )
}
