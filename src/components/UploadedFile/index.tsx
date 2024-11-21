import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath } from 'config/commonSvgIconsPath'

import styles from './uploadedfile.module.scss'
import { arrowDownIconPath, downloadIconPath, fileIconPath } from './icons'

type uploadedFileT = {
  file: string
  index: number
  size: number
  name?: string
  handleDeleteFile?: (index: number) => void
  isHw?: boolean
  isLocal?: boolean
}

export const UploadedFile: FC<uploadedFileT> = ({ file, index, name, size, handleDeleteFile, isHw, isLocal }) => {
  const showMetricByFileSize = () => {
    const fileSizeInKB = size / 1024
    const fileSizeInMB = fileSizeInKB / 1024

    let fileSize
    let unit

    if (fileSizeInMB >= 1) {
      fileSize = fileSizeInMB.toFixed(1)
      unit = 'mb'
    } else {
      fileSize = fileSizeInKB.toFixed(1)
      unit = 'kb'
    }

    return `${fileSize} ${unit}`
  }

  return (
    <a href={file} rel={'noreferrer'} target={'_blank'} download={name} className={isHw ? styles.hwFileWrapper : styles.fileWrapper}>
      {!isHw ? (
        <div className={styles.fileWrapper_body}>
          <IconSvg width={36} height={36} viewBoxSize="0 0 36 36" path={fileIconPath} />
          <div className={styles.fileWrapper_body_text_title}>{!isLocal ? <p>{name?.split('@')[1] || file.toString()}</p> : <p>{name}</p>}</div>
          <div className={styles.fileWrapper_body_text_size}>
            <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={downloadIconPath} />
            <p>{showMetricByFileSize()}</p>
          </div>
        </div>
      ) : (
        <div className={styles.hwFileWrapper_body}>
          <div className={styles.hwFileWrapper_body_arrowDown}>
            <IconSvg path={arrowDownIconPath} viewBoxSize="0 0 40 40" height={40} width={40} />
          </div>
          <div className={styles.hwFileWrapper_body_text}>
            <div className={styles.hwFileWrapper_body_text_title}>{name?.split('@')[1]}</div>
            <div className={styles.hwFileWrapper_body_text_size}>{showMetricByFileSize()}</div>
          </div>
        </div>
      )}
    </a>
  )
}
