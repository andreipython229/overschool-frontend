import { Button } from 'components/common/Button/Button'
import styles from './studentTestPreview.module.scss'
import {FC, useEffect, useState} from 'react'

import { setShowType } from '../../../../types/componentsTypes'

export const StudentTestPreview: FC<setShowType> = ({ passStatus, setTestSended, setTestSuccess, setShow }) => {
    const [title, setTitle] = useState<string>("Тестирование для оценки усвоения материала :) Удачи! )")
    const [nameButton, setNameButton] = useState<string>("Приступить к тесту")

    useEffect(() => {
        if (passStatus === "passed") {
            setTitle("Тест пройден!")
            setNameButton("")
            setTestSuccess && setTestSuccess(true)
        }
        if (passStatus === "not_passed") {
            setTitle("Тест не пройден!")
            setNameButton("Пройти заново")
            setTestSended && setTestSended(true)
        }
    }, [passStatus])

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.wrapper_title}>{title}</h5>
        {nameButton && <Button text={nameButton} variant="primary" onClick={setShow} />}
    </div>
  )
}
