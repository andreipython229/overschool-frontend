import React, { FC, useEffect, useState, ChangeEvent } from 'react'

import { lessonSvgMapper } from '@/config'
import styles from './lessonsAccardion.module.scss'
import { useBoolean } from '@/customHooks'
import { CheckboxBall } from '@/components/common/CheckboxBall'
import { Button } from '@/components/common/Button/Button'
import { Checkbox } from '@/components/common/Checkbox/Checkbox'
import { sectionLessons } from '@/types/lessonAccessT'
import { RoleE } from '@/enum/roleE'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/selectors'
import { tableBallsStarPath } from '@/config/commonSvgIconsPath'
import { IconSvg } from '@/components/common/IconSvg/IconSvg'

type lessonsAccardionT = {
  sectionLessons?: sectionLessons[]
  setLessons: any
  handleAccessSetting: () => void
  forStudent: boolean
  resetAccessSetting: undefined | (() => void)
}

export const LessonsAccardion: FC<lessonsAccardionT> = ({ sectionLessons, setLessons, handleAccessSetting, forStudent, resetAccessSetting }) => {
  const [lessonsAccessSetting, { onToggle: toggleAccess }] = useBoolean(false)
  const [totalAvailability, { off: turnOn, on: turnOff }] = useBoolean(false)
  const { role } = useAppSelector(selectUser)
  console.log(sectionLessons)

  // Добавим состояние для чекбоксов модулей
  const [sectionChecks, setSectionChecks] = useState<{ [key: number]: boolean }>({})
  const [visibleTimer, setVisibleTimer] = useState<boolean>(true)
  const [defaultAccessDays, setDefaultAccessDays] = useState<number>(1) // дни по умолчанию
  const [defaultAccessHours, setDefaultAccessHours] = useState<number>(0) // часы по умолчанию

  // Функция для конвертации дней и часов в общее количество часов
  const getTotalHours = (days: number, hours: number) => {
    return days * 24 + hours
  }

  // Синхронизируем состояние чекбоксов модулей с данными
  useEffect(() => {
    if (sectionLessons) {
      const checks: { [key: number]: boolean } = {}
      sectionLessons.forEach(section => {
        checks[section.section_id] = section.lessons.every(lesson => lesson.availability)
      })
      setSectionChecks(checks)
    }
  }, [sectionLessons])

  useEffect(() => {
    if (sectionLessons) {
      const hasUnavailableLesson = sectionLessons.some(section => section.lessons.some(lesson => lesson.availability === false))

      if (!totalAvailability && !hasUnavailableLesson) {
        turnOn()
      } else turnOff()
    }
  }, [sectionLessons])

  const handleLessonCheck = (e: any) => {
    if (role === RoleE.Admin) {
      sectionLessons &&
        setLessons(
          sectionLessons.map(section => ({
            ...section,
            lessons: section.lessons.map(lesson => ({
              ...lesson,
              availability: lesson.lesson_id === Number(e.target.id) ? !lesson.availability : lesson.availability,
            })),
          })),
        )
    }
  }

  const handleAllCheck = (e: any) => {
    sectionLessons &&
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons: section.lessons.map(lesson => ({
            ...lesson,
            availability: !totalAvailability,
          })),
        })),
      )
  }

  // Обработчик для чекбокса модуля
  const handleSectionCheck = (sectionId: number) => {
    if (role === RoleE.Admin && sectionLessons) {
      const newValue = !sectionChecks[sectionId]
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons:
            section.section_id === sectionId
              ? section.lessons.map(lesson => ({
                  ...lesson,
                  availability: newValue,
                  visible_timer: visibleTimer,
                  access_time: visibleTimer ? getTotalHours(defaultAccessDays, defaultAccessHours) : undefined,
                }))
              : section.lessons,
        })),
      )
      setSectionChecks({ ...sectionChecks, [sectionId]: newValue })
    }
  }

  // Обработчик изменения видимости таймера
  const handleVisibleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setVisibleTimer(checked)
    if (sectionLessons) {
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons: section.lessons.map(lesson => ({
            ...lesson,
            visible_timer: checked,
            access_time: checked ? getTotalHours(defaultAccessDays, defaultAccessHours) : undefined,
          })),
        })),
      )
    }
  }

  // Обработчик изменения дней доступа
  const handleAccessDaysChange = (days: number) => {
    setDefaultAccessDays(days)
    if (sectionLessons && visibleTimer) {
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons: section.lessons.map(lesson => ({
            ...lesson,
            access_time: getTotalHours(days, defaultAccessHours),
          })),
        })),
      )
    }
  }

  // Обработчик изменения часов доступа
  const handleAccessHoursChange = (hours: number) => {
    setDefaultAccessHours(hours)
    if (sectionLessons && visibleTimer) {
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons: section.lessons.map(lesson => ({
            ...lesson,
            access_time: getTotalHours(defaultAccessDays, hours),
          })),
        })),
      )
    }
  }

  return (
    <div className={styles.accardion_content}>
      <div className={styles.accardion_content_check}>
        <CheckboxBall isChecked={lessonsAccessSetting} toggleChecked={toggleAccess} />
        <span className={styles.accardion_content_check_span}>
          {role === RoleE.Admin ? 'Настройка доступа к урокам' : 'Просмотр доступа к урокам'}
        </span>
      </div>
      {lessonsAccessSetting && role === RoleE.Admin ? (
        <div className={styles.accardion_content_buttons}>
          {forStudent ? (
            <Button className={styles.accardion_content_buttons_btn} text={'Сбросить настройки'} onClick={resetAccessSetting} />
          ) : (
            <span></span>
          )}
          <Button className={styles.accardion_content_buttons_btn_right} text={'Сохранить настройки'} onClick={handleAccessSetting} />
        </div>
      ) : (
        <span className={styles.accardion_content_fake}></span>
      )}

      {lessonsAccessSetting && sectionLessons?.length && (
        <div className={styles.timer_settings}>
          <Checkbox id={`totalAvailability`} name={'check'} checked={totalAvailability} onChange={handleAllCheck} />
          <span className={styles.timer_label}>все уроки доступны</span>
        </div>
      )}
      {lessonsAccessSetting && role === RoleE.Admin && (
        <div className={styles.access_settings}>
          <div className={styles.timer_settings}>
            <Checkbox id="visible_timer" name="visible_timer" checked={visibleTimer} onChange={handleVisibleTimerChange} />
            <div
              className={styles.info_icon_wrapper}
              data-tooltip="В случае отключения видимости срока доступа - доступ у ученика будет ограничен через выбранное время, но таймера дней у ученика не будет"
            >
              <IconSvg
                path={[{ d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', fill: '#4d5766' }]}
                className={styles.info_icon}
                width={16}
                height={16}
                viewBoxSize="0 0 24 24"
              />
            </div>
            <span className={styles.timer_label}>Видимый срок доступа</span>
            {visibleTimer && (
              <div className={styles.time_input}>
                <div className={styles.time_input_group}>
                  <input type="number" min="0" max="30" value={defaultAccessDays} onChange={e => handleAccessDaysChange(Number(e.target.value))} />
                  <span>дней</span>
                </div>
                <div className={styles.time_input_group}>
                  <input type="number" min="0" max="23" value={defaultAccessHours} onChange={e => handleAccessHoursChange(Number(e.target.value))} />
                  <span>часов</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {sectionLessons?.map(
        ({ lessons, section_id, name }) =>
          lessons.length > 0 && (
            <div className={styles.accardion_item} key={section_id}>
              <p className={styles.accardion_item_name}>{name}</p>
              {lessonsAccessSetting && role === RoleE.Admin && (
                <div className={styles.accardion_module_checkbox}>
                  <Checkbox
                    id={`section_${section_id}`}
                    name={`section_${section_id}`}
                    checked={!!sectionChecks[section_id]}
                    onChange={() => handleSectionCheck(section_id)}
                  />
                  <span className={styles.accardion_module_checkbox_label}>Выделить модуль</span>
                </div>
              )}
              <div className={styles.accardion_lessons_block}>
                {lessons?.map(
                  ({ lesson_id, type, name, active, availability, status, mark }, index: number) =>
                    active && (
                      <div key={index} className={styles.accardion_lesson}>
                        <div>{lessonSvgMapper[type]}</div>
                        <div className={styles.accardion_lesson_name}>
                          <p className={styles.accardion_lesson_name_name}>{name}</p>
                          {forStudent && (
                            <>
                              <span className={styles.accardion_lesson_name_status}>{status}</span>
                              {mark && (
                                <span className={styles.accardion_lesson_name_mark}>
                                  <IconSvg
                                    width={12}
                                    height={12}
                                    viewBoxSize={'0 0 15 15'}
                                    styles={{ marginRight: '7px' }}
                                    path={tableBallsStarPath}
                                  />
                                  {mark}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        {lessonsAccessSetting && <Checkbox id={`${lesson_id}`} name={'check'} checked={availability} onChange={handleLessonCheck} />}
                        <div></div>
                      </div>
                    ),
                )}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
