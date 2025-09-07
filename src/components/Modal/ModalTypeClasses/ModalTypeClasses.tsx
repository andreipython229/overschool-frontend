import { FC, memo, useEffect, useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { typeClasses } from '../../../constants/typeClasses'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ModalClassesPropsT } from '../ModalTypes'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { UsuallyClassesIcon } from './constants/usuallyClassesIcon'
import { TasksModalIcon } from './constants/tasksModalIcon'
import { TestModalIcon } from './constants/testModalIcon'

import styles from '../Modal.module.scss'

export const ModalTypeClasses: FC<ModalClassesPropsT> = memo(({ setType }) => {
  const [activeClasses, setActiveClasses] = useState<string>('lesson')

  const setClassesType = () => {
    setType(activeClasses as keyof object)
  }

  const handleClose = () => {
    setType(null as keyof object)
  }

  return (
    <div className={styles.classesContainer}>
      <div onClick={handleClose} className={styles.classesContainer_closed}>
        <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.classesContainer_main}>
        <span className={styles.classesContainer_title}>Выберите тип занятий</span>
        <div className={styles.classesContainer_type}>
          <div
            onClick={() => setActiveClasses('lesson' as keyof object)}
            className={activeClasses === 'lesson' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
          >
            <UsuallyClassesIcon width={121} height={106} />
            <span>Обычное</span>
          </div>
          <div
            onClick={() => setActiveClasses('homework' as keyof object)}
            className={
              activeClasses === 'homework' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes
            }
          >
            <TasksModalIcon width={121} height={106} />
            <span>Домашнее задание</span>
          </div>
          <div
            onClick={() => setActiveClasses('test' as keyof object)}
            className={activeClasses === 'test' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
          >
            <TestModalIcon width={109} height={106} />
            <span>Тест</span>
          </div>
          {/*<div*/}
          {/*    onClick={() => setActiveClasses('webinar' as keyof object)}*/}
          {/*    className={*/}
          {/*        activeClasses === 'webinar' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes*/}
          {/*    }*/}
          {/*>*/}
          {/*    <IconSvg width={33} height={35} viewBoxSize="0 0 33 35" path={modalTypeClassesWebinarPath}/>*/}

          {/*    <span>Вебинар</span>*/}
          {/*</div>*/}
        </div>
        <div className={styles.classesContainer_type_subs}>{typeClasses.map(el => (el.type === activeClasses ? el.text : null))}</div>
        <div className={styles.classesContainer_type_btnBlock} style={{ marginTop: '20px' }}>
          <Button variant={'cancel'} onClick={handleClose} text={'Отмена'} />
          <Button variant={'newPrimary'} onClick={setClassesType} text={'Далее'} />
        </div>
      </div>
    </div>
  )
})
