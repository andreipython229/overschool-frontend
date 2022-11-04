import { FC, ChangeEvent } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { paperClipIconPath } from 'Pages/Courses/config/svgIconsPath'

import styles from './addfilebtn.module.scss'

type addFileBtnT = {
  handleChangeFiles: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AddFileBtn: FC<addFileBtnT> = ({ handleChangeFiles }) => {
  return (
    <form acceptCharset="utf-8" className={styles.addFileBtn}>
      <label className={styles.addFileBtn_form_addFiles}>
        <IconSvg width={22} height={18} viewBoxSize="0 0 20 18" path={paperClipIconPath} />
        <input onChange={handleChangeFiles} type="file" multiple />
        Прикрепить файлы
      </label>
    </form>
  )
}
