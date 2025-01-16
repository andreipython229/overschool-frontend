import { FC, ChangeEvent, DetailedHTMLProps, FormHTMLAttributes, LabelHTMLAttributes } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { paperClipIconPath } from 'Pages/School/config/svgIconsPath'

import styles from './addfilebtn.module.scss'
import { Button } from '../Button/Button'

type addFileBtnT = {
  handleChangeFiles: (e: ChangeEvent<HTMLInputElement>) => void
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> &
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export const AddFileBtn: FC<addFileBtnT> = ({ handleChangeFiles, ...rest }) => {
  return (
    <form acceptCharset="utf-8" className={styles.addFileBtn} style={{ alignSelf: 'center' }} onSubmit={e => e.preventDefault()}>
      <label className={styles.addFileBtn_form_addFiles} {...rest}>
        <IconSvg width={59} height={58} viewBoxSize="0 0 59 58">
          <path
            d="M36.7502 54.9779H22.2502C9.12766 54.9779 3.521 49.3712 3.521 36.2487V21.7487C3.521 8.6262 9.12766 3.01953 22.2502 3.01953H36.7502C49.8727 3.01953 55.4793 8.6262 55.4793 21.7487V36.2487C55.4793 49.3712 49.8727 54.9779 36.7502 54.9779ZM22.2502 6.64453C11.1093 6.64453 7.146 10.6079 7.146 21.7487V36.2487C7.146 47.3895 11.1093 51.3529 22.2502 51.3529H36.7502C47.891 51.3529 51.8543 47.3895 51.8543 36.2487V21.7487C51.8543 10.6079 47.891 6.64453 36.7502 6.64453H22.2502Z"
            fill="#357EEB"
          />
          <path
            d="M42.7916 43.0859H38.3208C37.33 43.0859 36.5083 42.2643 36.5083 41.2734C36.5083 40.2826 37.33 39.4609 38.3208 39.4609H42.7916C43.7825 39.4609 44.6041 40.2826 44.6041 41.2734C44.6041 42.2643 43.7825 43.0859 42.7916 43.0859Z"
            fill="#357EEB"
          />
          <path
            d="M31.8443 43.0859H16.2085C15.2177 43.0859 14.396 42.2643 14.396 41.2734C14.396 40.2826 15.2177 39.4609 16.2085 39.4609H31.8443C32.8352 39.4609 33.6568 40.2826 33.6568 41.2734C33.6568 42.2643 32.8593 43.0859 31.8443 43.0859Z"
            fill="#357EEB"
          />
          <path
            d="M42.7919 34.0039H29.4277C28.4369 34.0039 27.6152 33.1822 27.6152 32.1914C27.6152 31.2006 28.4369 30.3789 29.4277 30.3789H42.7919C43.7827 30.3789 44.6044 31.2006 44.6044 32.1914C44.6044 33.1822 43.7827 34.0039 42.7919 34.0039Z"
            fill="#357EEB"
          />
          <path
            d="M22.9027 34.0039H16.2085C15.2177 34.0039 14.396 33.1822 14.396 32.1914C14.396 31.2006 15.2177 30.3789 16.2085 30.3789H22.9027C23.8935 30.3789 24.7152 31.2006 24.7152 32.1914C24.7152 33.1822 23.8935 34.0039 22.9027 34.0039Z"
            fill="#357EEB"
          />
        </IconSvg>
        <input onChange={handleChangeFiles} type="file" multiple />
        Перетащите файл или нажмите для загрузки
        <Button text={'Выбрать файл'} variant="newPrimary" type="submit" />
      </label>
    </form>
  )
}
