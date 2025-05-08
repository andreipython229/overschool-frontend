import React, { FC, useEffect, useState } from 'react'

import { lessonSvgMapper } from 'config'
import styles from './lessonsAccardion.module.scss'
import { useBoolean } from '../../../../customHooks'
import { CheckboxBall } from '../../../common/CheckboxBall'
import { Button } from '../../../common/Button/Button'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { sectionLessons } from '../../../../types/lessonAccessT'
import { RoleE } from 'enum/roleE'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { tableBallsStarPath } from '../../../../config/commonSvgIconsPath'
import { IconSvg } from '../../../common/IconSvg/IconSvg'

type lessonsAccardionT = {
  sectionLessons?: sectionLessons[]
  setLessons: any
  handleAccessSetting: () => void
  forStudent: boolean
  resetAccessSetting: undefined | (() => void)
}

export const LessonsAccardion: FC<lessonsAccardionT> = ({ sectionLessons, setLessons, handleAccessSetting, forStudent, resetAccessSetting }) => {
  const [lessonsAccessSetting, { onToggle: toggleAccess }] = useBoolean(false)
  const [totalAvailability, { onToggle: setTotalAvailability, off: turnOn, on: turnOff }] = useBoolean(false)
  const { role } = useAppSelector(selectUser)
  console.log(sectionLessons)

  // Добавим состояние для чекбоксов модулей
  const [sectionChecks, setSectionChecks] = useState<{ [key: number]: boolean }>({});

  // Синхронизируем состояние чекбоксов модулей с данными
  useEffect(() => {
    if (sectionLessons) {
      const checks: { [key: number]: boolean } = {};
      sectionLessons.forEach(section => {
        checks[section.section_id] = section.lessons.every(lesson => lesson.availability);
      });
      setSectionChecks(checks);
    }
  }, [sectionLessons]);

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
      const newValue = !sectionChecks[sectionId];
      setLessons(
        sectionLessons.map(section => ({
          ...section,
          lessons: section.section_id === sectionId
            ? section.lessons.map(lesson => ({ ...lesson, availability: newValue }))
            : section.lessons,
        }))
      );
      setSectionChecks({ ...sectionChecks, [sectionId]: newValue });
    }
  };

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
        <div className={styles.accardion_content_checkbox}>
          <Checkbox id={`totalAvailability`} name={'check'} checked={totalAvailability} onChange={handleAllCheck} />
          <span>все уроки доступны</span>
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
                  (
                    {
                      lesson_id,
                      // order,
                      type,
                      name,
                      active,
                      availability,
                      status,
                      mark,
                    },
                    index: number,
                  ) =>
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
