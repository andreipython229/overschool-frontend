import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, generatePath } from 'react-router-dom'
import { Portal } from '../../components/Modal/Portal'
import { InitPageHeader } from './newInitialPageHeader'
import { RegistrationModal, LoginModal } from 'components/Modal'
import { useBoolean } from '../../customHooks'
import { Button } from 'components/common/Button/Button'
import { Footer } from 'components/Footer/newindex '
import { removebg, analytics, chatst, dateInf, constructor, hat, cam, ok, chat,
         result, mobile, comp, zimer, youtube, amocmr, bitriks, googleanalytics, tbank, tilda, vk, wordpress, zoom,
          kassa, metrika, rocketfree, record } from '../../assets/img/common/index'
 
import  { Slider }  from '../../components/slider/slider'

import styles from './newInitial.module.scss'

import { RegCodeModal } from '../../components/Modal/RegistrationModal/RegCodeModal'
import { Path } from '../../enum/pathE'
import { motion, useTime } from 'framer-motion'
import   WordSwitcher  from '../../components/WorldSwitcher/worldSwitcher'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'







export const Initial = () => {
  const [currentCourse, setCurrentCourse] = useState<string>('-1')
  const [registrationShow, setRegistrationShow] = useState<boolean>(false)
  const [regCodeShow, setRegCodeShow] = useState<boolean>(false)
  const [isLoginModal, { off: open, on: close }] = useBoolean()
  const navigate = useNavigate()

  const changeCurrentCourse = (id: string) => setCurrentCourse(id)

  

  useEffect(() => {
    if (window.screen.width > 1600) {
      setCurrentCourse('1')
    } else {
      setCurrentCourse('-1')
    }
  }, [window])

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem('utmParams');
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString);
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&');
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`;
      navigate(pathWithParams);
    } else {
      navigate(Path.CreateSchool);
    }
  }

  const handleMore = () => {
    navigate(generatePath(Path.Catalog))
  }


  const swiperRef = useRef<SwiperType | null>(null); 
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); 
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex);
  };

  console.log(activeSlide);
  
  
  
  return (      
    <div className={styles.init}>
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap2}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap3}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap4}></div>
      </div>
      {registrationShow && <RegistrationModal setShowModal={setRegistrationShow} setCodeModal={setRegCodeShow} />}
      {regCodeShow && <RegCodeModal setCodeModal={setRegCodeShow} />}
      {isLoginModal ? (
        <Portal closeModal={close}>
          <LoginModal setShowModal={close} />
        </Portal>
      ) : null}
      <InitPageHeader setLoginShow={open} setRegistrationShow={setRegistrationShow} />
      <div className={styles.init_main}>
        <div className={styles.init_main_info}>
          <div className={styles.init_main_info_quality}>
            <div className={styles.init_main_info_quality_text}>
              <p>КОГДА КАЧЕСТВО ОБУЧЕНИЯ В ПРИОРИТЕТЕ</p>
              <h1>
              Удобная платформа <br /> <WordSwitcher/>
              </h1>
              <h3>
              Первая белорусская платформа Overschool для онлайн-обучения с пожизненным бесплатным тарифом. Попробуй прямо сейчас!
              </h3>
              <Button onClick={handleRegistrationUser} variant={'leaveRequest'} text={'Попробовать бесплатно'}  />
            </div>
            <div className={styles.init_main_info_quality_pic}>
              <div className={styles.init_main_info_quality_pic_info}>
              </div>
              <motion.div className={styles.init_main_info_quality_pic_analytics}
                  initial={{
                    x: -30,
                    y: 40,
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
                      repeatType: "reverse",
              }}>
                
                <img src={analytics} alt="analytics" />
                <p>Аналитика обучения</p>
              </motion.div>
              <motion.div className={styles.init_main_info_quality_pic_removebg}
                    initial={{
                      x: 40,
                      y: 20,
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
                      repeatType: "reverse",
                }}>
                <img src={removebg} alt="removebg" />
                <p>Мобильный кабинет ученика</p>
              </motion.div>
              <motion.div className={styles.init_main_info_quality_pic_chatst}
                    initial={{
                      x: 0,
                      y: 50,
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
                      repeatType: "reverse",
              }}>
                <img src={chatst} alt="chatst" />
                <p>Встроенный чат с учеником</p>
              </motion.div>
              <motion.div className={styles.init_main_info_quality_pic_dateInf}
                  initial={{
                    x: -80,
                    y: -20,
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
                      repeatType: "reverse",
              }}> 
                <img src={dateInf} alt="dateInf" />
                <p>Собственная НЕЙРО-СЕТЬ</p>
              </motion.div>
            </div>
          </div>
          
        </div>
        <div className={styles.init_main_pros}>
          <div className={styles.init_main_pros_unlimited}>
            <h3>Безлимит учеников</h3>
            <p>База обучающихся без ограничений</p>
          </div>
          <div className={styles.init_main_pros_annex}>
            <h3>Бесплатное приложение</h3>
            <p>Обучение с любых устройств</p>
          </div>
          <div className={styles.init_main_pros_gb}>
            <h3>Безлимит гигабайт</h3>
            <p>Загружайте файлы без ограничений</p>
          </div>
        </div>
        <div className={styles.init_main_intern}>
          <div className={styles.init_main_intern_img}>
          </div>
          <div className={styles.init_main_intern_text}>
            <h2>Бесплатный тариф «Intern»</h2>
            <h3>Создайте свой курс и сразу запустите продажи. <br /> Без сложных настроек, интеграций и вложений</h3>
            <ul>
              <li>1 курс</li>
              <li>Бесплатно навсегда</li>
              <li>Полный функционал платформы</li>
              <li>Возможность протестировать все функции платформы</li>
            </ul>
            <Button onClick={handleRegistrationUser} variant={'tryForFree'} text={'Попробовать бесплатно'}/>
          </div>
        </div>
        <div className={styles.init_main_create_swiper_navigationButtons}>
          <button 
            className={activeSlide === 0 ? styles.init_main_create_swiper_navigationButtons_activeButton : styles.init_main_create_swiper_navigationButtons_button} 
            onClick={() => goToSlide(0)}
          >
            <h5>ПРОСТОЙ КОСТРУКТОР ОБУЧЕНИЯ</h5>
          </button>
          <button 
            className={activeSlide === 1 ? styles.init_main_create_swiper_navigationButtons_activeButton : styles.init_main_create_swiper_navigationButtons_button} 
            onClick={() => goToSlide(1)}
          >
            <h5>ВСТРОЕННЫЙ ЧАТ С УЧЕНИКАМИ</h5>
          </button>
          <button 
            className={activeSlide === 2 ? styles.init_main_create_swiper_navigationButtons_activeButton : styles.init_main_create_swiper_navigationButtons_button} 
            onClick={() => goToSlide(2)}
          >
            <h5>АНАЛИТИКА ОБУЧЕНИЯ</h5>
          </button>
        </div>
        <div className={styles.init_main_create}>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable:true,
            }}
            modules={[Autoplay, Pagination]}
            className={styles.init_main_create_swiper}
            onInit={(swiper:any) => { swiperRef.current = swiper; }}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Создавайте качественные курсы самостоятельно </h2>
                  <p> <img src={hat} alt="hat" /> Добавляйте лекции с текстом, видео и презентациями </p>
                  <p> <img src={ok} alt="ok" /> Создавайте тесты с авто-проверкой, таймерами <br /> и статистикой </p>
                  <p> <img src={cam} alt="cam" /> Проверяйте домашние задания и делитесь обратной связью </p>
                  <p> <img src={hat} alt="hat" /> Проводите вебинары и онлайн-конференции </p>
                </div>
                <img src={constructor} alt="constructor" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Общение и обучение в одном месте </h2>
                  <p> <img src={hat} alt="hat" /> Каналы, групповые чаты и личные сообщения </p>
                  <p> <img src={ok} alt="ok" /> Обмен файлами любого формата </p>
                  <p> <img src={cam} alt="cam" /> Отдельные чаты для каждого курса и группы <br /> учеников </p>
                  <p> <img src={hat} alt="hat" /> Настройки доступов для учеников/преподавателей </p>
                </div>
                <img src={chat} alt="chat" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.init_main_create_swiper_block}>
                <div className={styles.init_main_create_swiper_block_text}>
                  <h2>Легко управляйте обучением и следите за результатами</h2>
                  <p> <img src={hat} alt="hat" /> Добавляйте учеников вручную и автоматически по API </p>
                  <p> <img src={ok} alt="ok" /> Автоматизируйте открытие занятий по расписанию </p>
                  <p> <img src={cam} alt="cam" /> Выдавайте доступ к курсам на время </p>
                  <p> <img src={hat} alt="hat" /> Детально отслеживайте результаты обучения </p>
                </div>
                <img src={result} alt="result" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.init_main_mobile}>
          <img src={mobile} alt="mobile" />
          <div className={styles.init_main_mobile_text}>
            <h2>Сделайте обучение удобным и доступным в любой момент</h2>
            <p>Эффективное обучение всегда в кармане: просмотр курсов, общение с кураторами, рейтинги и новости - все это всегда под рукой у учащегося.</p>
            <p> И даже без интернета!</p>
            <div className={styles.init_main_mobile_text_button}>
            <Button onClick={handleRegistrationUser} variant={'mobile'} text={'Доступно на Android'}  />
            <Button onClick={handleRegistrationUser} variant={'mobile'} text={'Доступно на Iphone'}  />
            </div>
          </div>
        </div>
        <div className={styles.init_main_record}>
          <div className={styles.init_main_record_block}>
              <h2>Запишитесь на бесплатную демонстрацию сервиса</h2>
              <p>За 30 минут покажем основные возможности платформы и ответим на все Ваши вопросы</p>
              <Button onClick={handleRegistrationUser} variant={'tryForFree'} text={'Записаться на демонстрацию'}  />
              <Button onClick={handleRegistrationUser} variant={'tryForFree'} text={'Смотреть видеообзор'}  />
          </div>
            <motion.div className={styles.init_main_record_img}
              whileHover={{ scale: 1.1 }}
            >
              <img src={comp} alt="comp"/>
            </motion.div>
        </div>
          
        
          <div className={styles.init_main_feedback}>
            <div className={styles.init_main_feedback_header}>
              <p className={styles.init_main_header}>
              Что говорят пользователи Course Hub
              </p>
            </div>
            <div  className={styles.init_main_slider}>
              <Slider/>
            </div>
          </div>
        <div className={styles.init_main_free}>
            <div className={styles.init_main_free_block}>
              <h2>Перенесем ваши курсы с другой платформы бесплатно за 3 дня</h2>
              <p>И подарим до 3-х месяцев подписки! Оставьте заявку и узнайте подробнее:</p>
              <Button onClick={handleRegistrationUser} variant={'tryForFree'} text={'Узнать подробнее'}  />
            </div>
            <motion.div className={styles.init_main_record_img}
              whileHover={{ scale: 1.1 }}
            >
              <img src={record} alt="record"/>
            </motion.div>
        </div>
        <div className={styles.init_main_system}>
            <h2>30+ интеграций с популярными системами</h2>
            <div className={styles.init_main_system_box}>
              <div className={styles.init_main_system_box_zapier}><img src={zimer} alt="zimer" /></div>
              <div className={styles.init_main_system_box_youtube}><img src={youtube} alt="youtube" /></div>
              <div className={styles.init_main_system_box_kassa}><img src={kassa} alt="kassa" /></div>
              <div className={styles.init_main_system_box_metrika}><img src={metrika} alt="metrika" /></div>
              <div className={styles.init_main_system_box_zoom}><img src={zoom} alt="zoom" /></div>
              <div className={styles.init_main_system_box_tilda}><img src={tilda} alt="tilda" /></div>
              <div className={styles.init_main_system_box_vk}><img src={vk} alt="vk" /></div>
              <div className={styles.init_main_system_box_google}><img src={googleanalytics} alt="googleanalytics" /></div>
              <div className={styles.init_main_system_box_bitriks}><img src={bitriks} alt="bitriks" /></div>
              <div className={styles.init_main_system_box_wordpress}><img src={wordpress} alt="wordpress" /></div>
              <div className={styles.init_main_system_box_amocmr}><img src={amocmr} alt="amocmr" /></div>
              <div className={styles.init_main_system_box_tbank}><img src={tbank} alt="tbank" /></div>
            </div>
        </div>
        <div className={styles.init_main_takeFree}>
            <div className={styles.init_main_takeFree_block}>
              <h2>Попробовать бесплатно</h2>
              <p>Получить бесплатный доступ</p>
              <Button onClick={handleRegistrationUser} variant={'tryForFree'} text={'Узнать подробнее'}  />
            </div>
            <div >
              <img src={rocketfree} alt="rocketfree"/>
            </div>
        </div>
        <Footer/>
      </div>
      
    </div>
  )
}
