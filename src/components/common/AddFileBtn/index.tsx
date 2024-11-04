import { FC, ChangeEvent, DetailedHTMLProps, FormHTMLAttributes, LabelHTMLAttributes } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { paperClipIconPath } from 'Pages/School/config/svgIconsPath'

import styles from './addfilebtn.module.scss'

type addFileBtnT = {
  handleChangeFiles: (e: ChangeEvent<HTMLInputElement>) => void
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> &
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export const AddFileBtn: FC<addFileBtnT> = ({ handleChangeFiles, ...rest }) => {
  return (
    <form acceptCharset="utf-8" className={styles.addFileBtn} style={{ alignSelf: 'center' }}>
      <label className={styles.addFileBtn_form_addFiles} {...rest}>
        <IconSvg width={22} height={18} viewBoxSize="0 0 20 18" path={paperClipIconPath} />
        <input onChange={handleChangeFiles} type="file" multiple />
        Прикрепить файл
      </label>
    </form>
  )
}
