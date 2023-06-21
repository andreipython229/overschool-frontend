import { FC, memo, useEffect, useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { typeClasses } from '../../../constants/typeClasses'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { modalTypeClassesTrainingPath, modalTypeClassesTaskPath, modalTypeClassesTextPath, modalTypeClassesWebinarPath } from './config/svgIconsPath'
import { ModalClassesPropsT } from '../ModalTypes'

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
      <div className={styles.classesContainer_main}>
        <span className={styles.classesContainer_title}>Выберите тип занятий</span>
        <div className={styles.classesContainer_type}>
          <div
            onClick={() => setActiveClasses('lesson' as keyof object)}
            className={activeClasses === 'lesson' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
          >
            <IconSvg width={42} height={37} viewBoxSize="0 0 42 37" path={modalTypeClassesTrainingPath} />
            <span>Обычное</span>
          </div>
          <div
            onClick={() => setActiveClasses('homework' as keyof object)}
            className={
              activeClasses === 'homework' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes
            }
          >
            <IconSvg width={41} height={40} viewBoxSize="0 0 41 40" path={modalTypeClassesTaskPath} />
            <span>Домашнее задание</span>
          </div>
          <div
            onClick={() => setActiveClasses('test' as keyof object)}
            className={activeClasses === 'test' ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
          >
            <IconSvg width={30} height={40} viewBoxSize="0 0 30 40" path={modalTypeClassesTextPath} />
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
        <div className={styles.classesContainer_type_btnBlock}>
          <Button
            style={{
              width: '85px',
              height: '100%',
              padding: '17px',
              fontSize: '14px',
              fontWeight: '400',
              borderRadius: '10px',
            }}
            onClick={handleClose}
            text={'Отмена'}
          />
          <Button
            style={{
              marginLeft: '12px',
              fontSize: '14px',
              fontWeight: '400',
            }}
            variant={'primary'}
            onClick={setClassesType}
            text={'Далее'}
          />
        </div>
      </div>
    </div>
  )
})
