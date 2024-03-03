import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyValidateTokenQuery, useResetPasswordMutation } from 'api/forgotPassword'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import styles from './resetPassword.module.scss'
import { Box, IconButton, InputAdornment, TextField, styled } from '@mui/material'
import { Button } from 'components/common/Button/Button'
import { Toast } from 'primereact/toast'
import { Path } from 'enum/pathE'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#8034c7',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #8034c7',
    },
    '&:hover fieldset': {
      borderColor: '#8034c7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8034c7',
    },
  },
})

export const ResetPassword: FC = () => {
  const params = useParams()
  const { userId, token } = params
  const toast = useRef<Toast>(null)
  const navigate = useNavigate()
  const [validateToken, { data: tokenData, isFetching }] = useLazyValidateTokenQuery()
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  useEffect(() => {
    if (params && params.userId && params.token) {
      validateToken({ user_id: Number(userId), token: String(token) })
    }
  }, [params])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  const handleChangePassword = () => {
    if (password.length > 0 && passwordConfirm.length > 0 && password === passwordConfirm && tokenData) {
      const formdata = new FormData()
      formdata.append('email', tokenData.email)
      formdata.append('new_password', password)
      formdata.append('new_password_again', passwordConfirm)
      resetPassword(formdata)
        .unwrap()
        .then(data => {
          toast.current?.show({
            severity: 'success',
            summary: 'Успешно',
            detail: `Пароль успешно изменен. Через пару мгновений Вы будете перенаправлены на начальную страницу`,
            life: 5000,
          })
          setTimeout(() => navigate(Path.InitialPage), 2000)
        })
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Ошибка',
        detail: `Пожалуйста, проверьте что пароли совпадают`,
        life: 5000,
      })
    }
  }

  if (isFetching || !tokenData) {
    return <SimpleLoader />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap1}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap2}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap3}></div>
      </div>
      <div className={styles.bgf}>
        <div className={styles.bgf_wrap4}></div>
      </div>
      <div style={{ maxWidth: '90vw' }}>
        <h2 style={{ paddingBottom: '2rem' }}>Смена пароля для пользователя {tokenData.email}:</h2>
        <div className={styles.wrapper_inputData}>
          <Box component="form" noValidate className={styles.box}>
            <CssTextField
              sx={{ width: '100%' }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Введите новый пароль"
              id="custom-css-outlined-input"
            />
            <CssTextField
              sx={{ width: '100%' }}
              type={showConfirm ? 'text' : 'password'}
              required={true}
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirm} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Введите новый пароль еще раз"
              id="custom-css-outlined-input"
            />
          </Box>
          <Button
            disabled={password.length === 0 || passwordConfirm.length === 0}
            style={{ marginTop: '2rem' }}
            variant={password.length === 0 || passwordConfirm.length === 0 ? 'disabled' : 'primary'}
            text={isLoading ? <SimpleLoader style={{ height: '15px', width: '15px' }} /> : 'Подтвердить смену пароля'}
            onClick={handleChangePassword}
          />
        </div>
      </div>
      <Toast position="top-left" ref={toast} />
    </div>
  )
}
