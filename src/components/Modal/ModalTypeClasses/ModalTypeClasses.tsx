import { FC, memo, useState } from 'react'

import { Button } from 'components/common/Button/Button'
import { typeClasses } from '../../../constants/typeClasses'
import { useShowModal } from '../../../customHooks/useShowModal'
import { useAppDispatch } from '../../../store/hooks'
import { showModal } from '../../../store/redux/modal/slice'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import 
{ 
  modalTypeClassesTrainingPath, 
  modalTypeClassesTaskPath, 
  modalTypeClassesTextPath, 
  modalTypeClassesWebinarPath 
} from './config/svgIconsPath'

import styles from '../Modal.module.scss'
import { ModalClassesPropsT } from '../ModalTypes'


export const ModalTypeClasses: FC<ModalClassesPropsT> = memo(({ setShowModal, changeClasses }) => {
  const [activeClasses, setActiveClasses] = useState<number>(0)
  const dispatch = useAppDispatch()

  const setClassesType = (id: number) => () => {
    changeClasses(id)
    dispatch(showModal(true))
  }

  useShowModal({ setShowModal })

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div className={styles.classesContainer_main}>
          <span className={styles.classesContainer_title}>Выберите тип занятий</span>
          <div className={styles.classesContainer_type}>
            <div
              onClick={() => setActiveClasses(0)}
              className={activeClasses === 0 ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
            >
              <IconSvg width={42} height={37} viewBoxSize="0 0 42 37" path={modalTypeClassesTrainingPath} />
              <span>Обычное</span>
            </div>
            <div
              onClick={() => setActiveClasses(1)}
              className={activeClasses === 1 ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
            >
              <IconSvg width={41} height={40} viewBoxSize="0 0 41 40" path={modalTypeClassesTaskPath} />
              <span>Задание</span>
            </div>
            <div
              onClick={() => setActiveClasses(2)}
              className={activeClasses === 2 ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
            >
              <IconSvg width={30} height={40} viewBoxSize="0 0 30 40" path={modalTypeClassesTextPath} />
              <span>Текст</span>
            </div>
            <div
              onClick={() => setActiveClasses(3)}
              className={activeClasses === 3 ? styles.classesContainer_type_classes + ' ' + styles.active : styles.classesContainer_type_classes}
            >
              <IconSvg width={33} height={35} viewBoxSize="0 0 33 35" path={modalTypeClassesWebinarPath} />

              <span>Вебинар</span>
            </div>
          </div>
          <div className={styles.classesContainer_type_subs}>{typeClasses.map(el => (el.id === activeClasses ? el.text : null))}</div>
          <div className={styles.classesContainer_type_btnBlock}>
            <Button style={{ width: '85px', height: '100%', padding: '17px', fontSize: '14px', fontWeight: '400', borderRadius: '10px' }} onClick={handleClose} text={'Отмена'} />
            <Button
              style={{
                marginLeft: '12px',
                fontSize: '14px',
                fontWeight: '400',
              }}
              variant={'primary'}
              onClick={setClassesType(activeClasses)}
              text={'Далее'}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
