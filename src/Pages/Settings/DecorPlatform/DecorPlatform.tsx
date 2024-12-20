import { ChangeEvent, memo, useState } from 'react'

import { LogoAddBlock } from './LogoAddBlock/LogoAddBlock'
import { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } from '../../../api/schoolHeaderService'

import styles from '../superAdmin.module.scss'

export const DecorPlatform = memo(() => {
  const [setSchoolHeader] = useSetSchoolHeaderMutation()
  const headerId = localStorage.getItem('header_id')
  const [logoError, setLogoError] = useState<string>('')
  const [faviconError, setFaviconError] = useState<string>('')
  const { data, isSuccess, isFetching, isError, isLoading } = useFetchSchoolHeaderQuery(Number(headerId))

  const onChangeLogotype = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (target.files) {
      const formdata = new FormData()
      formdata.append('logo_school', target.files[0])
      formdata.append('name', String(data?.name))

      if (target.files[0].size <= 2 * 1024 * 1024) {
        await setSchoolHeader({ formdata, id: Number(headerId) })
      } else {
        setLogoError('Неверный формат')
      }
    }
  }
  const onChangeFavicon = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files) {
      const formdata = new FormData()
      formdata.append('favicon', target.files[0])
      formdata.append('name', String(data?.name))

      if (target.files[0].size <= 200 * 1024) {
        setSchoolHeader({ formdata, id: Number(headerId) })
      } else {
        setFaviconError('Неверный формат')
      }
    }
  }

  return (
      <>
      <div className={styles.title_passport}>
      <span className={styles.title_passport_header}>Оформление платформы</span>
        <span className={styles.title_passport_header}>Оформление платформы</span>
          </div>
        <div className={styles.title_passport_block}>
    <div className={styles.wrapper_actions}>
      <div className={styles.decor}>
        <LogoAddBlock
          title={'Ваш логотип'}
          logoDesc={'Загрузите логотип Вашей компании: он будет отображаться в интерфейсе и системных email'}
          aboutRequirements={'Требования к логотипу:'}
          onChange={onChangeLogotype}
          requirementsArr={['Формат файла PNG', 'Размер файла не более 2 мб', ' Оптимальный размер логотипа 200px х 50px']}
        />
        {logoError && <span>{logoError}</span>}
        </div>
      </div>
          <div className={styles.wrapper_actions}>
      <div className={styles.decor}>
        <LogoAddBlock
          title={'Ваш favicon'}
          logoDesc={'Загрузите favicon Вашей компании: он будет отображаться на страницах вашей школы во вкладке браузера'}
          aboutRequirements={'Требования к favicon:'}
          onChange={onChangeFavicon}
          requirementsArr={['Формат файла PNG', 'Размер файла не более 200 кб', 'Оптимальный размер favicon 100px х 100px']}
        />
        {faviconError && <span>{faviconError}</span>}
      </div>
    </div>
          </div>
  </>
  )
})
