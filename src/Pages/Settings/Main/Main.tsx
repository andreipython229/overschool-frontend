import { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } from 'api/schoolHeaderService'
import { ChangeEvent, memo, useEffect, useState } from 'react'

import styles from '../superAdmin.module.scss'

export const Main = memo(() => {
  const headerId = localStorage.getItem('header_id')
  const { data } = useFetchSchoolHeaderQuery(Number(headerId))

  const [updateDateSchoolName, { data: newName }] = useSetSchoolHeaderMutation()

  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (data) {
      setName(data?.name)
    }
  }, [data, newName])

  const handleChangeSchoolName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const onChangeProjectName = async () => {
    const formdata = new FormData()
    formdata.append('name', name)
    headerId && await updateDateSchoolName({ formdata, id: headerId })
  }

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.main}>
        <div className={styles.main_title}>Основные настройки школы</div>
        <div className={styles.main_project}>Название проекта</div>
        <p className={styles.main_description}>Название проекта отображается в шапке на главной странице проекта</p>
        <div>
          <input value={name} onChange={handleChangeSchoolName} className={styles.main_input} type="text" placeholder={'Название'} />
          <button onClick={onChangeProjectName} className={styles.main_btn}>
            Применить
          </button>
        </div>
      </div>
    </div>
  )
})
