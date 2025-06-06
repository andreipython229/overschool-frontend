import styles from './TariffPlans.module.scss'
import { TariffPlanT, useFetchTariffPlanTableQuery } from 'api/tariffPlanService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { FC, useEffect, useState} from 'react'
import banner from './images/banner.png'
import { useBoolean } from 'customHooks'
import { TariffDetailModal } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { Portal } from 'components/Modal/Portal'
import { useAppSelector } from 'store/hooks'
import { motion } from 'framer-motion'
import useDeviceDetect from './useDeviceDetect'
import { CheckButton } from './CheckButton'
import {MobilePlanCards} from './TariffsComponents/MobilePlanCards'
import {DesktopPlanCards} from './TariffsComponents/DesktopPlanCards'
import {MobileBenefit} from './TariffsComponents/MobileBenefit'
import {DesktopBenefit} from './TariffsComponents/DesktopBenefit'
import {TariffsMobile} from './TariffsComponents/TariffsMobile'
import {TariffsDesktop} from './TariffsComponents/TariffsDesktop'
import {BannerMobile} from './TariffsComponents/BannerMobile'
import {BannerDesktop} from './TariffsComponents/BannerDesktop'

export const TariffPlans: FC = () => {
  const { data, isFetching, isSuccess } = useFetchTariffPlanTableQuery()
  const [tariffPlanTable, setTariffPlanTable] = useState<TariffPlanT[]>()
  const [isModalOpen, { off: open, on: close }] = useBoolean()
  const [selected, setSelected] = useState<TariffPlanT>()
  const tariff = useAppSelector(state => state.tariff.data)
  const [isActive, { onToggle: toggleActive }] = useBoolean(banner.is_active)
  const { isMobile } = useDeviceDetect()

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
            {isMobile? <MobilePlanCards/> : <DesktopPlanCards/>}
          </div>
          {isModalOpen && selected && (
            <Portal closeModal={close}>
              <TariffDetailModal tariff={selected} setShowModal={close} />
            </Portal>
          )}
            {isMobile? <MobileBenefit/> : <DesktopBenefit/>}
            {isMobile? <TariffsMobile/> : <TariffsDesktop/>}
            {isMobile? <BannerMobile/> : <BannerDesktop/>}
      </section>
    </motion.div>
  )
}

