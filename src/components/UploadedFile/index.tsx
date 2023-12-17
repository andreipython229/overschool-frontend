import { FC } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deletePath } from 'config/commonSvgIconsPath'

import styles from './uploadedfile.module.scss'

type uploadedFileT = {
  file: string
  index: number
  size: number
  name?: string
  handleDeleteFile?: (index: number) => void
  isHw?: boolean
}

export const UploadedFile: FC<uploadedFileT> = ({ file, index, name, size, handleDeleteFile, isHw }) => {
  const showMetricByFileSize = () => {
    const fileSizeInKB = size / 1024
    const fileSizeInMB = fileSizeInKB / 1024

    let fileSize
    let unit

    if (fileSizeInMB >= 1) {
      fileSize = fileSizeInMB.toFixed(1)
      unit = 'MB'
    } else {
      fileSize = fileSizeInKB.toFixed(1)
      unit = 'KB'
    }

    return `${fileSize} ${unit}`
  }

  return (
    <a href={file} rel={'noreferrer'} target={'_blank'} download={name}>
      <div className={styles.file__download_container}>
        <div className={styles.file__download_wrap}>
          <div className={styles.file__download_blackDiv}></div>
          {!isHw ? <p>{name?.split('@')[1] || file.toString()}</p> : <p>{name}</p>}
        </div>
        <div className={styles.file__download_wrap}>
          <span className={styles.file__download_size}>{showMetricByFileSize()}</span>
          {handleDeleteFile && (
            <span
              className={styles.file__download_icon}
              onClick={e => {
                e.preventDefault()
                handleDeleteFile(index)
              }}
            >
              <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
