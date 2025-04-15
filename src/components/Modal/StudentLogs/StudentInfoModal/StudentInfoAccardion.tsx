import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { result } from 'types/courseStatT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { peopleIconPath, averageMarkIconPath, progressIconPath } from 'config/commonSvgIconsPath'
import { accardionArrPath } from 'Pages/StudentCourse/config/svgIconPath'
import styles from './studentInfoAccardion.module.scss'
import { sectionLessons } from '../../../../types/lessonAccessT'
import {
  useSetStudentLessonsAccessMutation,
  useLazyFetchStudentTrainingDurationQuery,
  useSetStudentTrainingDurationMutation,
} from '../../../../api/lessonAccessService'
import { LessonsAccardion } from '../LessonsAccardion/LessonsAccardion'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { RoleE } from '../../../../enum/roleE'
import { Button } from '../../../common/Button/Button'
import { schoolSelector, selectUser } from '../../../../selectors'
import { useAppSelector } from '../../../../store/hooks'
import { getNounDeclension } from 'utils/getNounDeclension'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type studentInfoAccardionT = {
  student: result | null
  progress: any
  studentLessons?: sectionLessons[]
  setStudentLessons: any
  resetAccessSetting: () => void
}

export const StudentInfoAccardion: FC<studentInfoAccardionT> = ({ student, progress, studentLessons, setStudentLessons, resetAccessSetting }) => {
  const [isAccardionOpen, studentInfoAccardion] = useState<boolean>(false)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const courseStat = progress && progress.courses.find((course: any) => course.course_id === student?.course_id)
  const [setAccess, { isSuccess }] = useSetStudentLessonsAccessMutation()
  const { schoolName } = useAppSelector(schoolSelector)
  const [duration, setDuration] = useState<number>()
  const [download, setDownload] = useState<boolean>()
  const [fetchDuration, { data }] = useLazyFetchStudentTrainingDurationQuery()
  const [assignDuration] = useSetStudentTrainingDurationMutation()
  const { role } = useAppSelector(selectUser)

  useEffect(() => {
    student && fetchDuration({ group_id: Number(student?.group_id), student_id: Number(student?.student_id), schoolName })
  }, [student])

  useEffect(() => {
    setDuration(data?.individual_limit)
    setDownload(data?.download)
    data?.individual_limit && setIsLimited(true)
  }, [data])

  const handlerIsLimited = () => {
    setIsLimited(!isLimited)
  }

  const handleDuration = (event: ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value))
  }

  const handleDownload = () => {
    setDownload(!download)
  }

  const saveDuration = async () => {
    const durationData = {
      user: student?.student_id,
      students_group: student?.group_id,
      limit: isLimited ? duration : 0,
      download: download,
    }
    await assignDuration({ data: durationData, schoolName }).then(() =>
      fetchDuration({ group_id: Number(student?.group_id), student_id: Number(student?.student_id), schoolName }),
    )
  }

  const handleAccessSetting = async () => {
    const lesson_data: { lesson_id: number; available: boolean }[] = []
    studentLessons &&
      studentLessons.map(section => {
        section.lessons.map(lesson => {
          lesson_data.push({
            lesson_id: lesson.lesson_id,
            available: lesson.availability,
          })
        })
      })
    const accessData = {
      student_ids: [student?.student_id],
      lesson_data: lesson_data,
    }
    await setAccess({ data: accessData, schoolName })
      .unwrap()
      .then(async () => {
        console.log('uspeh')
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  if (!data) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.accardion}>
      <div>
        <div className={styles.accardion_header} onClick={() => studentInfoAccardion(prev => !prev)}>
          {student?.courses_avatar ? (
            <img className={styles.accardion_course_img} src={student?.courses_avatar} alt="course_avatar" />
          ) : (
            <div className={styles.accardion_course_avatar}></div>
          )}
          <div className={styles.accardion_info}>
            <p className={styles.accardion_course_name}>{student?.course_name}</p>
            <div className={styles.accardion_group}>
              <IconSvg width={14} height={14} viewBoxSize={'0 0 23 23'} path={peopleIconPath} />
              <span>{student?.group_name}</span>
            </div>
          </div>
          <div className={styles.accardion_progress}>
            <div className={styles.accardion_progress_item}>
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={progressIconPath} />
              <span>{courseStat ? `${courseStat.completed_count}/${courseStat.all_baselessons}` : '0/0'}</span>
            </div>
            <div className={styles.accardion_progress_item}>
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={progressIconPath} />
              <span>{courseStat ? courseStat.completed_percent : 0}%</span>
            </div>
            <div className={styles.accardion_progress_item}>
              <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={averageMarkIconPath} />
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
          <>
            <div className={styles.accardion_duration}>
              {role === RoleE.Teacher && (
                <>
                  <div className={styles.accardion_duration_label}>
                    <label>Индивидуальная продолжительность обучения в днях:</label>
                    <span>{isLimited ? duration : 'не установлена'}</span>
                  </div>
                  <div className={styles.accardion_duration_label}>
                    <label>Скачивание видео-уроков:</label>
                    <span>{download ? 'разрешено' : 'не разрешено'}</span>
                  </div>
                </>
              )}
              {role === RoleE.Admin && (
                <>
                  <div className={styles.accardion_duration_limit}>
                    <div className={styles.accardion_duration_limit_check} style={{ width: '100%', justifyContent: 'space-between' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Checkbox id={'isLimited'} name={'isLimited'} checked={isLimited} onChange={handlerIsLimited} />
                        <label
                          htmlFor="isLimited"
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            textWrap: 'nowrap',
                            justifySelf: 'flex-start',
                            marginRight: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <p>индивидуальная продолжительность обучения в днях</p>
                          {isLimited && (
                            <span style={{ display: 'inline-flex' }}>
                              осталось:
                              <p style={{ fontWeight: 600, marginLeft: '5px' }}>
                                {data && typeof data.remaining_period === 'number'
                                  ? `${data.remaining_period} ${getNounDeclension(data.remaining_period, ['день', 'дня', 'дней'])}`
                                  : '0 дней'}
                              </p>
                              , добавить дни?
                            </span>
                          )}
                        </label>
                      </div>
                      {isLimited && <input value={duration} onChange={handleDuration} style={{ width: '100px' }} type="number" min={0} />}
                    </div>
                    <div className={styles.accardion_duration_limit_check}>
                      <Checkbox id={'download'} name={'download'} checked={download} onChange={handleDownload} />
                      <label htmlFor="download">разрешить скачивать видео-уроки</label>
                    </div>
                  </div>
                  <Button className={styles.accardion_duration_limit_btn} text={'Сохранить'} variant="newPrimary" onClick={saveDuration} />{' '}
                </>
              )}
            </div>
            <LessonsAccardion
              sectionLessons={studentLessons}
              setLessons={setStudentLessons}
              handleAccessSetting={handleAccessSetting}
              forStudent={true}
              resetAccessSetting={resetAccessSetting}
            ></LessonsAccardion>
          </>
        )}
      </div>
    </div>
  )
}
