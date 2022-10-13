import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button/Button'
import { Radio } from '../../../common/Radio/Radio'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { checkboxData } from './config/checkboxData'
import { modalTestBlockTextPath } from '../config/svgIconsPath'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { TestModalPropsT } from '../../ModalTypes'
import { useCreateLesson } from 'customHooks/useCreateLesson'
import { useFormik } from 'formik'

import styles from '../../Modal.module.scss'

export const TestModal: FC<TestModalPropsT> = ({ modulesList, setType, setLessonIdAndType }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [optionAccrualBalls, setOptionAccrualBalls] = useState<string>('')

  const formik = useFormik({
    initialValues: {
      percent: 0,
      attempts: 0,
      ballsPerAnswer: 0,
      numOfAttempts: false,
      rndQuest: false,
      shuffleAnswer: false,
      showCorrect: false,
    },

    onSubmit: () => {
      console.log('#')
    },
  })

  const { percent, attempts, numOfAttempts, ballsPerAnswer, handleChange }: any = formik

  const { nameLesson, balls, setNameLesson, setBalls, handleCreateLesson } = useCreateLesson({
    setType,
    modulesList,
    typeLesson: 'tests',
    success_percent: +formik.values.percent,
    random_questions: formik.values.rndQuest,
    random_answers: formik.values.shuffleAnswer,
    show_right_answers: formik.values.showCorrect,
    attempt_limit: formik.values.numOfAttempts,
    attempt_count: formik.values.attempts,
    balls_per_answer: formik.values.ballsPerAnswer,
    setLessonIdAndType,
  })

  const handleCreateTestName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  const closedAll = () => {
    setType(null as keyof object)
  }
  const goToBack = () => {
    setType('lessonsModal' as keyof object)
  }

  useEffect(() => {
    setBalls(0)
  }, [optionAccrualBalls])

  return (
    <form onSubmit={handleCreateLesson} className={styles.classesContainer}>
      <div onClick={closedAll} className={styles.classesContainer_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.test}>
        <IconSvg width={47} height={63} viewBoxSize="0 0 47 63" path={modalTestBlockTextPath} />
        <span className={styles.classesContainer_title}>Настройте тест</span>
      </div>
      <div className={styles.navBtn}>
        <span
          onClick={() => setSettingsActive(0)}
          className={settingsActive === 0 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
        >
          Основные
        </span>
        <span
          onClick={() => setSettingsActive(1)}
          className={settingsActive === 1 ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}
        >
          Баллы за прохождение
        </span>
      </div>
      {settingsActive === 0 ? (
        <>
          <div style={{ marginTop: '15px' }} className={styles.usually_input}>
            <span className={styles.usually_title}>Название теста:</span>
            <Input placeholder={'Основы языка HTML'} name="classesName" onChange={handleCreateTestName} type={'text'} value={nameLesson} />
          </div>
          <div style={{ marginTop: '15px' }} className={styles.usually_input}>
            <span className={styles.usually_title}>Процент правильных ответов для выполнения:</span>
            <Input placeholder={'Процент ответов'} name="percent" onChange={handleChange} type={'number'} value={percent} />
          </div>
          <div className={styles.test_checkboxPack}>
            <div className={styles.test_checkbox}>
              <Checkbox id={'attempts'} name="numOfAttempts" checked={numOfAttempts} onChange={handleChange} />
              <div>
                <span className={formik.values.numOfAttempts ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
              </div>
              {formik.values.numOfAttempts && (
                <input className={styles.test_checkbox_attempts} type="number" name="attempts" onChange={handleChange} value={attempts} />
              )}
            </div>
            {checkboxData.map(({ id, name, span1, span2 }) => (
              <div key={id} className={styles.test_checkbox}>
                <Checkbox id={id} name={name} checked={formik.values[name as keyof object]} onChange={handleChange} />
                <div className={styles.test_checkbox_text}>
                  <span className={formik.values[name as keyof object] ? styles.test_checkbox_text_checked : ''}>{span1}</span>
                  <span className={styles.test_checkbox_text_desc}>{span2}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.test_grade}>
          <span className={styles.test_grade_title}>Как выдавать баллы ученикам:</span>
          <div className={styles.test_grade_radio}>
            <Radio name={'balls'} title={'За успешно пройденный тест'} id={'success'} func={() => setOptionAccrualBalls('allTest')} />
            <div className={styles.test_grade_radio_input}>
              <input
                disabled={optionAccrualBalls !== 'allTest'}
                type={'number'}
                value={balls}
                onChange={event => setBalls(+event.target.value)}
                placeholder={'0'}
                min="0"
                max="100"
                className={styles.usually_grade_points}
              />
              <span>баллов</span>
            </div>
          </div>
          <div>
            <Radio name={'balls'} title={'За каждый правильный ответ'} id={'notSuccess'} func={() => setOptionAccrualBalls('perAnswer')} />
            <div className={styles.test_grade_radio_input}>
              <input
                disabled={optionAccrualBalls !== 'perAnswer'}
                type={'number'}
                value={optionAccrualBalls === 'perAnswer' ? ballsPerAnswer : 0}
                name="ballsPerAnswer"
                onChange={handleChange}
                placeholder={'0'}
                min="0"
                max="100"
                className={styles.usually_grade_points}
              />
              <span>баллов</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.btnBlock}>
        <Button
          onClick={goToBack}
          text={'Назад'}
          style={{ width: '85px', height: '100%', marginRight: '10px', padding: '17px', fontSize: '18px', fontWeight: '400', borderRadius: '10px' }}
        />
        <Button type={'submit'} text={'Добавить занятие'} variant={'primary'} />
      </div>
    </form>
  )
}
