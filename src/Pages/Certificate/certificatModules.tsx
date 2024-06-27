import { FC } from 'react'
import styles from './coursePreview.module.scss'
import { Lesson, Section } from 'types/courseStatT'
import { getNounDeclension } from 'utils/getNounDeclension'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { accardionArrPath } from 'Pages/StudentCourse/config/svgIconPath'
import { LessonItem } from './LessonItem'

type CertificatModulesT = {
  section: Section
  sectionIndex: number
  handleToggleOpen: (index: number) => void
  openIndex: number
}

export const CertificatCourseModules: FC<CertificatModulesT> = ({ section, sectionIndex, handleToggleOpen, openIndex }) => {
  return (
    <div className={styles.accardionWrapper_component}>
      <div onClick={() => handleToggleOpen(sectionIndex)} className={styles.accardionWrapper_component_header}>
        <span className={styles.accardionWrapper_component_header_completedIcon}>{sectionIndex + 1}</span>
        <div className={styles.accardionWrapper_component_header_lessonName}>
          <h4 className={styles.accardionWrapper_component_header_lessonName_title}>
            {section?.name}
            <span></span>
          </h4>
          <span className={styles.accardionWrapper_component_header_lessonName_exerciseSum}>
            {section.lessons.length}
            <span>{getNounDeclension(section.lessons.length, ['занятие', 'занятия', 'занятий'])}</span>
          </span>
        </div>
        <span
          className={
            openIndex === sectionIndex
              ? styles.accardionWrapper_component_header_showBtnWrapper_active
              : styles.accardionWrapper_component_header_showBtnWrapper
          }
        >
          <IconSvg
            width={22}
            height={13}
            viewBoxSize="0 0 22 13"
            path={[{ ...accardionArrPath[0], fill: openIndex === sectionIndex ? '#aa00ff' : '#4D5766' }]}
          />
        </span>
      </div>
      {openIndex === sectionIndex && (
        <div className={styles.accardionWrapper_component_exerciseWrapper}>
          {section &&
            section.lessons.map((lesson: Lesson, lessonIndex: number) => <LessonItem key={lessonIndex + lesson.lesson_id} lesson={lesson} />)}
        </div>
      )}
    </div>
  )
}
