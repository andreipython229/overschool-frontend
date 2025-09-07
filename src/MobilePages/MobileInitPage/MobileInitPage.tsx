import { useEffect, useState, useRef } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { MobileHeader } from 'Pages/Initial/MobileHeader/MobileHeader'
import { Button } from 'components/common/Button/Button'
import { FooterMobile } from 'components/Footer/index_mobile'
import { Slider } from '../../components/slider/sliderMobile'
import {
  removebg,
  student_nobile_cabinet,
  analytics,
  analytics_new,
  chat_new,
  chatst,
  android,
  dateInf,
  constructor,
  hat,
  cam,
  ok,
  chat,
  result,
  mobile,
  comp_new,
  zimer,
  youtube,
  amocmr,
  bitriks,
  googleanalytics,
  tbank,
  tilda,
  vk,
  wordpress,
  zoom,
  kassa,
  metrika,
  rocketfree,
  rocket_new,
  record_new,
  constructor_new,
  appstore,
} from '../../assets/img/common/index'

import styles from './mobileInitPage.module.scss'
import unlimitedImage from './../../assets/img/common/unlimited2.png'
import AnnexImage from './../../assets/img/common/annex.png'
import gbImage from './../../assets/img/common/gb.png'
import { Path } from '../../enum/pathE'
import { motion } from 'framer-motion'
import WordSwitcher from '../../components/WorldSwitcher/worldSwitcher'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import MiniBlock from '../../components/MiniBlocks'
import { BackgroundAnimation } from '../../components/BackgroundAnimation'

