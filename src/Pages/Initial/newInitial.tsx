import { useEffect, useState, useRef } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { InitPageHeader } from './newInitialPageHeader'
import { Button } from 'components/common/Button/Button'
import { Footer } from 'components/Footer/index'
import { arrowLeftNewIconPath, arrowRightNewIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import {
  removebg,
  android,
  appstore,
  analytics_new,
  student_nobile_cabinet,
  chat_new,
  constructor,
  hat,
  cam,
  ok,
  chat,
  result,
  mobile,
  comp_new_desktop,
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
  record_new_desktop,
  constructor_desk,
} from '../../assets/img/common/index'

import { Slider } from '../../components/slider/slider'

import styles from './newInitial.module.scss'
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

export const Initial = () => {
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

  return (
    <div className={styles.newInitial}>
      <BackgroundAnimation />
      <InitPageHeader />
      <div className={styles.newInitial_main}>
        <div className={styles.newInitial_main_info}>
          <div className={styles.newInitial_main_info_quality}>
            <div className={styles.newInitial_main_info_quality_text}>
              <p className={styles.newInitial_main_info_quality_text_gradient}>КОГДА КАЧЕСТВО ОБУЧЕНИЯ В ПРИОРИТЕТЕ</p>
              <h1>
                Удобная платформа <br /> <WordSwitcher />
              </h1>
              <h3>Первая белорусская платформа CourseHub для онлайн-обучения с пожизненным бесплатным тарифом. Попробуй прямо сейчас!</h3>
              <Button
                onClick={handleRegistrationUser}
                variant={'newLeaveRequest'}
                text={'Попробовать бесплатно'}
                style={{
                  width: 'min(90%, 300px)',
                  borderRadius: '8px',
                  marginTop: '0rem',
                  fontSize: '1.2rem',
                  color: '#FFFFFF',
                  backgroundColor: '#357EEB',
                  paddingTop: '22px',
                  paddingBottom: '22px',
                  marginBottom: '50px',
                  lineHeight: '1.5vw',
                  height: 'auto',
                }}
              />
            </div>
            <div className={styles.newInitial_main_info_quality_pic}>
              <div className={styles.newInitial_main_info_quality_pic_info}></div>
              <motion.div
                className={styles.newInitial_main_info_quality_pic_analytics}
                initial={{
                  x: 0,
                  y: 0,
                }}
                animate={{
                  x: 20,
                  y: -15,
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
                className={styles.newInitial_main_info_quality_pic_removebg}
                initial={{
                  x: 0,
                  y: 0,
                }}
                animate={{
                  x: -20,
                  y: -15,
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
                className={styles.newInitial_main_info_quality_pic_chatst}
                initial={{
                  x: 0,
                  y: 0,
                }}
                animate={{
                  x: 0,
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
                <img src={chat_new} alt="chatst" />
                <p>Встроенный чат с учениками</p>
              </motion.div>
              <motion.div
                className={styles.newInitial_main_info_quality_pic_dateInf}
                initial={{
                  x: 0,
                  y: 0,
                }}
                animate={{
                  x: 15,
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
                <img src={analytics_new} alt="dateInf" />
                <p>Собственная нейросеть</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.newInitial_main_pros}>
          <MiniBlock title={'Безлимит учеников'} text={'База обучающихся без ограничений'} image={unlimitedImage} />
          <MiniBlock title={'Бесплатное приложение'} text={'Обучение с любых устройств'} image={AnnexImage} />
          <MiniBlock title={'Безлимит гигабайт'} text={'Загружайте файлы без ограничений'} image={gbImage} />
        </div>
        <div className={styles.newInitial_main_intern}>
          <div className={styles.newInitial_main_intern_img}></div>
          <div className={styles.newInitial_main_intern_text}>
            <h2>Бесплатный тариф «Start»</h2>
            <h3>
              Создайте свой курс и сразу запустите продажи. <br /> Без сложных настроек, интеграций и вложений
            </h3>
            <ul>
              <li>1 курс</li>
              <li>Бесплатно навсегда</li>
              <li>Полный функционал платформы</li>
              <li>Возможность протестировать все функции платформы</li>
            </ul>
            <Button onClick={handleRegistrationUser} variant={'newTryForFree'} text={'Попробовать бесплатно'} style={{ borderRadius: '5px' }} />
          </div>
        </div>
        <div className={styles.newInitial_main_create_swiper_navigationButtons}>
          <button
            className={
              activeSlide === 0
                ? styles.newInitial_main_create_swiper_navigationButtons_activeButton
                : styles.newInitial_main_create_swiper_navigationButtons_button
            }
            onClick={() => goToSlide(0)}
          >
            <img src={constructor_desk} alt="constructor" style={{ height: '40px' }} />
            <h5 style={{ margin: '0' }}>ПРОСТОЙ КОНСТРУКТОР ОБУЧЕНИЯ</h5>
          </button>
          <button
            className={
              activeSlide === 1
                ? styles.newInitial_main_create_swiper_navigationButtons_activeButton
                : styles.newInitial_main_create_swiper_navigationButtons_button
            }
            onClick={() => goToSlide(1)}
          >
            <img src={constructor_desk} alt="constructor" style={{ height: '40px' }} />
            <h5>ВСТРОЕННЫЙ ЧАТ С УЧЕНИКАМИ</h5>
          </button>
          <button
            className={
              activeSlide === 2
                ? styles.newInitial_main_create_swiper_navigationButtons_activeButton
                : styles.newInitial_main_create_swiper_navigationButtons_button
            }
            onClick={() => goToSlide(2)}
          >
            <img src={constructor_desk} alt="constructor" style={{ height: '40px' }} />
            <h5>АНАЛИТИКА ОБУЧЕНИЯ</h5>
          </button>
        </div>
        <div className="custom-pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }} />
        <div className={styles.newInitial_main_create}>
          <Swiper
            spaceBetween={30}
            speed={700}
            centeredSlides={true}
            autoplay={{
              delay: 2500, //2500
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            modules={[Autoplay, Pagination]}
            className={styles.newInitial_main_create_swiper}
            onInit={(swiper: any) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <div className={styles.newInitial_main_create_swiper_block}>
                <div className={styles.newInitial_main_create_swiper_block_text}>
                  <h2>Создавайте качественные курсы самостоятельно </h2>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Добавляйте лекции с текстом, видео и презентациями{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={ok} alt="ok" /> Создавайте тесты с авто-проверкой, таймерами и статистикой{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={cam} alt="cam" /> Проверяйте домашние задания и делитесь обратной связью{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Проводите вебинары и онлайн-конференции{' '}
                  </p>
                </div>
                <div className={styles.newInitial_main_create_swiper_block_container}>
                  {/* <div style={{ width: '64px' }}></div> */}
                  <img className={styles.newInitial_main_create_swiper_block_img} src={constructor} alt="constructor" />
                  {/* <button
                    className={styles.newInitial_main_create_swiper_block_arrowRight}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <IconSvg path={arrowRightNewIconPath} viewBoxSize="0 0 64 64" width={64} height={64} />
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.newInitial_main_create_swiper_block}>
                <div className={styles.newInitial_main_create_swiper_block_text}>
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
                    <img src={cam} alt="cam" /> Отдельные чаты для каждого курса и группы <br /> учеников{' '}
                  </p>
                  <p>
                    {' '}
                    <img src={hat} alt="hat" /> Настройки доступов для учеников/преподавателей{' '}
                  </p>
                </div>
                <div className={styles.newInitial_main_create_swiper_block_container}>
                  {/* <button
                    className={styles.newInitial_main_create_swiper_block_arrowRight}
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <IconSvg path={arrowLeftNewIconPath} viewBoxSize="0 0 64 64" width={64} height={64} />
                  </button> */}
                  <img className={styles.newInitial_main_create_swiper_block_img} src={chat} alt="chat" style={{ width: '30vw' }} />
                  {/* <button
                    className={styles.newInitial_main_create_swiper_block_arrowRight}
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <IconSvg path={arrowRightNewIconPath} viewBoxSize="0 0 64 64" width={64} height={64} />
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.newInitial_main_create_swiper_block}>
                <div className={styles.newInitial_main_create_swiper_block_text}>
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
                <div className={styles.newInitial_main_create_swiper_block_container}>
                  {/* <button
                    className={styles.newInitial_main_create_swiper_block_arrowRight}
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <IconSvg path={arrowLeftNewIconPath} viewBoxSize="0 0 64 64" width={64} height={64} />
                  </button> */}
                  <img className={styles.newInitial_main_create_swiper_block_img} src={result} alt="result" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={styles.newInitial_main_mobile}>
          <div className={styles.newInitial_main_mobile_text}>
            <div className={styles.newInitial_main_mobile_container}>
              <div className={styles.newInitial_main_mobile_container_imgwrapper}>
                <img src={mobile} alt="mobile" />
              </div>
              <div className={styles.newInitial_main_mobile_text_button}>
                <h1 style={{ textAlign: 'center' }}>Сделайте обучение удобным и доступным в любой момент</h1>
                <div className={styles.newInitial_main_mobile_text}>
                  <p>
                    Эффективное обучение всегда в кармане: просмотр курсов, общение с кураторами, рейтинги и новости - все это всегда под рукой у
                    учащегося.
                  </p>
                  <p> И даже без интернета!</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <button
                    className={styles.newInitial_main_create_swiper_navigationButtons_activeButton}
                    style={{ width: 'min(300px, 50%)', height: '44px', background: '#357EEB' }}
                    /* onClick={handleRegistrationUser} */
                  >
                    <img src={appstore} alt="appstore" style={{ width: '18px', position: 'static' }} />
                    <h5 style={{ margin: '0', color: '#fffafa' }}>Доступно на Iphone</h5>
                  </button>
                  <button
                    className={styles.newInitial_main_create_swiper_navigationButtons_activeButton}
                    style={{ width: 'min(300px, 50%)', height: '44px', background: '#357EEB' }}
                    /* onClick={handleRegistrationUser} */
                  >
                    <img src={android} alt="android" style={{ width: '16px', position: 'static' }} />
                    <h5 style={{ margin: '0', color: '#fffafa' }}>Доступно на Android</h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.newInitial_main_record}>
          <div className={styles.newInitial_main_record_block}>
            <h2>Запишитесь на бесплатную демонстрацию сервиса</h2>
            <p>За 30 минут покажем основные возможности платформы и ответим на все Ваши вопросы</p>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Записаться на демонстрацию'}
              style={{ color: '#357eeb', backgroundColor: '#cfe2ff', width: 'min(90%, 355px)', borderRadius: '5px' }}
            />
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Смотреть видеообзор'}
              style={{
                backgroundColor: 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#ffffff',
                color: '#ffffff',
                width: 'min(90%, 355px)',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
              }}
            />
          </div>
          <motion.div className={styles.newInitial_main_record_img} whileHover={{ scale: 1.1 }}>
            <img src={comp_new_desktop} alt="comp" />
          </motion.div>
        </div>

        <div className={styles.newInitial_main_feedback}>
          <div className={styles.newInitial_main_slider}>
            <Slider />
          </div>
        </div>
        <div className={styles.newInitial_main_free}>
          <div className={styles.newInitial_main_free_block}>
            <h2>Перенесем ваши курсы с другой платформы бесплатно за 3 дня</h2>
            <p>И подарим до 3-х месяцев подписки! Оставьте заявку и узнайте подробнее:</p>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Узнать подробнее'}
              style={{ color: '#ffffff', backgroundColor: '#357eeb', borderRadius: '5px' }}
            />
          </div>
          <motion.div className={styles.newInitial_main_record_img} whileHover={{ scale: 1.1 }}>
            <img src={record_new_desktop} alt="record_new" />
          </motion.div>
        </div>
        <div className={styles.newInitial_main_system}>
          <h2>30+ интеграций с популярными системами</h2>
          <div className={styles.newInitial_main_system_box}>
            <div className={styles.newInitial_main_system_box_zapier}>
              <img src={zimer} alt="zimer" />
            </div>
            <div className={styles.newInitial_main_system_box_youtube}>
              <img src={youtube} alt="youtube" />
            </div>
            <div className={styles.newInitial_main_system_box_kassa}>
              <img src={kassa} alt="kassa" />
            </div>
            <div className={styles.newInitial_main_system_box_metrika}>
              <img src={metrika} alt="metrika" />
            </div>
            <div className={styles.newInitial_main_system_box_zoom}>
              <img src={zoom} alt="zoom" />
            </div>
            <div className={styles.newInitial_main_system_box_tilda}>
              <img src={tilda} alt="tilda" />
            </div>
            <div className={styles.newInitial_main_system_box_vk}>
              <img src={vk} alt="vk" />
            </div>
            <div className={styles.newInitial_main_system_box_google}>
              <img src={googleanalytics} alt="googleanalytics" />
            </div>
            <div className={styles.newInitial_main_system_box_bitriks}>
              <img src={bitriks} alt="bitriks" />
            </div>
            <div className={styles.newInitial_main_system_box_wordpress}>
              <img src={wordpress} alt="wordpress" />
            </div>
            <div className={styles.newInitial_main_system_box_amocmr}>
              <img src={amocmr} alt="amocmr" />
            </div>
            <div className={styles.newInitial_main_system_box_tbank}>
              <img src={tbank} alt="tbank" />
            </div>
          </div>
        </div>
        <div className={styles.newInitial_main_takeFree}>
          <div className={styles.newInitial_main_takeFree_block}>
            <h2>Попробовать бесплатно</h2>
            <p>Получить бесплатный доступ</p>
            <Button
              onClick={handleRegistrationUser}
              variant={'newTryForFree'}
              text={'Записаться на демонстрацию'}
              style={{
                backgroundColor: 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#ffffff',
                color: '#ffffff',
                width: 'min(80%, 500px)',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
              }}
            />
          </div>
          <div className={styles.newInitial_main_takeFree_block_img}>
            <img src={rocketfree} alt="rocketfree" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
