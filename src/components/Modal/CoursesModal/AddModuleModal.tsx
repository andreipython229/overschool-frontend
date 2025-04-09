import {ChangeEvent, FC, FormEvent, useState} from 'react'
import { useCreateModulesMutation } from 'api/modulesServices'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { formDataConverter } from '../../../utils/formDataConverter'
import { AddModuleModalPropsT } from '../ModalTypes'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../Modal.module.scss'
import { penIconPath } from 'Pages/Settings/Main/iconComponents'

export const AddModuleModal: FC<AddModuleModalPropsT> = ({ setType, courseId, modulesList, insertAfterModuleOrder, setInsertAfterModuleOrder, setModulesList }) => {

  const [modulesName, setModulesMane] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  const [createModules, { isLoading, isError }] = useCreateModulesMutation()

  const handleInputNameModules = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setModulesMane(name)
  }

  const handleCreateModules = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const lastSection = modulesList.length > 0 ? Math.max(...modulesList.map(module => module.section)) : 0;
    const newSection = lastSection + 1;
    const order = insertAfterModuleOrder !== undefined ? insertAfterModuleOrder + 1 : 1;
    const newModules = {
      name: modulesName,
      section_name: modulesName,
      section: newSection,
      course: Number(courseId),
      order,
      lessons: []
    }

    const formdata = formDataConverter(newModules)  
    await createModules({arg: formdata, schoolName}).unwrap()

    let updateModulesList = [...modulesList];

    if(insertAfterModuleOrder !== undefined) {
      updateModulesList = updateModulesList.map(module => 
        module.order > insertAfterModuleOrder ? {...module, order: module.order + 1} : module
      );

      const insertIndex = updateModulesList.findIndex(module => module.order === insertAfterModuleOrder) + 1;
      updateModulesList.splice(insertIndex, 0, newModules);
    }
    else {
      updateModulesList = [newModules, ...updateModulesList.map(module => ({...module, order: module.order + 1}))];
    }

    setModulesList(updateModulesList);

    setType(null as keyof object)
    setInsertAfterModuleOrder(null)
  }

  const handleClose = () => {
    setType(null as keyof object)
    setInsertAfterModuleOrder(null)
  }
  return (
    <form onSubmit={handleCreateModules} className={styles.classesContainer}>
      <div onClick={handleClose} className={styles.classesContainer_closed}>
        <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.module_title}>Создание модуля</div>
      <div className={styles.usually_input}>
        <Input
          style={{ marginTop: '45px', marginBottom: '24px'}}
          placeholder='Введите название модуля'
          name={'module'}
          value={modulesName}
          type={'text'}
          focus={true}
          onChange={handleInputNameModules}
        >
        <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
        </Input>
      </div>
      <div className={styles.module_button}>
        <Button
          style={{ width: '100%' }}
          disabled={isLoading || isError}
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Создать модуль'}
          variant={isLoading || isError ? 'inActive' : 'newPrimary'}
        />
      </div>
    </form>
  )
}
