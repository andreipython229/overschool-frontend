import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlans.module.scss'
import firstStep from '../../assets/img/createProject/firstStep.png'
import secondStep from '../../assets/img/createProject/secondStep.png'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { FC, useEffect, useState } from 'react'
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
import start from './images/start.png'
import senior from './images/senior.png'
import {Path} from "../../enum/pathE"
import { motion } from 'framer-motion'
import {generatePath, useNavigate} from "react-router-dom"
import { CloudIconPath, PeopleIconPath, CheckIconPath, ClipboardListIconPath, ConfigurationIconPath, CrossIconPath,
        MailNotificationsIconPath, UserIconPath } from 'assets/Icons/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import {coursesStatsNavPath} from 'components/Navbar/config/svgIconPath'

export const TariffPlans: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()
  const { role } = useAppSelector(selectUser)
  const [isModalOpen, { off: open, on: close }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT>()
  const tariff = useAppSelector(state => state.tariff.data)
  const [switchOn, setSwitchOn] = useState<boolean>(true);
  const navigate = useNavigate()

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
          {switchOn === false ?
            <div className={styles.TariffPlansPage_switchBlock}>
              <span style={{minWidth: '257px'}}>
                <button onClick={()=>setSwitchOn(true)} className={styles.TariffPlansPage_switchBlock_forMonth} >Ежемесячно</button>
              </span>
              <span><button className={styles.TariffPlansPage_switchBlock_forYear}>
                <span style={{marginLeft: '10px'}}>Годовая</span>
                <span className={styles.TariffPlansPage_switchBlock_forYear_sale}>Экономия 20 %</span>
              </button></span>
            </div>
          :<div className={styles.TariffPlansPage_switchBlock}>
              <span style={{marginLeft: '-23px'}}>
                <button className={styles.TariffPlansPage_switchBlock_forMonthSwitchOff} >Ежемесячно</button>
              </span>
              <span style={{minWidth: '257px'}}>
              <button onClick={()=>setSwitchOn(false)} className={styles.TariffPlansPage_switchBlock_forYearSwitchOff}>
                <span>Годовая</span>
                <span className={styles.TariffPlansPage_switchBlock_forYearSwitchOff_saleSwitchOff}>Экономия 20 %</span>
              </button></span>
            </div>
          }
          <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
            {tariffPlanTable?.map((plan, index: number) => (
            index === 0 ?
            <div className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard} key={index}>
              <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard_planName}>{plan.name}</h3>
                <div className={styles.text}>
                  <div><img src={start} alt='start'/></div>
                  {switchOn === true ?
                  <div style={{marginTop: '10px'}}>
                    <span className={styles.text_price}>
                      {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                    </span>
                    <span className={styles.text_priceTo}>мес</span>
                  </div>
                  :<div style={{marginTop: '10px'}}>
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
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                          </span>
                          <span className={styles.blueLabel}>Безлимит ГБ</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курса</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                        </li>
                        <li style={{paddingTop: '15px'}}>
                          <span style={{marginRight: '5px'}}>
                            <IconSvg styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                          </span>
                          <span className={styles.blackLabel}>White Label</span>
                        </li>
                        <li>
                          <span style={{marginRight: '5px'}}>
                            <IconSvg styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                          </span>
                          <span className={styles.blackLabel}>Свой домен</span>
                        </li>
                      </ul>
                    </div>
                </div>
              :index === 1 ?
              <div className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard} key={index}>
                <div style={{display:'flex'}}>
                  <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_planName}>{plan.name}</h3>
                  <img style={{marginLeft:'113px', marginTop: '-34px'}} src={hit} alt='hit'/>
                  <div className={styles.hit}>Хит</div>
                 </div>
                <div style={{marginTop: '-34px'}} className={styles.text}>
                  <div><img src={middle} alt='middle'/></div>
                  {switchOn === true ?
                  <div style={{marginTop: '10px'}}>
                    <span className={styles.text_price}>
                      {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                    </span>
                    <span className={styles.text_priceTo}>мес</span>
                  </div>
                  :<div style={{marginTop: '10px'}}>
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
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                          </span>
                          <span className={styles.blueLabel}>Безлимит ГБ</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курсов</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                        </li>
                        <li>
                          <span style={{marginRight: '10px'}}>
                            <IconSvg styles={{color: 'rgba(53, 126, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                          </span>
                          <span className={styles.blueLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудника</span>
                        </li>
                        <li style={{paddingTop: '15px'}}>
                          <span style={{marginRight: '5px'}}>
                            <IconSvg styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                          </span>
                          <span className={styles.blackLabel}>White Label</span>
                        </li>
                        <li>
                          <span style={{marginRight: '5px'}}>
                            <IconSvg styles={{color: 'rgba(128, 128, 128, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CrossIconPath} />
                          </span>
                          <span className={styles.blackLabel}>Свой домен</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  :index === 2 ?
                  <div className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard} key={index}>
                    <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard_planName}>{plan.name}</h3>
                      <div className={styles.text}>
                        <div><img src={senior} alt='senior'/></div>
                        {switchOn === true ?
                        <div style={{marginTop: '10px'}}>
                          <span className={styles.text_price}>
                            {plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}
                          </span>
                          <span className={styles.text_priceTo}>мес</span>
                        </div>
                        :<div style={{marginTop: '10px'}}>
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
                              <li>
                                <span style={{marginRight: '10px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                                </span>
                                <span className={styles.whiteLabel}>Безлимит ГБ</span>
                              </li>
                              <li>
                                <span style={{marginRight: '10px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                                </span>
                                <span className={styles.whiteLabel}>{plan.number_of_courses || '∞'} курсов</span>
                              </li>
                              <li>
                                <span style={{marginRight: '10px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                                </span>
                                <span className={styles.whiteLabel}>{plan.students_per_month || '∞'} учеников</span>
                              </li>
                              <li>
                                <span style={{marginRight: '10px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                                </span>
                                <span className={styles.whiteLabel}>{plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников</span>
                              </li>
                              <li style={{paddingTop: '15px'}}>
                                <span style={{marginRight: '5px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                </span>
                                <span className={styles.whiteLabelCheck}>White Label</span>
                              </li>
                              <li>
                                <span style={{marginRight: '5px'}}>
                                  <IconSvg styles={{color: 'rgba(187, 206, 235, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CheckIconPath} />
                                </span>
                                <span className={styles.whiteLabelCheck}>Свой домен</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      : null
                    ))}
                </div>
            </div>
        {isModalOpen && selected && (
          <Portal closeModal={close}>
            <TariffDetailModal tariff={selected} setShowModal={close} />
          </Portal>
        )}
       <div style={{marginTop: '40px'}}className={styles.benefit}>
          <div className={styles.benefit_wrap}>
            <table className={styles.benefit_wrap_table}>
              <tbody>
                <tr>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td>Мессенджер с чатами
                        <p>и каналами</p></td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Автоматический зачёт</td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Выдача сертификатов</td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td>Публикация в каталоге
                        <p>CourseHub</p></td>
                  </td>
                </tr>
                <tr>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td>Искусственный интеллект
                        <p>CurseHub Ai</p></td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Домашние задания</td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td>Умные комментарии
                        <p>к урокам</p></td>
                  </td>
                  <td style={{paddingTop: '45px'}}>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Аналитика обучения</td>
                  </td>
                </tr>
                <tr>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td>Отдельный сайт для каждого
                        <p>курса</p></td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Рассылка по всем ученикам</td>
                  </td>
                  <td>
                  <td style={{paddingBottom: '12px', paddingRight: '0'}}><img src={add} alt='add'/></td>
                  <td style={{paddingBottom: '15px'}}>Мобильное приложение</td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{marginTop: '30px'}} className={styles.benefit}>
        <div className={styles.tariffs}>
          <span className={styles.tariffs_start}>
            <div className={styles.tariffs_start_title}>
              Бесплатный тариф &ldquo;Start&rdquo;
            </div>
            <div className={styles.tariffs_start_days}>14 дней бесплатно</div>
            <div className={styles.tariffs_start_block}>
             <img style={{borderRadius: '24px', marginTop: '50px'}} src={prizeStart} alt='prizeStart'/>
             <div style={{marginRight:'-20px', marginTop: '-80px'}}>
                <ul>
                  <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-25px'}}>
                      <span >
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ConfigurationIconPath} />
                      </span>
                      <span>1 курс</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-25px'}}>
                      <span>
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>До 10 учеников</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-25px'}}>
                      <span >
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Конструктор лендингов</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '74px', display: 'flex', marginLeft:'-25px'}}>
                      <span>
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(51, 47, 54, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={MailNotificationsIconPath} />
                      </span>
                      <span>Приём платежей
                            <p style={{marginRight: '15px'}}>и онлайн касса</p></span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '54px', display: 'flex', marginLeft:'-45px', marginBottom: '-100px'}}>
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
             <img style={{borderRadius: '24px', marginTop: '-88px', marginLeft: '-25px'}} src={prizePersonal} alt='prizePersonal'/>
             <div style={{marginRight:'-20px', marginTop: '-45px'}}>
                <ul>
                  <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-45px'}}>
                      <span >
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={CloudIconPath} />
                      </span>
                      <span>Настройка ГБ</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-45px'}}>
                      <span >
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={ClipboardListIconPath} />
                      </span>
                      <span>Настройка курсов</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '34px', display: 'flex', marginLeft:'-45px'}}>
                      <span>
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 50 50" path={coursesStatsNavPath} />
                      </span>
                      <span>Настройка учеников</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '54px', display: 'flex', marginLeft:'-45px'}}>
                      <span >
                        <IconSvg styles={{marginRight: '10px', color: 'rgba(255, 255, 255, 1)'}} width={24} height={24} viewBoxSize="0 0 23 23" path={PeopleIconPath} />
                      </span>
                      <span>Настройка сотрудников</span>
                    </div>
                    </li>
                    <li>
                    <div style={{height: '54px', display: 'flex', marginLeft:'-65px', marginBottom: '-80px'}}>
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
        <div className={styles.TariffPlansPage_plansBlock_banner}>
          <div className={styles.TariffPlansPage_plansBlock_banner_createProject}>
            <h1>Создайте свой проект на Course Hub прямо сейчас!</h1>
            <p>Попробуйте весь функционал в процессе использования и познайте, насколько он удобен</p>
              <div className={styles.main_btn}>
                <button onClick={handleRegistrationUser}>Попробовать бесплатно</button>
              </div>
          </div>
          <div className={styles.TariffPlansPage_plansBlock_banner_images}>
            <img src={banner} alt="Создать проект"/>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
