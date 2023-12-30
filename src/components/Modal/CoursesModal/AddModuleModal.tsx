import {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import { useCreateModulesMutation } from 'api/modulesServices'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { formDataConverter } from '../../../utils/formDataConverter'
import { AddModuleModalPropsT } from '../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../Modal.module.scss'

export const AddModuleModal: FC<AddModuleModalPropsT> = ({ setType, courseId, modulesList }) => {

  const [modulesName, setModulesMane] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  const [createModules, { isLoading, isError }] = useCreateModulesMutation()

  const handleInputNameModules = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setModulesMane(name)
  }

  const handleCreateModules = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newModules = {
      name: modulesName,
      course: courseId,
      order: modulesList.length + 1,
    }
    const formdata = formDataConverter(newModules)

    await createModules({arg: formdata, schoolName})

    setType(null as keyof object)
  }

  const handleClose = () => {
    setType(null as keyof object)
  }

  return (
    <form onSubmit={handleCreateModules} style={{ maxWidth: '440px', padding: '36px 0' }} className={styles.classesContainer}>
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
      <Button
        style={{ minWidth: '280px' }}
        disabled={isLoading || isError}
        type={'submit'}
        text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать модуль'}
        variant={isLoading || isError ? 'disabled' : 'primary'}
      />
    </form>
  )
}
