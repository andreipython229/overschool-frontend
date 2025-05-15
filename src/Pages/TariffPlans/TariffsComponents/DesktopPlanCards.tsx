import styles from '../TariffPlans.module.scss'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { FC, useEffect, useState } from 'react'
import { useBoolean } from 'customHooks'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'
import middle from '../images/middle.png'
import banner from '../images/banner.png'
import hit from '../images/hit.png'
import start from '../images/start.png'
import senior from '../images/senior.png'
import { CloudIconPath, PeopleIconPath, CheckIconPath, ClipboardListIconPath, CrossIconPath } from 'assets/Icons/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { coursesStatsNavPath } from 'components/Navbar/config/svgIconPath'

export const DesktopPlanCards: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()
  const { role } = useAppSelector(selectUser)
  const [selected, setSelected] = useState<TariffPlanT>()
  const tariff = useAppSelector(state => state.tariff.data)
  const [isActive, { onToggle: toggleActive }] = useBoolean(banner.is_active)

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
    <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
      {tariffPlanTable?.map((plan, index: number) =>
        index === 0 ? (
          <div className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard} key={index}>
            <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_firstCard_planName}>{plan.name}</h3>
            <div className={styles.text}>
              <div>
                <img src={start} alt="start" />
              </div>
              {isActive === false ? (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>мес</span>
                </div>
              ) : (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>год</span>
                </div>
              )}
              {role === RoleE.Admin &&
                (tariff ? (
                  tariff.tariff_name === plan.name ? (
                    // <Button text={'Отменить подписку'} variant={'delete'} />
                    <button disabled>Текущий тариф</button>
                  ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                    <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                      <button
                        className={styles.planCardBtn}
                        onClick={() => {
                          // handleClick(plan)
                          console.log('Функционал временно отключен')
                        }}
                      >
                        Подключить
                      </button>
                    </a>
                  ) : (
                    <button disabled title="сначала отмените текущую подписку">
                      Выбор недоступен
                    </button>
                  )
                ) : (
                  <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                    <button
                      className={styles.planCardBtn}
                      onClick={() => {
                        // handleClick(plan)
                        console.log('Функционал временно отключен')
                      }}
                    >
                      Подключить
                    </button>
                  </a>
                ))}
              <hr />
              <ul>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={CloudIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>Безлимит ГБ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ClipboardListIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курса</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 50 50"
                      path={coursesStatsNavPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={PeopleIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>
                    {plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников
                  </span>
                </li>
                <div className={styles.label}>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(128, 128, 128, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CrossIconPath}
                      />
                    </span>
                    <span className={styles.blackLabel}>White Label</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(128, 128, 128, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CrossIconPath}
                      />
                    </span>
                    <span className={styles.blackLabel}>Свой домен</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        ) : index === 1 ? (
          <div className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard} key={index}>
            <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
              <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_planName}>{plan.name}</h3>
              <div style={{ display: 'flex' }}>
                <img className={styles.TariffPlansPage_plansBlock_cardGroup_secondCard_imgHit} src={hit} alt="hit" />
                <div className={styles.hit}>Хит</div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.middleImg}>
                <img src={middle} alt="middle" />
              </div>
              {isActive === false ? (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>мес</span>
                </div>
              ) : (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>год</span>
                </div>
              )}
              {role === RoleE.Admin &&
                (tariff ? (
                  tariff.tariff_name === plan.name ? (
                    // <Button text={'Отменить подписку'} variant={'delete'} />
                    <button disabled>Текущий тариф</button>
                  ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                    <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                      <button
                        className={styles.planCardBtn}
                        onClick={() => {
                          // handleClick(plan)
                          console.log('Функционал временно отключен')
                        }}
                      >
                        Подключить
                      </button>
                    </a>
                  ) : (
                    <button disabled title="сначала отмените текущую подписку">
                      Выбор недоступен
                    </button>
                  )
                ) : (
                  <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                    <button
                      className={styles.planCardBtn}
                      onClick={() => {
                        // handleClick(plan)
                        console.log('Функционал временно отключен')
                      }}
                    >
                      Подключить
                    </button>
                  </a>
                ))}
              <hr />
              <ul>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={CloudIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>Безлимит ГБ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ClipboardListIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>{plan.number_of_courses || '∞'} курсов</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 50 50"
                      path={coursesStatsNavPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>{plan.students_per_month || '∞'} учеников</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(53, 126, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={PeopleIconPath}
                    />
                  </span>
                  <span className={styles.blueLabel}>
                    {plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудника
                  </span>
                </li>
                <div className={styles.label}>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(128, 128, 128, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CrossIconPath}
                      />
                    </span>
                    <span className={styles.blackLabel}>White Label</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(128, 128, 128, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CrossIconPath}
                      />
                    </span>
                    <span className={styles.blackLabel}>Свой домен</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        ) : index === 2 ? (
          <div className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard} key={index}>
            <h3 className={styles.TariffPlansPage_plansBlock_cardGroup_thirdCard_planName}>{plan.name}</h3>
            <div className={styles.text}>
              <div>
                <img src={senior} alt="senior" />
              </div>
              {isActive === false ? (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.price !== '0.00' ? `${Number(plan.price)} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>мес</span>
                </div>
              ) : (
                <div className={styles.text_priceWrap}>
                  <span className={styles.text_price}>{plan.discount_12_months_byn !== 0 ? `${plan.discount_12_months_byn} BYN/` : 'бесплатно'}</span>
                  <span className={styles.text_priceTo}>год</span>
                </div>
              )}
              {role === RoleE.Admin &&
                (tariff ? (
                  tariff.tariff_name === plan.name ? (
                    // <Button text={'Отменить подписку'} variant={'delete'} />
                    <button disabled>Текущий тариф</button>
                  ) : tariff.tariff_name !== plan.name && !isLowerTariff(plan.name) ? (
                    <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                      <button
                        className={styles.planCardBtn}
                        onClick={() => {
                          // handleClick(plan)
                          console.log('Функционал временно отключен')
                        }}
                      >
                        Подключить
                      </button>
                    </a>
                  ) : (
                    <button disabled title="сначала отмените текущую подписку">
                      Выбор недоступен
                    </button>
                  )
                ) : (
                  <a href="https://t.me/course_hub_olya" target="_blank" rel="noreferrer">
                    <button
                      className={styles.planCardBtn}
                      onClick={() => {
                        // handleClick(plan)
                        console.log('Функционал временно отключен')
                      }}
                    >
                      Подключить
                    </button>
                  </a>
                ))}
              <hr />
              <ul>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(187, 206, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={CloudIconPath}
                    />
                  </span>
                  <span className={styles.whiteLabel}>Безлимит ГБ</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(187, 206, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={ClipboardListIconPath}
                    />
                  </span>
                  <span className={styles.whiteLabel}>{plan.number_of_courses || '∞'} курсов</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(187, 206, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 50 50"
                      path={coursesStatsNavPath}
                    />
                  </span>
                  <span className={styles.whiteLabel}>{plan.students_per_month || '∞'} учеников</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg
                      className={styles.icon}
                      styles={{ color: 'rgba(187, 206, 235, 1)' }}
                      width={24}
                      height={24}
                      viewBoxSize="0 0 23 23"
                      path={PeopleIconPath}
                    />
                  </span>
                  <span className={styles.whiteLabel}>
                    {plan.number_of_staff !== null ? (plan.number_of_staff !== 0 ? plan.number_of_staff : '0') : '∞'} сотрудников
                  </span>
                </li>
                <div className={styles.label}>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(187, 206, 235, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CheckIconPath}
                      />
                    </span>
                    <span className={styles.whiteLabelCheck}>White Label</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <IconSvg
                        className={styles.icon}
                        styles={{ color: 'rgba(187, 206, 235, 1)' }}
                        width={24}
                        height={24}
                        viewBoxSize="0 0 23 23"
                        path={CheckIconPath}
                      />
                    </span>
                    <span className={styles.whiteLabelCheck}>Свой домен</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        ) : null,
      )}
    </div>
  )
}
