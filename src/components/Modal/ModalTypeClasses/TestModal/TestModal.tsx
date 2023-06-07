import { ChangeEvent, FC, useState } from 'react'
import { useFormik } from 'formik'

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
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'

import styles from '../../Modal.module.scss'

export const TestModal: FC<TestModalPropsT> = ({ modulesList, setType, setLessonIdAndType }) => {
  const formik = useFormik({
    initialValues: {
      percent: 0,
      attempts: 1,
      numOfAttempts: false,
      rndQuest: false,
      shuffleAnswer: false,
      showCorrect: false,
    },

    onSubmit: () => {
      console.log('#')
    },
  })

  const {
    values: { percent, attempts, numOfAttempts },
    handleChange,
  } = formik

  const { nameLesson, isLoading, setNameLesson, handleCreateLesson } = useCreateLesson({
    setType,
    modulesList,
    typeLesson: 'tests',
    success_percent: +formik.values.percent,
    random_questions: formik.values.rndQuest,
    random_answers: formik.values.shuffleAnswer,
    show_right_answers: formik.values.showCorrect,
    attempt_limit: formik.values.numOfAttempts,
    attempt_count: formik.values.attempts,
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

  return (
    <form onSubmit={handleCreateLesson} className={styles.classesContainer}>
      <div onClick={closedAll} className={styles.classesContainer_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.test}>
        <IconSvg width={47} height={63} viewBoxSize="0 0 47 63" path={modalTestBlockTextPath} />
        <span className={styles.classesContainer_title}>Настройте тест</span>
      </div>

      <div style={{ marginTop: '15px' }} className={styles.usually_input}>
        <span className={styles.usually_title}>Название теста:</span>
        <Input placeholder={'Основы языка HTML'} name="classesName" onChange={handleCreateTestName} type={'text'} value={nameLesson} />
      </div>
      <div style={{ margin: '15px 0 25px' }} className={styles.usually_input}>
        <span className={styles.usually_title}>Процент правильных ответов для выполнения:</span>
        <Input placeholder={'Процент ответов'} name="percent" min={0} onChange={handleChange} type={'number'} value={`${percent}`} />
      </div>
      <div className={styles.test_checkboxPack}>
        <div className={styles.test_checkbox}>
          <Checkbox id={'attempts'} name="numOfAttempts" checked={numOfAttempts} onChange={handleChange} />
          <div>
            <span className={formik.values.numOfAttempts ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
          </div>
          {formik.values.numOfAttempts && (
            <input className={styles.test_checkbox_attempts} type="number" min={1} name="attempts" onChange={handleChange} value={attempts} />
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

      <div className={styles.btnBlock}>
        <Button onClick={goToBack} text={'Назад'} />
        <Button
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить занятие'}
          variant={isLoading ? 'disabled' : 'primary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
