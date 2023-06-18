import {FC, useEffect, useState} from 'react'
import { useFormik } from 'formik'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import { Checkbox } from '../../common/Checkbox/Checkbox'
import { Button } from 'components/common/Button/Button'
import { auth } from 'store/redux/users/slice'
import { AuthSelect } from '../../common/AuthSelect'
import { useAppDispatch } from '../../../store/hooks'
import { registrIconPath } from './config/svgIconsPath'
import { useRegistrationMutation } from '../../../api/userRegisterService'
import { isSecurity, unSecurity } from '../../../assets/img/common/index'

import styles from '../Modal.module.scss'
import { RegCodeModalPropsT, RegistrationModalPropsT } from '../ModalTypes'

export const RegCodeModal: FC<RegCodeModalPropsT> = ({ setCodeModal }) => {

  const dispatch = useAppDispatch()
  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<string>('email')
  const [attemptAccess, { data, error, isSuccess }] = useRegistrationMutation()

  const getAuthVariant = (variant: string) => {
    setAuthVariant(variant)
  }

  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit: async () => {
      const userData = formik.values
      await attemptAccess(userData)
      await setCodeModal(false)
    },
  })
  return (
    <div className={styles.wrapper}>
      {
        <div className={styles.main}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.container}>
              <IconSvg
                className={styles.main_closed}
                width={16}
                height={16}
                viewBoxSize="0 0 16 16"
                functionOnClick={() => setCodeModal(false)}
                path={registrIconPath}
              />

              <div className={styles.main_title}>Введите код из письма</div>
              <div className={styles.inputs_block}>
                <InputAuth
                  name={'code'}
                  type={'text'}
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  placeholder={'код из письма'}
                  onClick={changeSecurityStatus}
                  icon={unSecurity}
                />
              </div>
              <div className={styles.main_btn}>
                <Button style={{ width: '246px' }} type={'submit'} variant={'primary'} text={'Отправить'} />
              </div>
            </div>
          </form>
        </div>
      }
    </div>
  )
}
