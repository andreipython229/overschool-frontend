import React, { FC, memo, useState } from "react"
import { useFormik } from "formik"
import { Link } from "react-router-dom"

import { InputAuth } from "../../common/Input/InputAuth/InputAuth"
import unSecurity from "../../../assets/img/unSecurity.svg"
import Security from "../../../assets/img/isecurity.svg"
import { Button } from "../../common/Button/Button"
import { LoginParamsT, validateLogin } from "../../../utils/validationLogin"
import { useAppDispatch } from "../../../store/redux/store"
import { auth } from "../../../store/redux/users/slice"
import { AuthSelect } from "../../common/AuthSelect/AuthSelect"

import styles from "../Modal.module.scss"

type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
  logIn: (value: string) => void
}

export const LoginModal: FC<LoginModalPropsT> = memo(({ setShowModal, logIn }) => {
  const dispatch = useAppDispatch()
  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<string>("email")

  const getInputVariant = (variant: string) => {
    setAuthVariant(variant)
  }
  const changeSecurityStatus = () => {
    setSecurity(!security)
  }
  const onSubmitForm = async (values: LoginParamsT): Promise<any> => {
    // const res: AuthResponse = await userApi.register(values)
    // if (typeof res === 'string') {
    //     setError(res)
    // }
    // navigate(Paths.Login)
    // if (authVariant === 'email') {
    values.email && logIn(values.email)
    // } else {
    //     values.phone && logIn(values.phone)
    // }

    dispatch(auth(true))
  }

  const formik = useFormik({
    validate: (values) => validateLogin(values),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: LoginParamsT) => {
      onSubmitForm(values).then(() => {
        formik.resetForm()
      })
      // alert(JSON.stringify(values))
      setShowModal(false)
    },
  })
  const disabled = !(Object.keys(formik.errors).length === 0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <svg
              className={styles.main_closed}
              onClick={() => setShowModal(false)}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 15L15 1M15 15L1 1"
                stroke="#2E4454"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className={styles.main_title}>Войти</div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: "flex" }}>
                  <InputAuth
                    name={authVariant}
                    type={"text"}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder={authVariant}
                  />
                  <AuthSelect getInputVariant={getInputVariant} />
                </div>
                <div className={styles.errors}>{formik.errors.email}</div>
              </div>

              <InputAuth
                name={"password"}
                type={security ? "password" : "text"}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={"Пароль"}
                onClick={changeSecurityStatus}
                icon={security ? Security : unSecurity}
              />
              <div className={styles.errors}>{formik.errors.password}</div>
            </div>

            <div className={styles.main_btn}>
              <Button
                style={{ width: "246px" }}
                type={"submit"}
                variant={disabled ? "disabled" : "primary"}
                text={"Войти"}
              />
            </div>

            <div className={styles.restorePass}>
              <Link style={{ textDecoration: "none", padding: "15px" }} to={"/"}>
                Забыли пароль?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})
