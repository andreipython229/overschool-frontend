import { FC, useState } from 'react'
import styles from './bonuses.module.scss'
import p5 from './assets/iconsPng/5.png'
import p10 from './assets/iconsPng/10.png'
import p15 from './assets/iconsPng/15.png'
import p20 from './assets/iconsPng/20.png'
import p25 from './assets/iconsPng/25.png'
import p30 from './assets/iconsPng/30.png'
import p35 from './assets/iconsPng/35.png'
import p40 from './assets/iconsPng/40.png'
import p45 from './assets/iconsPng/45.png'
import p75 from './assets/iconsPng/75.png'
import boxes from './assets/iconsPng/boxes.png'
import courses from './assets/iconsPng/courses.png'
import course from './assets/iconsPng/course.png'
import english from './assets/iconsPng/english.png'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowLeftIconPath, crossIconPath } from 'config/commonSvgIconsPath'
import { AnimatedTabs } from 'components/AnimatedTabs'
import { IPrizeBox, PrizeBoxDeposit } from './components/PrizeBoxDeposit'
import prizeBox from './assets/box.png'
import tip1Image from './assets/tip1.png'
import { motion } from 'framer-motion'
import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'
import { PrizeWinner } from './components/PrizeWinner'
import { useBoolean } from 'customHooks'

const tabs = [{ label: 'Баллы' }, { label: 'Деньги' }]
const boxesArr: IPrizeBox[] = [
  { variant: 'single', count: 1, freeBoxes: 0, price: 5 },
  { variant: 'five', freeBoxes: 2, price: 50, count: 5 },
  { variant: 'ten', count: 10, freeBoxes: 4, price: 100 },
  //   { variant: 'fifty', count: 50, freeBoxes: 10, price: 150 },
  //   { variant: 'hundred', count: 100, freeBoxes: 30, price: 250 },
]

export const BonusesPage: FC = () => {
  const [show, setShow] = useState<boolean>(true)
  const [showTopTips, { onToggle: toggleTips }] = useBoolean(false)
  const [showMore, { onToggle: toggleWinners }] = useBoolean(false)
  const navigate = useNavigate()
  const schoolName = useAppSelector(schoolNameSelector)

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_lights}></div>
      <div className={styles.wrapper_body}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.wrapper_body_prizes}>
            <div className={styles.wrapper_body_prizes_title}>Возможные призы</div>
            <div className={styles.wrapper_body_prizes_icons}>
              <img src={p5} alt="" />
              <img src={p10} alt="" />
              <img src={p15} alt="" />
              <img src={p20} alt="" />
              <img src={p25} alt="" />
              <img src={p30} alt="" />
              <img src={p35} alt="" />
              <img src={p40} alt="" />
              <img src={p45} alt="" />
              <img src={p75} alt="" />
              <img src={boxes} alt="" />
              <img src={courses} alt="" />
              <img src={course} alt="" />
              <img src={english} alt="" />
            </div>
          </div>
          <Button
            variant="newTryForFree"
            text="Вернуться"
            style={{ margin: '0 auto', width: '281px', height: '54px' }}
            onClick={() => navigate(generatePath(`${Path.School}${Path.Courses}`, { school_name: schoolName }))}
          />
        </div>
        <div className={styles.wrapper_body_main}>
          <div className={styles.wrapper_body_main_winners}>
            <div className={styles.wrapper_body_main_winners_header}>
              <h2>Победители</h2>
              <span onClick={toggleWinners}>{showMore ? 'Закрыть': 'Кто еще выйграл'}</span>
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
          <img src={prizeBox} className={styles.wrapper_body_main_box} alt="prize-box" />
          <div className={styles.wrapper_body_main_bottom}>
            <div className={styles.wrapper_body_main_bottom_lasts}>Осталось коробок: 10</div>
            <div className={styles.wrapper_body_main_bottom_buttons}>
              <Button variant="newSecondary" text="1 шт" style={{ color: 'white', borderColor: 'white', padding: '0.3rem 0.3rem' }} />
              <Button variant="newSecondary" text="10 шт" style={{ color: 'white', borderColor: 'white', padding: '0.3rem 0.3rem' }} />
              <Button variant="newPrimary" text="Открыть" />
              <Button variant="newPrimary" text="Купить" />
            </div>
            <div className={styles.wrapper_body_main_bottom_garant}>
              Гарантированный приз через: 10 коробок <span className={styles.bubbleI}>i</span>
            </div>
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
            <div onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>
              <IconSvg path={crossIconPath} viewBoxSize="0 0 14 14" height={30} width={30} />
            </div>
          </div>
          <div className={styles.wrapper_body_deposit_slider}>
            <AnimatedTabs tabs={tabs} />
          </div>
          <div className={styles.wrapper_body_deposit_menu}>
            {boxesArr.map((box, index) => (
              <PrizeBoxDeposit count={box.count} freeBoxes={box.freeBoxes} price={box.price} variant={box.variant} key={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
