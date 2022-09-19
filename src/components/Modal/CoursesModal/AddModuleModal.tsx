import { ChangeEvent, FC, memo, useState } from 'react'
import { useCreateModulesMutation } from 'api/modulesServices'
import { useShowModal } from '../../../customHooks/useShowModal'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { useAppSelector } from '../../../store/hooks'
import { getIdSelector } from '../../../selectors'
import { formDataConverter } from '../../../utils/formDataConverter'

import styles from '../Modal.module.scss'
import { AddModuleModalPropsT } from '../ModalTypes'



export const AddModuleModal: FC<AddModuleModalPropsT> = memo(({ setShowModal }) => {
  const [modulesName, setModulesMane] = useState<string>('')

  const courseId = useAppSelector(getIdSelector)

  const [createModules] = useCreateModulesMutation()

  const handleInputNameModules = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setModulesMane(name)
  }

  const handleCreateModules = async () => {
    const newModules = {
      name: modulesName,
      course: courseId,
    }
    const formdata = formDataConverter(newModules)

    await createModules(formdata)

    setShowModal(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  useShowModal({ setShowModal })

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '440px', padding: '36px 0' }} className={styles.classesContainer}>
        <div onClick={handleClose} className={styles.classesContainer_closed}>
          <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
        </div>
        <div className={styles.module_title}>Создание модуля</div>
        <div className={styles.module_input}>
          <span className={styles.module_input_label}>Введите название модуля:</span>
          <Input
            style={{ marginTop: '8px', marginBottom: '16px' }}
            name={'module'}
            value={modulesName}
            type={'text'}
            focus={true}
            onChange={handleInputNameModules}
          />
        </div>
        <Button onClick={handleCreateModules} text={'Создать модуль'} variant={'primary'} />
      </div>
    </div>
  )
})
