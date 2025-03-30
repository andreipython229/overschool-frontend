import { FC, memo, useEffect, useState, useCallback } from 'react'
import { Button } from 'components/common/Button/Button'
import { ModulesBlock } from './ModulesBlock'
import { LessonAddBlockPropsT } from '../../../../../../../types/navigationTypes'
import styles1 from '../../../../../../..//components/Modal/Modal.module.scss'
import styles from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/constructor.module.scss'
import { useChangeModuleOrderMutation } from 'api/modulesServices'
import { useDebounceFunc } from 'customHooks'
import { sectionT } from 'types/sectionT'
import { Reorder } from 'framer-motion'
import stylesModules from './ModulesBlock/modules_block.module.scss'
import { schoolSelector } from 'selectors'
import { useAppSelector } from 'store/hooks'

export const ModulesAndLessonsBlock: FC<LessonAddBlockPropsT> = memo(
  ({ setType, modulesList, courseName, setModulesList, setLessonIdAndType, isLoading, baseLessonId, setInsertAfterOrder }) => {
    const [changeOrder, { isLoading: changingOrder }] = useChangeModuleOrderMutation()
    const debounceBlockOrder = useDebounceFunc(changeOrder, 2000)
    const [selectedLessonId, setSelectedLessonId] = useState<number>()
    const [newSectionsOrders, setNewSectionsOrders] = useState<sectionT[]>([])
    const { schoolName } = useAppSelector(schoolSelector)

    useEffect(() => {
      if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
        if (baseLessonId) {
          setSelectedLessonId(baseLessonId)
        } else {
          const firstNonEmptyModule = modulesList.find(module => module.lessons.length > 0)
          if (firstNonEmptyModule) {
            setSelectedLessonId(firstNonEmptyModule.lessons[0].baselesson_ptr_id)
          }
        }
      }
    }, [modulesList, isLoading])

    useEffect(() => {
      if (modulesList && !modulesList.length) {
        setModulesList(modulesList)
      }
    }, [modulesList])

    useEffect(() => {
      const updatedBlockOrder = newSectionsOrders.map(({ section: id, order }, index) => ({
        section_id: id,
        order: index + 1,
      }))
      if (updatedBlockOrder.length > 0 && updatedBlockOrder.length > 0) {
        debounceBlockOrder({ data: updatedBlockOrder, schoolName })
      }
    }, [newSectionsOrders])

    useEffect(() => {
      if (newSectionsOrders.length > 0) {
        setModulesList(newSectionsOrders)
      }
    }, [newSectionsOrders])

    const handleOrderUpdate = useCallback(
      (sectionsWithNewOrders: sectionT[]) => {
        setNewSectionsOrders(sectionsWithNewOrders)
        setModulesList(sectionsWithNewOrders)
      },
      [setNewSectionsOrders, setModulesList],
    )

    const handleOpenModalModule = () => {
      setType('module' as keyof object)
    }

    return (
      <div className={styles.redactorCourse_leftSide}>
        <div className={styles.redactorCourse_leftSide_title}>
          <h5 className={styles.redactorCourse_leftSide_title_name}>{courseName}</h5>
        </div>
        <div className={styles.redactorCourse_leftSide_desc}>
          <Reorder.Group className={styles1.settings_list} values={modulesList} onReorder={handleOrderUpdate} as="ul">
            {modulesList &&
              modulesList.map((section: sectionT, index: number) => {
                if (!section.section_name) return
                return (
                  <ModulesBlock
                    section={section}
                    setType={setType}
                    id={section.section}
                    key={section.section + section.section_name}
                    setLessonIdAndType={setLessonIdAndType}
                    moduleName={section.section_name}
                    lessonsList={section.lessons}
                    selectedLessonId={selectedLessonId}
                    setSelectedLessonId={setSelectedLessonId}
                    onOpenModalModule={handleOpenModalModule}
                    setInsertAfterOrder={setInsertAfterOrder}
                  />
                )
              })}
          </Reorder.Group>
          <Button className={styles.btn} onClick={handleOpenModalModule} text={'+ Добавить новый модуль'} />
        </div>
      </div>
    )
  },
)
