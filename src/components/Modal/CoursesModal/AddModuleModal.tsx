import React, { FC, memo } from 'react'
import { useShowModal } from '../../../customHooks/useShowModal'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { cross } from '../../../constants/iconSvgConstants'

import styles from '../Modal.module.scss'

type AddModuleModalPropsT = {
  setShowModal: (arg: boolean) => void
}
export const AddModuleModal: FC<AddModuleModalPropsT> = memo(({ setShowModal }: any) => {
  const handleClose = () => {
    setShowModal(false)
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '440px', padding: '36px 0' }} className={styles.classesContainer}>
        <div onClick={handleClose} className={styles.classesContainer_closed}>
          <IconSvg
            width={14}
            height={14}
            d={cross}
            stroke={'#E0DCED'}
            strokeWidth={'2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 14 14"
          />
        </div>
        <div className={styles.module_title}>Создание модуля</div>
        <div className={styles.module_input}>
          <span className={styles.module_input_label}>Введите название модуля:</span>
          <Input
            style={{ marginTop: '8px', marginBottom: '16px' }}
            name={'module'}
            value={''}
            type={'text'}
            focus={true}
            onChange={() => console.log('заглушка')}
          />
        </div>
        <Button text={'Создать модуль'} variant={'primary'} />
      </div>
    </div>
  )
})
