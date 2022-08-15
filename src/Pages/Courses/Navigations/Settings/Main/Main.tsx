import React, { memo, useState } from 'react'
import styles from '../superAdmin.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { changeProjectName } from '../../../../../store/redux/platform/slice'

export const Main = memo(() => {
  const dispatch = useAppDispatch()
  // const projectName = useAppSelector<string>((state: any) => state.platform.projectName)
  const [name, setName] = useState<string>('projectName')
  const onChangeProjectName = () => {
    dispatch(changeProjectName(name))
  }
  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.main}>
        <div className={styles.main_title}>Основные настройки школы</div>
        <div className={styles.main_project}>Название проекта</div>
        <p className={styles.main_description}>
          Название проекта отображается в шапке на главной странице проекта
        </p>
        <div>
          <input
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            className={styles.main_input}
            type="text"
            placeholder={'Название'}
          />
          <button onClick={onChangeProjectName} className={styles.main_btn}>
            Применить
          </button>
        </div>
      </div>
    </div>
  )
})
