import React, { FC, memo, useState } from "react"

import styles from "./authSelect.module.scss"

type AuthSelectPropsT = {
  getInputVariant: (variant: string) => void
}

export const AuthSelect: FC<AuthSelectPropsT> = memo(({ getInputVariant }) => {
  const [variant, setVariant] = useState<string>("email")
  const [context, setContext] = useState<boolean>(false)

  const changeInputVariant = (variant: string) => {
    getInputVariant(variant)
    setVariant(variant)
  }
  return (
    <div onClick={() => setContext(!context)} className={styles.container}>
      {variant === "email" ? (
        <svg
          className={styles.email}
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2C0 0.895432 0.89543 0 2 0H18C19.1046 0 20 0.895431 20 2V14C20 15.1046 19.1046 16 18 16H2C0.895432 16 0 15.1046 0 14V2ZM3.51859 2L10 7.67123L16.4814 2H3.51859ZM18 3.32877L10.6585 9.75258C10.2815 10.0825 9.71852 10.0825 9.3415 9.75258L2 3.32877V14H18V3.32877Z"
            fill="#6C6C6C"
          />
        </svg>
      ) : (
        <svg
          className={styles.phone}
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2.83333C0 1.54467 1.04467 0.5 2.33333 0.5H11.6667C12.9553 0.5 14 1.54467 14 2.83333V19.1667C14 20.4553 12.9553 21.5 11.6667 21.5H2.33333C1.04467 21.5 0 20.4553 0 19.1667V2.83333ZM11.6667 2.83333H2.33333V19.1667H11.6667V2.83333Z"
            fill="#6C6C6C"
          />
          <path
            d="M8.16667 16.8333C8.16667 17.4777 7.64433 18 7 18C6.35567 18 5.83333 17.4777 5.83333 16.8333C5.83333 16.189 6.35567 15.6667 7 15.6667C7.64433 15.6667 8.16667 16.189 8.16667 16.8333Z"
            fill="#6C6C6C"
          />
        </svg>
      )}
      {context ? (
        <div className={styles.popup}>
          <div
            onClick={() => changeInputVariant("phone")}
            className={variant === "phone" ? styles.checked : ""}
          >
            Номер телефона
          </div>
          <div
            onClick={() => changeInputVariant("email")}
            className={variant === "email" ? styles.checked : ""}
          >
            E-mail
          </div>
        </div>
      ) : null}
    </div>
  )
})
