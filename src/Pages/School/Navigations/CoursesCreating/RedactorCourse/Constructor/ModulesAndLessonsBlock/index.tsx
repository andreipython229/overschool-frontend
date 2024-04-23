import { FC, memo, useEffect, useState, PointerEvent } from 'react'
import { Button } from 'components/common/Button/Button'
import { ModulesBlock } from './ModulesBlock'
import { LessonAddBlockPropsT } from '../../../../../../../types/navigationTypes'
import styles1 from '../../../../../../..//components/Modal/Modal.module.scss'
import styles from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'
import { useChangeModuleOrderMutation } from 'api/modulesServices'
import { useDebounceFunc } from 'customHooks'
import { sectionT } from 'types/sectionT'
import { Reorder, useDragControls } from 'framer-motion'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'

export const ModulesAndLessonsBlock: FC<LessonAddBlockPropsT> = memo(({ setType, modulesList, setLessonIdAndType, isLoading, baseLessonId }) => {
  const [changeOrder, { isLoading: changingOrder }] = useChangeModuleOrderMutation()
  const debounceBlockOrder = useDebounceFunc(changeOrder, 2000)
  const [selectedLessonId, setSelectedLessonId] = useState<number>()
  const [newSectionsOrders, setNewSectionsOrders] = useState<sectionT[]>([])
  const schoolName = window.location.href.split('/')[4]
  const controls = useDragControls()

  useEffect(() => {
    console.log('modulesList changed:', modulesList)
    if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
      if (baseLessonId) {
        setSelectedLessonId(baseLessonId)
      } else {
        setSelectedLessonId(modulesList[0].lessons[0].baselesson_ptr_id)
      }
    }
  }, [modulesList, isLoading])

  useEffect(() => {
    const updatedBlockOrder = newSectionsOrders.map(({ section: id, order }, index) => ({
      section_id: id,
      order: index + 1,
    }))
    if (updatedBlockOrder.length > 0 && updatedBlockOrder.length > 0) {
      debounceBlockOrder({ data: updatedBlockOrder, schoolName })
    }
  }, [newSectionsOrders])

  const handleOrderUpdate = (sectionsWithNewOrders: sectionT[]) => {
    setNewSectionsOrders(sectionsWithNewOrders)
  }

  const handleOpenModalModule = () => {
    setType('module' as keyof object)
  }
  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

  return (
    <div className={styles.redactorCourse_leftSide}>
      <h5 className={styles.redactorCourse_leftSide_title}>Структура курса:</h5>
      <div className={styles.redactorCourse_leftSide_desc}>
        <Reorder.Group className={styles1.settings_list} values={modulesList} onReorder={handleOrderUpdate} as="ul">
          {modulesList &&
            modulesList.map((section: sectionT, index: number) => {
              if (!section.section_name) return
              return (
                <Reorder.Item
                  value={section}
                  dragListener={false}
                  dragControls={controls}
                  whileDrag={{
                    scale: 1.1,
                    borderRadius: '7px',
                  }}
                  key={section.section + index}
                >
                  {/* <span style={{ cursor: 'grab' }} onPointerDown={onPointerDown}>
                    <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
                  </span> */}
                  <ModulesBlock
                    setType={setType}
                    key={section.section_name + section.section + index}
                    id={section.section}
                    setLessonIdAndType={setLessonIdAndType}
                    moduleName={section.section_name}
                    lessonsList={section.lessons}
                    selectedLessonId={selectedLessonId}
                    setSelectedLessonId={setSelectedLessonId}
                  />
                </Reorder.Item>
              )
            })}
        </Reorder.Group>
        <hr />
        <div className={styles.redactorCourse_leftSide_modul}>
          <Button onClick={handleOpenModalModule} text={'+ модуль'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
})
