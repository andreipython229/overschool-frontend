import { FC, useState } from 'react'

import { result } from 'types/courseStatT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { groupIconPath, tableBallsStarPath } from 'config/commonSvgIconsPath'
import { accardionArrPath } from 'Pages/StudentCourse/config/svgIconPath'
import { lessonSvgMapper } from 'config'

import styles from './studentInfoAccardion.module.scss'

type studentInfoAccardionT = {
  student: result | null
}

export const StudentInfoAccardion: FC<studentInfoAccardionT> = ({ student }) => {
  const [isAccardionOpen, studentInfoAccardion] = useState<boolean>(false)

  return (
    <div className={styles.accardion}>
      <div>
        <div className={styles.accardion_header} onClick={() => studentInfoAccardion(prev => !prev)}>
          {student?.courses_avatar ? (
            <img className={styles.accardion_course_img} src={window.appConfig.imagePath + student?.courses_avatar} alt="course_avatar" />
          ) : (
            <div className={styles.accardion_course_avatar}></div>
          )}
          <div className={styles.accardion_info}>
            <p className={styles.accardion_course_name}>{student?.course_name}</p>
            <div className={styles.accardion_group}>
              <IconSvg width={14} height={14} viewBoxSize={'0 0 14 14'} path={groupIconPath} />
              <span>{student?.group_name}</span>
            </div>
          </div>
          <div className={styles.accardion_progress}>
            <div className={styles.accardion_progress_item}>
              {/* заглушка */}
              <div style={{ width: '14px', height: '14px', backgroundColor: '#BA75FF', borderRadius: '50%' }}></div>
              <span>12/110</span>
            </div>
            <div className={styles.accardion_progress_item}>
              {/* заглушка */}
              <div style={{ width: '14px', height: '14px', backgroundColor: '#BA75FF', borderRadius: '50%' }}></div>
              <span>0%</span>
            </div>
            <div className={styles.accardion_progress_item}>
              <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath} />
              {/* заглушка */}
              <span>
                {student?.average_mark?.toFixed(0) ?? 0}/{student?.mark_sum ?? 0}
              </span>
            </div>
          </div>
          <div className={`${styles.accardion_control_btn} ${isAccardionOpen ? styles.open : ''}`}>
            <IconSvg width={12} height={7} viewBoxSize="0 0 22 13" path={accardionArrPath} />
          </div>
        </div>
        {isAccardionOpen && (
          <div className={styles.accardion_content}>
            {student?.sections?.map(({ lessons, section_id, name }) => (
              <div className={styles.accardion_item} key={section_id}>
                <p className={styles.accardion_item_name}>{name}</p>
                <div className={styles.accardion_lessons_block}>
                  {lessons?.map(({ order, type, name }, index: number) => (
                    <div key={order + index} className={styles.accardion_lesson}>
                      <div>{lessonSvgMapper[type]}</div>
                      <p className={styles.accardion_lesson_name}>{name}</p>
                      <div></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
