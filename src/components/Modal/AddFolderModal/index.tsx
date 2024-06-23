import { FC, useEffect, useState } from 'react'
import styles from './AddNewFolderModal.module.scss'
import { motion } from 'framer-motion'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { useCreateNewFoldersMutation } from 'api/coursesServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

interface IAddFolderModal {
  refreshFolders: () => void
  close: () => void
}

export const AddNewFolderModal: FC<IAddFolderModal> = ({ refreshFolders, close }) => {
  const [folderName, setFolderName] = useState<string>('')
  const [createFolder, { isLoading, isSuccess }] = useCreateNewFoldersMutation()
  const schoolName = window.location.href.split('/')[4]

  useEffect(() => {
    if (isSuccess) {
      refreshFolders()
      close()
    }
  }, [isSuccess, refreshFolders, close])

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        initial={{
          scale: 0.1,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          delay: 0.3,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <button className={styles.container_closeModal} onClick={close}>
            <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
          </button>
        </div>
        <h2 style={{ width: '100%', textAlign: 'center' }}>Cоздание новой папки</h2>
        <Input
          id="folder-name"
          name="folder-name"
          type="text"
          value={folderName}
          onChange={event => setFolderName(event.target.value)}
          placeholder="Введите название для новой папки"
        />
        <Button
          text={isLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Создать'}
          onClick={() => createFolder({ data: { name: folderName }, schoolName })}
        />
      </motion.div>
    </div>
  )
}
