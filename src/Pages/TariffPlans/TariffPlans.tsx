import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlans.module.scss'
import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { FC, useEffect, useState} from 'react'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'
import middle from './images/middle.png'
import whiteStudent from './images/whiteStudent.png'
import add from './images/add.png'
import prizeStart from './images/prizeStart.png'
import prizePersonal from './images/prizePersonal.png'
import banner from './images/banner.png'
import hit from './images/hit.png'
import addMobile from './images/addMobile.png'
import start from './images/start.png'
import senior from './images/senior.png'
import startMobile from './images/startMobile.png'
import personalMobile from './images/personalMobile.png'
import {Path} from "../../enum/pathE"
import { motion } from 'framer-motion'
import {generatePath, useNavigate} from "react-router-dom"
import { CloudIconPath, PeopleIconPath, CheckIconPath, ClipboardListIconPath, ConfigurationIconPath, CrossIconPath,
        MailNotificationsIconPath, UserIconPath } from 'assets/Icons/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import {coursesStatsNavPath} from 'components/Navbar/config/svgIconPath'
import useDeviceDetect from './useDeviceDetect'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { CheckButton } from './CheckButton'

export const TariffPlans: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()
  const { role } = useAppSelector(selectUser)
  const [isModalOpen, { off: open, on: close }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT>()
  const tariff = useAppSelector(state => state.tariff.data)
  const [isActive, { onToggle: toggleActive }] = useBoolean(banner.is_active)
  const navigate = useNavigate()
  const { isMobile } = useDeviceDetect()

  const handleRegistrationUser = () => {
      navigate(generatePath(Path.CreateSchool))
  }

  const handleClick = (plan: TariffPlanT) => {
    setSelected(plan)
    open()
  }

  const isLowerTariff = (tariffName: string) => {
    if (tariff && tariffPlanTable) {
      const indexPanel = tariffPlanTable?.findIndex(value => value.name === tariffName)
      const indexCurrentTarrif = tariffPlanTable?.findIndex(value => value.name === tariff?.tariff_name)

      if (indexCurrentTarrif > indexPanel) {
        return true
      } else return false
    }
  }

  useEffect(() => {
    if (data) {
      const table = [...data]
      setTariffPlanTable(table.sort((obj1, obj2) => Number(obj1.price) - Number(obj2.price)))
    }
  }, [isSuccess, data])

  if (isFetching) {
    return <SimpleLoader />
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 1000,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
        ease: 'easeInOut',
        duration: 1.3,
      }}
    >
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
      <section className={styles.TariffPlansPage} style={{height: "100%"}}>
        <div className={styles.TariffPlansPage_plansBlock}>
          <p className={styles.TariffPlansPage_changePlane}>Смена тарифного плана</p>
          <div className={styles.TariffPlansPage_header}>
            Тарифные планы для обучения CourseHub
          </div>
            <CheckButton toggleChecked={toggleActive} isChecked={isActive}/>
        {isMobile?
            <div>
            <Swiper
              spaceBetween={20}
              centeredSlides={true}
              setWrapperSlide={true}
              slidesPerView={3}
              autoplay={{
                disableOnInteraction: false,

              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className={styles.TariffPlansPage_plansBlock_cardGroup}
              >
            {tariffPlanTable?.map((plan, index: number) => (
              index === 0 ?
                <SwiperSlide key={index} className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard}>
                    <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard_planName}>{plan.name}</h3>
                      <div className={styles.text}>
                        <div><img src={start} alt='start'/></div>
                        {isActive === false ?
                        <div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>мес</span>
                        </div>
                        :<div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>год</span>
                        </div>
                        }
                         {role === RoleE.Admin &&
                          (tariff ? (
                            tariff.tariff_name === plan.name ? (
                              // <Button text={'Отменить подписку'} variant={'delete'} />
                              <button disabled>Текущий тариф</button>
                            ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                              <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                <button className={styles.planCardBtn}
                                  onClick={() => {
                                    // handleClick(plan)
                                    console.log('Функционал временно отключен')
                                  }}>Подключить
                                </button>
                              </a>
                            ) : (
                              <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                            )
                          ) : (
                            <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                              <button className={styles.planCardBtn}
                                onClick={() => {
                                // handleClick(plan)
                                console.log('Функционал временно отключен')}}>Подключить
                              </button>
                            </a>
                          ))}
                            <hr />
                            <ul>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath}  />
                                </span>
                                <span className={styles.blueLabel}>Безлимит ГБ</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курса</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                              </li>
                              <div className={styles.label}>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>White Label</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>Свой домен</span>
                              </li>
                              </div>
                            </ul>
                          </div>

                    </SwiperSlide>
                  :index === 1 ?
                    <SwiperSlide key={index} className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard} >
                      <div >
                        <div style={{display:'flex', alignItems: 'right', justifyContent: 'right'}}>
                          <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_planName}>{plan.name}</h3>
                            <div style={{ display:'flex'}}>
                              <img className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_imgHit} src={hit} alt='hit'/>
                              <div className={styles.hit}>Хит</div>
                            </div>
                         </div>
                        <div className={styles.text}>
                          <div className={styles.middleImg}><img src={middle} alt='middle'/></div>
                          {isActive === false ?
                          <div className={styles.text_priceWrap}>
                            <span className={styles.text_price}>
                              {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                            </span>
                            <span className={styles.text_priceTo}>мес</span>
                          </div>
                          :<div className={styles.text_priceWrap}>
                            <span className={styles.text_price}>
                              {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                            </span>
                            <span className={styles.text_priceTo}>год</span>
                          </div>
                          }
                           {role === RoleE.Admin &&
                            (tariff ? (
                              tariff.tariff_name === plan.name ? (
                                // <Button text={'Отменить подписку'} variant={'delete'} />
                                <button disabled>Текущий тариф</button>
                              ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                                <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                  <button className={styles.planCardBtn}
                                    onClick={() => {
                                      // handleClick(plan)
                                      console.log('Функционал временно отключен')
                                    }}>Подключить
                                  </button>
                                </a>
                              ) : (
                                <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                              )
                            ) : (
                              <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                <button className={styles.planCardBtn}
                                  onClick={() => {
                                  // handleClick(plan)
                                  console.log('Функционал временно отключен')}}>Подключить
                                </button>
                              </a>
                            ))}
                              <hr />
                              <ul>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                                  </span>
                                  <span className={styles.blueLabel}>Безлимит ГБ</span>
                                </li>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                  </span>
                                  <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курсов</span>
                                </li>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                  </span>
                                  <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                                </li>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                  </span>
                                  <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудника</span>
                                </li>
                                <div className={styles.label}>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                  </span>
                                  <span className={styles.blackLabel}>White Label</span>
                                </li>
                                <li style={{display:'flex', alignItems:'center'}}>
                                  <span style={{display:'flex', alignItems:'center'}}>
                                    <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                  </span>
                                  <span className={styles.blackLabel}>Свой домен</span>
                                </li>
                                </div>
                              </ul>
                            </div>
                          </div>
                        </SwiperSlide>
                  :index === 2 ?
                    <SwiperSlide key={index} className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard}>
                      <div>
                        <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard_planName}>{plan.name}</h3>
                          <div className={styles.text}>
                            <div><img src={senior} alt='senior'/></div>
                            {isActive === false ?
                            <div className={styles.text_priceWrap}>
                              <span className={styles.text_price}>
                                {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                              </span>
                              <span className={styles.text_priceTo}>мес</span>
                            </div>
                            :<div className={styles.text_priceWrap}>
                              <span className={styles.text_price}>
                                {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                              </span>
                              <span className={styles.text_priceTo}>год</span>
                            </div>
                            }
                             {role === RoleE.Admin &&
                                (tariff ? (
                                  tariff.tariff_name === plan.name ? (
                                    // <Button text={'Отменить подписку'} variant={'delete'} />
                                    <button disabled>Текущий тариф</button>
                                  ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                                    <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                      <button className={styles.planCardBtn}
                                        onClick={() => {
                                          // handleClick(plan)
                                          console.log('Функционал временно отключен')
                                        }}>Подключить
                                      </button>
                                    </a>
                                  ) : (
                                    <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                                  )
                                ) : (
                                  <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                    <button className={styles.planCardBtn}
                                      onClick={() => {
                                      // handleClick(plan)
                                      console.log('Функционал временно отключен')}}>Подключить
                                    </button>
                                  </a>
                                ))}
                                <hr />
                                <ul>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                                    </span>
                                    <span className={styles.whiteLabel}>Безлимит ГБ</span>
                                  </li>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                    </span>
                                    <span className={styles.whiteLabel}>{plan.number_of_courses || '∞'} курсов</span>
                                  </li>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                    </span>
                                    <span className={styles.whiteLabel}>{plan.students_per_month || '∞'} учеников</span>
                                  </li>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                    </span>
                                    <span className={styles.whiteLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                                  </li>
                                  <div className={styles.label}>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                    </span>
                                    <span className={styles.whiteLabelCheck}>White Label</span>
                                  </li>
                                  <li style={{display:'flex', alignItems:'center'}}>
                                    <span style={{display:'flex', alignItems:'center'}}>
                                      <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                    </span>
                                    <span className={styles.whiteLabelCheck}>Свой домен</span>
                                  </li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                          </SwiperSlide>
                      : null
                    ))}
                   </Swiper>
                   </div>
                :
                <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
                  {tariffPlanTable?.map((plan, index: number) => (
                  index === 0 ?
                  <div className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard} key={index}>
                    <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard_planName}>{plan.name}</h3>
                      <div className={styles.text}>
                        <div><img src={start} alt='start'/></div>
                        {isActive === false ?
                        <div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>мес</span>
                        </div>
                        :<div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>год</span>
                        </div>
                        }
                         {role === RoleE.Admin &&
                          (tariff ? (
                            tariff.tariff_name === plan.name ? (
                              // <Button text={'Отменить подписку'} variant={'delete'} />
                              <button disabled>Текущий тариф</button>
                            ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                              <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                <button className={styles.planCardBtn}
                                  onClick={() => {
                                    // handleClick(plan)
                                    console.log('Функционал временно отключен')
                                  }}>Подключить
                                </button>
                              </a>
                            ) : (
                              <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                            )
                          ) : (
                            <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                              <button className={styles.planCardBtn}
                                onClick={() => {
                                // handleClick(plan)
                                console.log('Функционал временно отключен')}}>Подключить
                              </button>
                            </a>
                          ))}
                            <hr/>
                            <ul>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath}  />
                                </span>
                                <span className={styles.blueLabel}>Безлимит ГБ</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курса</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                              </li>
                              <div className={styles.label}>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>White Label</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>Свой домен</span>
                              </li>
                              </div>
                            </ul>
                          </div>
                      </div>
                    :index === 1 ?
                    <div className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard} key={index}>
                      <div style={{display:'flex', alignItems: 'right', justifyContent: 'right'}}>
                        <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_planName}>{plan.name}</h3>
                        <div style={{ display:'flex'}}>
                          <img className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_imgHit} src={hit} alt='hit'/>
                          <div className={styles.hit}>Хит</div>
                        </div>
                       </div>
                      <div className={styles.text}>
                        <div className={styles.middleImg}><img src={middle} alt='middle'/></div>
                        {isActive === false ?
                        <div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>мес</span>
                        </div>
                        :<div className={styles.text_priceWrap}>
                          <span className={styles.text_price}>
                            {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>год</span>
                        </div>
                        }
                         {role === RoleE.Admin &&
                          (tariff ? (
                            tariff.tariff_name === plan.name ? (
                              // <Button text={'Отменить подписку'} variant={'delete'} />
                              <button disabled>Текущий тариф</button>
                            ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                              <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                <button className={styles.planCardBtn}
                                  onClick={() => {
                                    // handleClick(plan)
                                    console.log('Функционал временно отключен')
                                  }}>Подключить
                                </button>
                              </a>
                            ) : (
                              <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                            )
                          ) : (
                            <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                              <button className={styles.planCardBtn}
                                onClick={() => {
                                // handleClick(plan)
                                console.log('Функционал временно отключен')}}>Подключить
                              </button>
                            </a>
                          ))}
                            <hr />
                            <ul>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                                </span>
                                <span className={styles.blueLabel}>Безлимит ГБ</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курсов</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                </span>
                                <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудника</span>
                              </li>
                              <div className={styles.label}>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>White Label</span>
                              </li>
                              <li style={{display:'flex', alignItems:'center'}}>
                                <span style={{display:'flex', alignItems:'center'}}>
                                  <IconSvg className={styles.icon} styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                                </span>
                                <span className={styles.blackLabel}>Свой домен</span>
                              </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                        :index === 2 ?
                        <div className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard} key={index}>
                          <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard_planName}>{plan.name}</h3>
                            <div className={styles.text}>
                              <div><img src={senior} alt='senior'/></div>
                              {isActive === false ?
                              <div className={styles.text_priceWrap}>
                                <span className={styles.text_price}>
                                  {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                                </span>
                                <span className={styles.text_priceTo}>мес</span>
                              </div>
                              :<div className={styles.text_priceWrap}>
                                <span className={styles.text_price}>
                                  {plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}
                                </span>
                                <span className={styles.text_priceTo}>год</span>
                              </div>
                              }
                               {role === RoleE.Admin &&
                                  (tariff ? (
                                    tariff.tariff_name === plan.name ? (
                                      // <Button text={'Отменить подписку'} variant={'delete'} />
                                      <button disabled>Текущий тариф</button>
                                    ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                                      <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                        <button className={styles.planCardBtn}
                                          onClick={() => {
                                            // handleClick(plan)
                                            console.log('Функционал временно отключен')
                                          }}>Подключить
                                        </button>
                                      </a>
                                    ) : (
                                      <button disabled title="сначала отмените текущую подписку">Выбор недоступен</button>
                                    )
                                  ) : (
                                    <a href="https://t.me/over_school/" target="_blank" rel="noreferrer">
                                      <button className={styles.planCardBtn}
                                        onClick={() => {
                                        // handleClick(plan)
                                        console.log('Функционал временно отключен')}}>Подключить
                                      </button>
                                    </a>
                                  ))}
                                  <hr />
                                  <ul>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                                      </span>
                                      <span className={styles.whiteLabel}>Безлимит ГБ</span>
                                    </li>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                      </span>
                                      <span className={styles.whiteLabel}>{plan.number_of_courses || '∞'} курсов</span>
                                    </li>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                      </span>
                                      <span className={styles.whiteLabel}>{plan.students_per_month || '∞'} учеников</span>
                                    </li>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                      </span>
                                      <span className={styles.whiteLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                                    </li>
                                    <div className={styles.label}>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                      </span>
                                      <span className={styles.whiteLabelCheck}>White Label</span>
                                    </li>
                                    <li style={{display:'flex', alignItems:'center'}}>
                                      <span style={{display:'flex', alignItems:'center'}}>
                                        <IconSvg className={styles.icon} styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                      </span>
                                      <span className={styles.whiteLabelCheck}>Свой домен</span>
                                    </li>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            : null
                          ))}
                      </div>
                    }
                  </div>
          {isModalOpen && selected && (
            <Portal closeModal={close}>
              <TariffDetailModal tariff={selected} setShowModal={close} />
            </Portal>
          )}
      {isMobile?
       <div style={{marginTop: '20px'}}className={styles.benefit}>
          <div className={styles.benefit_wrap}>
            <table className={styles.benefit_wrap_table}>
              <tbody>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Мессенджер с чатами
                        <p>и каналами</p></td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Искусственный интеллект
                        <p>CurseHub Ai</p></td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Отдельный сайт для каждого
                        <p>курса</p></td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Автоматический зачёт</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Домашние задания</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Рассылка по всем ученикам</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Выдача сертификатов</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Умные комментарии
                        <p>к урокам</p></td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Мобильное приложение</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Публикация в каталоге
                        <p>CourseHub</p></td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Аналитика обучения</td>
                  </tr>
                  <tr>
                  <td className={styles.addLine}><img src={addMobile} alt='add'/></td>
                  <td>Мобильное приложение</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        :
          <div style={{marginTop: '40px'}}className={styles.benefit}>
          <div className={styles.benefit_wrap}>
            <table className={styles.benefit_wrap_table}>
              <tbody>
                <tr>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Мессенджер с чатами
                        <p>и каналами</p></td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td >Автоматический зачёт</td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td>Выдача сертификатов</td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Публикация в каталоге
                        <p>CourseHub</p></td>
                  </td>
                </tr>
                <tr>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Искусственный интеллект
                        <p>CurseHub Ai</p></td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td>Домашние задания</td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Умные комментарии
                        <p>к урокам</p></td>
                  </td>
                  <td className={styles.analiticRow}>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td>Аналитика обучения</td>
                  </td>
                </tr>
                <tr>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td className={styles.benefit_wrap_table_doubleRow}>Отдельный сайт для
                        <p>каждого курса</p></td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td>Рассылка по всем ученикам</td>
                  </td>
                  <td>
                  <td className={styles.addLine}><img src={add} alt='add'/></td>
                  <td>Мобильное приложение</td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        }
      {isMobile?
        <div style={{marginTop: '30px'}} className={styles.benefit}>
        <div className={styles.tariffs}>
        <span className={styles.tariffs_personal}>
            <div className={styles.tariffs_personal_title}>
              Премиальный тариф &ldquo;Personal&rdquo;
            </div>
            <div className={styles.tariffs_personal_function}>Персонально подберём для вас нужные функции</div>
            <div className={styles.tariffs_personal_block}>
             <img src={personalMobile} alt='personalMobile'/>
             <div>
                <ul>
                  <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                      </span>
                      <span>Настройка ГБ</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Настройка курсов</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>Настройка учеников</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                      </span>
                      <span>Настройка сотрудников</span>
                    </li>
                </ul>
              </div>
            </div>
            <div className={styles.getConsultPersonal} style={{display: 'flex'}}>
            <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
              <button><div>Получить консультацию</div></button>
            </a>
            </div>
          </span>
          <span className={styles.tariffs_start}>
            <div className={styles.tariffs_start_title}>
              Бесплатный тариф &ldquo;Start&rdquo;
            </div>
            <div className={styles.tariffs_start_days}>14 дней бесплатно</div>
            <div className={styles.tariffs_start_block}>
             <img src={startMobile} alt='startMobile'/>
             <div>
                <ul>
                  <li style={{display:'flex', alignItems:'center'}}>
                    <span style={{display:'flex', alignItems:'center'}}>
                      <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ConfigurationIconPath} />
                    </span>
                    <span>1 курс</span>
                  </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>До 10 учеников</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Конструктор лендингов</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex',alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={MailNotificationsIconPath} />
                      </span>
                      <span>Приём платежей</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center',height: '1vw'}}>
                      <span style={{display:'flex', verticalAlign:'top'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23"/>
                      </span>
                      <span>и онлайн касса</span>
                    </li>
                </ul>
              </div>
            </div>
            <div className={styles.getConsultStart} style={{display:'flex', alignItems:'left'}}>
              <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
                <button>Получить консультацию</button>
              </a>
            </div>
          </span>
        </div>
        </div>
        :
        <div style={{marginTop: '30px'}} className={styles.benefit}>
        <div className={styles.tariffs}>
          <span className={styles.tariffs_start}>
            <div className={styles.tariffs_start_title}>
              Бесплатный тариф &ldquo;Start&rdquo;
            </div>
            <div className={styles.tariffs_start_days}>14 дней бесплатно</div>
            <div className={styles.tariffs_start_block}>
             <img src={prizeStart} alt='prizeStart'/>
             <div>
                <ul>
                  <li style={{display:'flex', alignItems:'center'}}>
                    <span style={{display:'flex', alignItems:'center'}}>
                      <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ConfigurationIconPath} />
                    </span>
                    <span>1 курс</span>
                  </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>До 10 учеников</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Конструктор лендингов</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex',alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={MailNotificationsIconPath} />
                      </span>
                      <span>Приём платежей</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center',height: '1vw'}}>
                      <span style={{display:'flex', verticalAlign:'top'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23"/>
                      </span>
                      <span>и онлайн касса</span>
                    </li>
                    <li>
                    <div className={styles.getConsultStart} style={{display:'flex', alignItems:'left'}}>
                    <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
                      <button>Получить консультацию</button>
                    </a>
                    </div>
                    </li>
                </ul>
              </div>
            </div>
          </span>
          <span className={styles.tariffs_personal}>
            <div className={styles.tariffs_personal_title}>
              Премиальный тариф &ldquo;Personal&rdquo;
            </div>
            <div className={styles.tariffs_personal_function}>Персонально подберём для вас нужные функции</div>
            <div className={styles.tariffs_personal_block}>
             <img src={prizePersonal} alt='prizePersonal'/>
             <div>
                <ul>
                  <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                      </span>
                      <span>Настройка ГБ</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Настройка курсов</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>Настройка учеников</span>
                    </li>
                    <li style={{display:'flex', alignItems:'center'}}>
                      <span style={{display:'flex', alignItems:'center'}}>
                        <IconSvg className={styles.tariffs_icon} styles={{color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                      </span>
                      <span>Настройка сотрудников</span>
                    </li>
                    <li>
                    <div className={styles.getConsultPersonal} style={{display: 'flex'}}>
                    <a href="https://t.me/course_hub_olya/" target="_blank" rel="noreferrer">
                      <button><div>Получить консультацию</div></button>
                    </a>
                    </div>
                    </li>
                </ul>
              </div>
            </div>
          </span>
        </div>
        </div>
        }
      {isMobile?
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className={styles.TariffPlansPage_plansBlock_banner}>
            <div className={styles.TariffPlansPage_plansBlock_banner_createProject}>
              <h1>Создайте свой проект на Course Hub прямо сейчас!</h1>
              <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
            </div>
            <div className={styles.TariffPlansPage_plansBlock_banner_images}>
              <img src={banner} alt="Создать проект"/>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <button onClick={handleRegistrationUser}>Попробовать бесплатно</button>
            </div>
          </div>
        </div>
        :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className={styles.TariffPlansPage_plansBlock_banner}>
            <div className={styles.TariffPlansPage_plansBlock_banner_createProject}>
              <h1>Создайте свой проект на Course Hub прямо сейчас!</h1>
              <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
                  <button onClick={handleRegistrationUser}>Попробовать бесплатно</button>
            </div>
            <div className={styles.TariffPlansPage_plansBlock_banner_images}>
              <img src={banner} alt="Создать проект"/>
            </div>
          </div>
        </div>
        }
      </section>
    </motion.div>
  )
}
