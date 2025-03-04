import React, { FC } from 'react'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { LimitModalPropsT } from '../ModalTypes'

import styles from '../Modal.module.scss'
import { Button } from '../../common/Button/Button'

export const LimitModal: FC<LimitModalPropsT> = ({ message, setShowLimitModal, setShowMainModal, action, roleExist }) => {
  const handlerModal = () => {
    setShowLimitModal()
    setShowMainModal && setShowMainModal()
  }

  const handleAction = () => {
    handlerModal()
    action && action()
  }

  return (
    <div className={styles.mainCourse}>
      <div className={styles.mainCourse_container}>
        <div className={styles.mainCourse_closed} onClick={handlerModal}>
          <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </div>
        <div className={styles.mainCourse_title}>{message}</div>
        {roleExist && (
          <>
            <div className={styles.mainCourse_desc}>При назначении новой роли прежняя будет отозвана</div>
            <Button type="submit" onClick={handleAction} text={'Назначить новую роль'} variant={'primary'} style={{ width: '280px' }} />
          </>
        )}
      </div>
    </div>
  )
}
