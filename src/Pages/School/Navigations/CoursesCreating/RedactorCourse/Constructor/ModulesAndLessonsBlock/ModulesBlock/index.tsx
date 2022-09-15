import React, { FC, useState } from 'react'
import { IconSvg } from '../../../../../../../../components/common/IconSvg/IconSvg'
import { deleteIconPath } from '../../../../../../config/svgIconsPath'
import { useDeleteModulesMutation } from 'api/modulesServices'

import styles from '../../constructor.module.scss'
import stylesModules from '../ModulesBlock/modules_block.module.scss'

import Lesson from '../../../../../../../../assets/img/createCourse/lesson.svg'

type ModulesBlockT = {
  moduleName: string
  id: any
  lessonsList: Array<object>
}

export const ModulesBlock: FC<ModulesBlockT> = ({ moduleName, lessonsList, id }) => {
  const [changeModuleName, setChangeModuleName] = useState<string>('')

  const [deleteModule] = useDeleteModulesMutation()

  const handleDeleteModule = () => {
    deleteModule(id)
  }

  return (
    <>
      <div className={stylesModules.headerText}>
        <span className={styles.redactorCourse_leftSide_desc_title + ' ' + stylesModules.test}>{moduleName} </span>

        <input type="text" value={moduleName} className={stylesModules.block} />
      </div>
      <button onClick={handleDeleteModule}>
        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
      </button>

      <span className={styles.redactorCourse_leftSide_desc_lesson}>
        <img src={Lesson} alt="Lessons" />
        Первый урок
      </span>
      <button className={styles.btn} onClick={() => console.log('заглушка')}>
        + Занятие
      </button>
    </>
  )
}
