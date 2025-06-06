import { FC, memo, useState, useEffect } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ExerciseItem } from '../ExerciseItem/ExerciseItem'
import { ExerciseImageItem } from '../ExerciseItem/ExerciseImageItem'
import {
  accardionArrPath,
  successStatusActive,
  successStatus,
  middleStatusActive,
  middleStatus,
  failStatusActive,
  failStatus,
  markIcon,
} from '../../../Pages/StudentCourse/config/svgIconPath'
import {
  lessonHeaderIcon,
  testHeaderIcon,
  homeworkHeaderIcon,
} from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/ModulesAndLessonsBlock/LessonsBlock/config'
import { getNounDeclension } from 'utils/getNounDeclension'
import { lessonT } from '../../../types/sectionT'
import { accardionItemT } from '../../../types/componentsTypes'

import styles from './accardionItem.module.scss'
import { Modal } from 'components/Modal/NoPermForLesson/Modal'

export const AccardionItem: FC<accardionItemT> = memo(({ module, modules, moduleIndex, openIndex, handleToggleOpen }) => {
  const isLessonClickable = (lessonIndex: number) => {
    if (!modules?.group_settings.strict_task_order || (moduleIndex === 0 && lessonIndex === 0)) {
      return false
    }
    const prevModule = moduleIndex > 0 ? modules?.sections[moduleIndex - 1] : null
    const prevLesson = prevModule && lessonIndex === 0 ? prevModule?.lessons[prevModule?.lessons.length - 1] : module?.lessons[lessonIndex - 1]

    const somePrevNotViewed = module?.lessons.slice(0, lessonIndex).some(lesson => !lesson.viewed)

    const disabledFromPrev =
      (prevLesson.type === 'homework' && modules?.group_settings.submit_homework_to_go_on && !prevLesson.sended) ||
      (prevLesson.type === 'test' &&
        ((modules?.group_settings.submit_test_to_go_on && !prevLesson.sended) ||
          (modules?.group_settings.success_test_to_go_on && !prevLesson.completed)))

    return !prevLesson.viewed || somePrevNotViewed || disabledFromPrev
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
  if (openIndex === moduleIndex && module?.lessons.length === 0) {
    setIsModalOpen(true);
      }
    }, [openIndex, moduleIndex, module?.lessons.length]);
  return (
    <>
    <div className={styles.accardionWrapper_component}>
      <div
        onClick={() => handleToggleOpen(moduleIndex)}
        className={openIndex === moduleIndex ? styles.accardionWrapper_component_header_active : styles.accardionWrapper_component_header}
      >
        <span
          className={
            openIndex === moduleIndex ? styles.accardionWrapper_component_header_number_active : styles.accardionWrapper_component_header_number
          }
        >
          <span style={{ width: '64px', textAlign: 'center' }}>{moduleIndex + 1}</span>
        </span>
        <span className={styles.accardionWrapper_component_header_marks}>
          <IconSvg
            width={20}
            height={20}
            viewBoxSize="0 0 20 20"
            path={openIndex === moduleIndex ? markIcon('white', '#357EEB') : markIcon('#357EEB', 'white')}
          />
          {module?.sum_marks}/{module?.homework_count ? module?.homework_count * 5 : 0}
        </span>
        <div className={styles.accardionWrapper_component_header_container}>
          <div className={styles.accardionWrapper_component_header_lessonName}>
            <h4 className={styles.accardionWrapper_component_header_lessonName_title}>{module?.section_name}</h4>
            {/*<span className={styles.accardionWrapper_component_header_lessonName_exerciseSum}>*/}
            {/*  {module.lessons.length !== 0 */}
            {/*  ? <span>{module.lessons.length} {getNounDeclension(module.lessons.length, ['Занятие', 'Занятия', 'Занятий'])}</span>*/}
            {/*  : <span>Модуль откроется чуть позже</span>*/}
            {/*  }*/}
            {/*</span>*/}
          </div>
          <div className={styles.accardionWrapper_component_header_stats}>
            <span className={styles.accardionWrapper_component_header_stats_lesson}>
              <IconSvg
                width={24}
                height={24}
                viewBoxSize="0 0 24 24"
                path={openIndex === moduleIndex ? lessonHeaderIcon('white') : lessonHeaderIcon('#332f36')}
              />
              {module?.completed_les_count}/{module?.lesson_count}
            </span>
            <span className={styles.accardionWrapper_component_header_stats_lesson}>
              <IconSvg
                width={24}
                height={24}
                viewBoxSize="0 0 24 24"
                path={openIndex === moduleIndex ? testHeaderIcon('white') : testHeaderIcon('#332f36')}
              />
              {module?.completed_test_count}/{module?.test_count}
            </span>
            <span className={styles.accardionWrapper_component_header_stats_lesson}>
              <IconSvg
                width={24}
                height={24}
                viewBoxSize="0 0 24 24"
                path={openIndex === moduleIndex ? homeworkHeaderIcon('white') : homeworkHeaderIcon('#332f36')}
              />
              {module?.completed_hw_count}/{module?.homework_count}
            </span>
          </div>
        </div>
        <span className={styles.accardionWrapper_component_header_status}>
          <IconSvg
            width={30}
            height={30}
            viewBoxSize="0 0 30 30"
            path={
              module?.completed_count === 0
                ? openIndex === moduleIndex
                  ? failStatusActive
                  : failStatus
                : module?.completed_count === module?.lessons.length
                ? openIndex === moduleIndex
                  ? successStatusActive
                  : successStatus
                : openIndex === moduleIndex
                ? middleStatusActive
                : middleStatus
            }
          />
        </span>
        <span
          className={
            openIndex === moduleIndex
              ? styles.accardionWrapper_component_header_showBtnWrapper_active
              : styles.accardionWrapper_component_header_showBtnWrapper
          }
        >
          <IconSvg
            width={22}
            height={13}
            viewBoxSize="0 0 22 13"
            path={[{ ...accardionArrPath[0], fill: openIndex === moduleIndex ? '#ffffff' : '#357dea' }]}
          />
        </span>
      </div>
      {openIndex === moduleIndex &&
        module &&
        (module.lessons.length > 14 || window.innerWidth <= 800 ? (
          <div className={styles.accardionWrapper_component_exerciseWrapper}>
            {module &&
              module.lessons.map((lesson: lessonT, lessonIndex: number) => (
                <ExerciseItem key={lesson.order + lesson.id} lesson={lesson} sectionId={module.section} disabled={isLessonClickable(lessonIndex)} />
              ))}
          </div>
        ) : (
          <div className={styles.accardionWrapper_component_exerciseWrapperImage}>
            {module &&
              module.lessons.map((lesson: lessonT, lessonIndex: number) => (
                <ExerciseImageItem
                  key={lesson.order + lesson.id}
                  lesson={lesson}
                  sectionId={module.section}
                  disabled={isLessonClickable(lessonIndex)}
                />
              ))}
          </div>
        ))}
    </div>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        Доступ к следующим модулям закрыт. Обратитесь к администратору школы для уточнения информации.
    </Modal>
    </>
  )
})
