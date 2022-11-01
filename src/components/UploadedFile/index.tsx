import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrDownPath } from 'Pages/StudentCourse/config/svgIconPath'

import styles from './uploadedfile.module.scss'

type uploadedFileT = {
  file: string
  name?: string
}

export const UploadedFile: FC<uploadedFileT> = ({ file, name }) => {
  return (
    <a href={file} target={'_blanck'} download={name}>
      <div className={styles.file__download_container}>
        <div className={styles.file__dowload_wrap}>
          <div className={styles.file__dowload_blackDiv}> </div>
          <span>{name || file}</span>
        </div>
        <div className={styles.file__dowload_wrap}>
          <span className={styles.file__download_size}>445 КБ</span>
          <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={arrDownPath} />
        </div>
      </div>
    </a>
  )
}
