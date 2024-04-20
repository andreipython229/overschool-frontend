import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchModulesQuery, useFetchLessonQuery } from 'api/modulesServices'

import { ModulesBlock } from '../Constructor/ModulesAndLessonsBlock/ModulesBlock'

import { sectionT, commonLessonT } from 'types/sectionT'
import { lessonIdAndTypeT } from 'components/Modal/ModalTypes'

import styles from './comments.module.scss'


export const Comments: FC = () => {
    const schoolName = window.location.href.split('/')[4]
    const { course_id: courseId } = useParams()

    const [selectedLessonId, setSelectedLessonId] = useState<number>()
    const [lessonIdAndType, setLessonIdAndType] = useState<lessonIdAndTypeT>({} as lessonIdAndTypeT)
    const [modulesList, setModulesList] = useState<sectionT[]>([])
    const [check, setCheck] = useState(false)
    const [type, setType] = useState<keyof object | null>(null)
    const { data: modulesAndLessons, isSuccess } = useFetchModulesQuery({id: courseId as string, schoolName})
    const { data, isFetching, refetch } = useFetchLessonQuery({
        id: +lessonIdAndType.id,
        type: lessonIdAndType.type,
        schoolName,
      })
    const [lesson, setLesson] = useState(data as commonLessonT)

    useEffect(() => {
        if (modulesAndLessons?.sections.length) {
          setModulesList(modulesAndLessons?.sections)
          setCheck(true)
          const initialState = {
            id: modulesAndLessons?.sections[0]?.lessons[0]?.id,
            type: modulesAndLessons?.sections[0]?.lessons[0]?.type,
          }
          if (!lessonIdAndType.type) {
            setLessonIdAndType(initialState)
          }
        }
      }, [modulesAndLessons?.sections, lessonIdAndType.type])

    useEffect(() => {
      console.log('modulesList changed:', modulesList);
      if (modulesList.length > 0 && modulesList[0].lessons.length > 0) {
        if (lessonIdAndType.baseLessonId) {
          setSelectedLessonId(lessonIdAndType.baseLessonId)
        } else {
          setSelectedLessonId(modulesList[0].lessons[0].baselesson_ptr_id)
        }
      }
    }, [modulesList, check]);
    
  
    const handleOpenModalModule = () => {
      setType('module' as keyof object)
    }
  
    return (
    <div>
      <div className={styles.redactorCourse_leftSide}>
        <h5 className={styles.redactorCourse_leftSide_title}>Структура курса:</h5>
        <div className={styles.redactorCourse_leftSide_desc}>
          {modulesList &&
            modulesList.map(({ section_name, section, lessons }, index: number) => {
              if (!section_name) return
              return (
                <ModulesBlock
                  setType={setType}
                  key={section_name + section + index}
                  id={section}
                  setLessonIdAndType={setLessonIdAndType}
                  moduleName={section_name}
                  lessonsList={lessons}
                  selectedLessonId={selectedLessonId}
                  setSelectedLessonId={setSelectedLessonId}
                />
              )
            })}
        </div>
        <section
      style={{ opacity: isFetching ? 0.5 : 1, position: 'relative' }}
      className={styles.redactorCourse_rightSideWrapper}
    >
        <div className={styles.redactorCourse_rightSideWrapper_rightSide_functional}>
            <div className={styles.redactorCourse_rightSideWrapper_rightSide_nameBlock}>
              <div className={styles.redactorCourse_rightSideWrapper_rightSide_block}>
                <span className={styles.redactorCourse_rightSideWrapper_rightSide_block_nameSettings}>
                  {lesson && 'name' in lesson && lesson.name}
                </span>
              </div>
            </div>
            <span className={styles.redactorCourse_rightSideWrapper_rightSide_title}>Содержание занятия:</span>
          </div>
          </section>
      </div>

      </div>
    )
}