export const MobileInitPage = () => {
  const navigate = useNavigate()

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem('utmParams')
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString)
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&')
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`
      navigate(pathWithParams)
    } else {
      navigate(Path.CreateSchool)
    }
  }

  const handleMore = () => {
    navigate(generatePath(Path.Catalog))
  }

  const swiperRef = useRef<SwiperType | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex)
  }
  const [currentTariff, setCurrentTariff] = useState<any | null>(null)

  const updateTariff = (tariff: any) => {
    setCurrentTariff(tariff)
  }

  return (
    <div className={styles.init}>
      <BackgroundAnimation />
      <MobileHeader />
      <div className={styles.init_main}>
        <div className={styles.init_main_info}>
          <div className={styles.init_main_info_quality}>
            <div className={styles.init_main_info_quality_text}>
              <p style={{ color: '#324195', marginBottom: '1rem' }}>
                КОГДА КАЧЕСТВО ОБУЧЕНИЯ <br /> В ПРИОРИТЕТЕ
              </p>
              <p>
                Удобная платформа <br /> <WordSwitcher />
              </p>
            </div>
          </div>
        </div>
        <div className={styles.init_main_info_quality_pic}>
          <div className={styles.init_main_info_quality_pic_info}></div>
          <motion.div
            className={styles.init_main_info_quality_pic_analytics}
            initial={{
              x: 0,
              y: 0,
            }}
            animate={{
              x: -30,
              y: 10,
            }}
            transition={{
              delay: 0,
              ease: 'easeInOut',
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img src={analytics_new} alt="analytics" />
            <p>Аналитика обучения</p>
          </motion.div>
          <motion.div
            className={styles.init_main_info_quality_pic_removebg}
            initial={{
              x: 0,
              y: 0,
            }}
            animate={{
              x: -20,
              y: -10,
            }}
            transition={{
              delay: 0,
              ease: 'easeInOut',
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img src={student_nobile_cabinet} alt="removebg" />
            <p>Мобильный кабинет ученика</p>
          </motion.div>
          <motion.div
            className={styles.init_main_info_quality_pic_chatst}
            initial={{
              x: 0,
              y: 30,
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={{
              delay: 0,
              ease: 'easeInOut',
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img src={chat_new} alt="chatst" />
            <p>Встроенный чат с учеником</p>
          </motion.div>
          <motion.div
            className={styles.init_main_info_quality_pic_dateInf}
            initial={{
              x: 0,
              y: 0,
            }}
            animate={{
              x: 18,
              y: -4,
            }}
            transition={{
              delay: 0,
              ease: 'easeInOut',
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img src={analytics_new} alt="dateInf" />
            <p>Собственная нейросеть</p>
          </motion.div>
        </div>
        <div className={styles.main_p}>
          <p>
            Первая белорусская платформа Overschool для онлайн-обучения с пожизненным бесплатным тарифом. <br></br>Попробуй прямо сейчас!
          </p>
        </div>
        <Button
          onClick={handleRegistrationUser}
          variant={'newLeaveRequest'}
          text={'Попробовать бесплатно'}
          style={{
            width: '90%',
            borderRadius: '8px',
            marginTop: '0rem',
            fontSize: '15px',
            color: '#FFFFFF',
            backgroundColor: '#357EEB',
            paddingTop: '22px',
            paddingBottom: '22px',
            marginBottom: '50px',
          }}
        />
        <div className={styles.init_main_create}>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={15}
            centeredSlides={true}
            autoplay={{
              delay: 2500, //вернуть 2500
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className={styles.init_main_create_swiper}
            onInit={(swiper: any) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide style={{ width: '300px' }}>
              <div className={styles.init_main_pros}>
                <MiniBlock title={'Безлимит учеников'} text={'База обучающихся без ограничений'} image={unlimitedImage} />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '300px' }}>
              <div className={styles.init_main_pros}>
                <MiniBlock title={'Бесплатное приложение'} text={'Обучение с любых устройств'} image={AnnexImage} />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '300px' }}>
              <div className={styles.init_main_pros}>
                <MiniBlock title={'Безлимит гигабайт'} text={'Загружайте файлы без ограничений'} image={gbImage} />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={styles.init_main_free} style={{ marginTop: '2rem' }}>
          <motion.div className={styles.init_main_intern_img} whileHover={{ scale: 1.1 }}>
            <img
              src={rocket_new}
              alt="rocket"
              className={styles.init_main_intern_img_img}
              style={{ width: '100%', marginTop: '-15%', marginLeft: '25%' }}
            />
          </motion.div>
          <div className={styles.init_main_free_block}>
            <h2 style={{ width: '100%' }}>Бесплатный тариф «Intern»</h2>
            <p>
              Создайте свой курс и сразу запустите продажи. <br /> Без сложных настроек, интеграций и вложений
            </p>
            <ul>
              <li>1 курс</li>
              <li>Бесплатно навсегда</li>
              <li>Полный функционал платформы</li>
              <li>Возможность протестировать все функции платформы</li>
            </ul>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Попробовать бесплатно'}
              style={{
                width: 'min(100%, 350px)',
                borderRadius: '5px',
                marginTop: '1rem',
                fontSize: '15px',
                color: '#357EEB',
                paddingTop: '22px',
                paddingBottom: '22px',
              }}
            />
          </div>
        </div>
        <div className={styles.init_main_create}>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500, //вернуть 2500
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className={styles.init_main_create_swiper}
            onInit={(swiper: any) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <button className={styles.init_main_create_swiper_navigationButtons_activeButton} onClick={() => goToSlide(0)}>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                  <h5 style={{ margin: '0' }}>Простой конструктор обучения</h5>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                </button>
                <img className={styles.init_main_create_swiper_block_img} src={constructor} alt="constructor" />
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Создавайте качественные курсы самостоятельно </h2>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Добавляйте лекции с текстом, видео и презентациями{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={ok} alt="ok" /> Создавайте тесты с авто-проверкой, таймерами <br /> и статистикой{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={cam} alt="cam" /> Проверяйте домашние задания и делитесь обратной связью{' '}
                  </p>
                  <p style={{ paddingBottom: '1rem' }}>
                    {' '}
                    <img src={hat} alt="hat" /> Проводите вебинары и онлайн-конференции{' '}
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <button className={styles.init_main_create_swiper_navigationButtons_activeButton} onClick={() => goToSlide(1)}>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                  <h5>Встроенный чат с учениками</h5>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                </button>
                <img className={styles.init_main_create_swiper_block_img} src={chat} style={{ width: 'min(230px, 60vw)' }} alt="chat" />
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Общение и обучение в одном месте </h2>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Каналы, групповые чаты и личные сообщения{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={ok} alt="ok" /> Обмен файлами любого формата{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={cam} alt="cam" /> Отдельные чаты для каждого курса и группы учеников{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Настройки доступов для учеников/преподавателей{' '}
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <button className={styles.init_main_create_swiper_navigationButtons_activeButton} onClick={() => goToSlide(2)}>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                  <h5>Аналитика обучения</h5>
                  <img src={constructor_new} alt="constructor" style={{ height: '16px' }} />
                </button>
                <img className={styles.init_main_create_swiper_block_img} src={result} alt="result" />
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Легко управляйте обучением и следите за результатами</h2>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Добавляйте учеников вручную и автоматически по API{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={ok} alt="ok" /> Автоматизируйте открытие занятий по расписанию{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={cam} alt="cam" /> Выдавайте доступ к курсам на время{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Детально отслеживайте результаты обучения{' '}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={styles.init_main_mobile}>
          <div className={styles.init_main_mobile_text}>
            <h1>Сделайте обучение удобным и доступным в любой момент</h1>
            <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <img src={mobile} alt="mobile" />
            </div>
            <div className={styles.init_main_mobile_text_button}>
              <button
                className={styles.init_main_create_swiper_navigationButtons_activeButton}
                style={{ width: '40vw', height: '44px', background: '#357EEB' }}
                /* onClick={handleRegistrationUser} */
              >
                <img src={appstore} alt="appstore" style={{ width: '18px', position: 'static' }} />
                <h5 style={{ margin: '0', color: '#fffafa' }}>App Store</h5>
              </button>
              <button
                className={styles.init_main_create_swiper_navigationButtons_activeButton}
                style={{ width: '40vw', height: '44px', background: '#357EEB' }}
                /* onClick={handleRegistrationUser} */
              >
                <img src={android} alt="android" style={{ width: '16px', position: 'static' }} />
                <h5 style={{ margin: '0', color: '#fffafa' }}>PlayMarket</h5>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.init_main_free} style={{ marginTop: '5rem' }}>
          <motion.div className={styles.init_main_intern_img} whileHover={{ scale: 1.1 }}>
            <img src={comp_new} alt="comp" className={styles.init_main_intern_img_img} style={{ width: '70%', marginTop: '-19%' }} />
          </motion.div>
          <div className={styles.init_main_free_block}>
            <h2>Запишитесь на бесплатную демонстрацию сервиса</h2>
            <p>За 30 минут покажем основные возможности платформы и ответим на все Ваши вопросы</p>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Записаться на демонстрацию'}
              style={{
                width: 'min(100%, 350px)',
                borderRadius: '5px',
                marginTop: '1rem',
                fontSize: '15px',
                color: '#357EEB',
                paddingTop: '22px',
                paddingBottom: '22px',
              }}
            />
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Смотреть видеообзор'}
              style={{
                width: 'min(100%, 350px)',
                borderRadius: '5px',
                marginTop: '0rem',
                fontSize: '15px',
                color: '#000000',
                backgroundColor: '#CFE2FF',
                paddingTop: '22px',
                paddingBottom: '22px',
              }}
            />
          </div>
        </div>

        <div className={styles.init_main_feedback}>
          <div className={styles.init_main_feedback_header}>
            <p className={styles.init_main_header}>
              Что говорят пользователи
              <br /> Course Hub
            </p>
          </div>
          <div className={styles.init_main_slider}>
            <Slider />
          </div>
        </div>

        <div className={styles.init_main_free}>
          <motion.div className={styles.init_main_intern_img} whileHover={{ scale: 1.1 }}>
            <img src={record_new} alt="record" className={styles.init_main_intern_img_img} style={{ width: '70%', marginTop: '-35%' }} />
          </motion.div>
          <div className={styles.init_main_free_block}>
            <h2>Перенесем ваши курсы с другой платформы бесплатно за 3 дня</h2>
            <p>И подарим до 3-х месяцев подписки! Оставьте заявку и узнайте подробнее:</p>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Узнать подробнее'}
              style={{
                width: 'min(100%, 350px)',
                borderRadius: '5px',
                marginTop: '1rem',
                fontSize: '15px',
                color: '#357EEB',
                paddingTop: '22px',
                paddingBottom: '22px',
              }}
            />
          </div>
        </div>
        <div className={styles.init_main_system}>
          <h2>30+ интеграций с популярными системами</h2>
          <div className={styles.init_main_system_box}>
            <div className={styles.init_main_system_box_zapier}>
              <img src={zimer} alt="zimer" />
            </div>
            <div className={styles.init_main_system_box_youtube}>
              <img src={youtube} alt="youtube" />
            </div>
            <div className={styles.init_main_system_box_kassa}>
              <img src={kassa} alt="kassa" />
            </div>
            <div className={styles.init_main_system_box_metrika}>
              <img src={metrika} alt="metrika" />
            </div>
            <div className={styles.init_main_system_box_zoom}>
              <img src={zoom} alt="zoom" />
            </div>
            <div className={styles.init_main_system_box_tilda}>
              <img src={tilda} alt="tilda" />
            </div>
            <div className={styles.init_main_system_box_vk}>
              <img src={vk} alt="vk" />
            </div>
            <div className={styles.init_main_system_box_google}>
              <img src={googleanalytics} alt="googleanalytics" />
            </div>
            <div className={styles.init_main_system_box_bitriks}>
              <img src={bitriks} alt="bitriks" />
            </div>
            <div className={styles.init_main_system_box_wordpress}>
              <img src={wordpress} alt="wordpress" />
            </div>
            <div className={styles.init_main_system_box_amocmr}>
              <img src={amocmr} alt="amocmr" />
            </div>
            <div className={styles.init_main_system_box_tbank}>
              <img src={tbank} alt="tbank" />
            </div>
          </div>
        </div>
        <FooterMobile schoolTariffPlan={updateTariff} />
      </div>
    </div>
  )
}
