import { FC, memo } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ExerciseItem } from '../ExerciseItem/ExerciseItem'
import { accardionArrPath } from '../../../Pages/StudentCourse/config/svgIconPath'
import { getNounDeclension } from 'utils/getNounDeclension'
import { lessonT } from '../../../types/sectionT'
import { accardionItemT } from '../../../types/componentsTypes'

import styles from './accardionItem.module.scss'

export const AccardionItem: FC<accardionItemT> = memo(({ module, modules, moduleIndex, openIndex, handleToggleOpen }) => {
  const isLessonClickable = (lessonIndex: number) => {
    if (moduleIndex > 0) {
      const prevModule = modules?.sections[moduleIndex - 1]
      const prevLessons = prevModule?.lessons[prevModule?.lessons.length - 1]
      if (prevLessons?.viewed) {
        return module?.lessons.slice(0, lessonIndex).some(lesson => !lesson.viewed)
      } else {
        return true
      }
    }
    return module?.lessons.slice(0, lessonIndex).some(lesson => !lesson.viewed)
  }

  return (
    <div className={styles.accardionWrapper_component}>
      <div onClick={() => handleToggleOpen(moduleIndex)} className={styles.accardionWrapper_component_header}>
        <span className={styles.accardionWrapper_component_header_completedIcon}>
          {/*<IconSvg width={16} height={13} viewBoxSize="0 0 16 13" path={completedIconPath} />*/}
          {moduleIndex + 1}
        </span>
        <div className={styles.accardionWrapper_component_header_lessonName}>
          <h4 className={styles.accardionWrapper_component_header_lessonName_title}>
            {module?.section_name}
            <span></span>
          </h4>
          <span className={styles.accardionWrapper_component_header_lessonName_exerciseSum}>
            {module.lessons.length}
            <span>{getNounDeclension(module.lessons.length, ['Материал', 'Материала', 'Материалов'])}</span>
          </span>
        </div>
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
            path={[{ ...accardionArrPath[0], fill: openIndex === moduleIndex ? '#C6C6C6' : '#4D5766' }]}
          />
        </span>
      </div>
      {openIndex === moduleIndex && (
        <div className={styles.accardionWrapper_component_exerciseWrapper}>
          {module &&
            module.lessons.map((lesson: lessonT, lessonIndex: number) => (
              <ExerciseItem key={lesson.order + lesson.id} lesson={lesson} sectionId={module.section} disabled={isLessonClickable(lessonIndex)} />
            ))}
        </div>
      )}
    </div>
  )
})
