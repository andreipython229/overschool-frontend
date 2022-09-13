import { ChangeEvent, memo, useState } from 'react'

import { LogoAddBlock } from './LogoAddBlock/LogoAddBlock'
import { useAppDispatch } from '../../../store/hooks'
import { changeLoadingStatus } from '../../../store/redux/platform/slice'
import { useSetSchoolHeaderMutation } from '../../../api/schoolHeaderService'

import { superAdminCover } from '../../../assets/img/common/index'

import styles from '../superAdmin.module.scss'

export const DecorPlatform = memo(() => {
  const dispatch = useAppDispatch()

  const [setSchoolHeader] = useSetSchoolHeaderMutation()

  const [logoError, setLogoError] = useState<string>('')
  const [faviconError, setFaviconError] = useState<string>('')

  const onChangeLogotype = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (target.files) {
      const formData = new FormData()
      formData.append('logo_school', target.files[0])

      if (target.files[0].size <= 2 * 1024 * 1024 && target.files[0].type === 'image/png') {
        setSchoolHeader({ formData, id: 1 })
      } else {
        setLogoError('Неверный формат')
      }
      dispatch(changeLoadingStatus(true))
    }
  }
  const onChangeFavicon = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files) {
      const formData = new FormData()
      formData.append('favicon', target.files[0])

      if (target.files[0].size <= 200 * 1024 && target.files[0].type === 'image/png') {
        setSchoolHeader({ formData, id: 1 })
      } else {
        setFaviconError('Неверный формат')
      }
      dispatch(changeLoadingStatus(true))
    }
  }

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.decor}>
        <div className={styles.decor_title}>Оформление платформы</div>

        <LogoAddBlock
          title={'Ваш логотип'}
          logotype={superAdminCover}
          logoDesc={'Загрузите логотип Вашей компании: он будет отображаться в интерфейсе и системных email'}
          aboutRequirements={'Требования к логотипу:'}
          onChange={onChangeLogotype}
          requirementsArr={['Формат файла PNG', 'Размер файла не более 2 мб', ' Оптимальный размер логотипа 200px х 50px']}
        />
        {logoError && <span>{logoError}</span>}
        <LogoAddBlock
          title={'Ваш favicon'}
          logotype={superAdminCover}
          logoDesc={'Загрузите favicon Вашей компании: он будет отображаться на страницах вашей школы во вкладке браузера'}
          aboutRequirements={'Требования к favicon:'}
          onChange={onChangeFavicon}
          requirementsArr={['Формат файла PNG', 'Размер файла не более 200 кб', 'Оптимальный размер favicon 100px х 100px']}
        />
        {faviconError && <span>{faviconError}</span>}
      </div>
    </div>
  )
})
