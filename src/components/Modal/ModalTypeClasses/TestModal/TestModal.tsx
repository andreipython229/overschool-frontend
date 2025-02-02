import { ChangeEvent, FC } from 'react'
import { useFormik } from 'formik'

import { Input } from '../../../common/Input/Input/Input'
import { Button } from '../../../common/Button/Button'
import { Radio } from '../../../common/Radio/Radio'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { checkboxData } from './config/checkboxData'
import { TestModalIcon } from '../constants/testModalIcon'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { TestModalPropsT } from '../../ModalTypes'
import { useCreateLesson } from 'customHooks/useCreateLesson'
import { SimpleLoader } from '../../../Loaders/SimpleLoader'

import styles from '../../Modal.module.scss'
import { penIconPath } from 'Pages/Settings/Main/iconComponents'

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
    attempt_limit: false,
    attempt_count: 0,
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
    <form onSubmit={handleCreateLesson} className={styles.classesContainer} style={{ maxWidth: '600px', width: '100%' }}>
      <div onClick={closedAll} className={styles.classesContainer_closed}>
        <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
      </div>
      <div className={styles.test}>
        <TestModalIcon width={140} height={140}/>
        <span className={styles.classesContainer_title}>Настройте тест</span>
      </div>

      <div className={styles.test_input}>
        <Input placeholder={'Введите название теста'} name="classesName" onChange={handleCreateTestName} type={'text'} value={nameLesson}>
          <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
        </Input>
      </div>

      <span className={styles.test_title}>Процент правильных ответов для выполнения</span>

      <div style={{ marginBottom: '24px' }} className={styles.test_input}>
        <Input placeholder={'0'} name="percent" min={0} onChange={handleChange} type={'number'} value={`${percent}`}>
          <IconSvg width={24} height={24} viewBoxSize='0 0 24 24' path={penIconPath}/>
        </Input>
      </div>

      <div className={styles.test_checkboxPack}>
        {/* <div className={styles.test_checkbox}>
          <Checkbox id={'attempts'} name="numOfAttempts" checked={numOfAttempts} onChange={handleChange} />
          <div>
            <span className={formik.values.numOfAttempts ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
          </div>
          {formik.values.numOfAttempts && (
            <input className={styles.test_checkbox_attempts} type="number" min={1} name="attempts" onChange={handleChange} value={attempts} />
          )}
        </div> */}
        {checkboxData.map(({ id, name, span1, span2 }) => (
          <div key={id}>
            <div className={styles.test_title}>
              <span>{span1}</span>
            </div>
            <div className={styles.test_checkbox}>
              <div>
                <label className={styles.toggle_switch} htmlFor={id}>
                  <input type="checkbox" onChange={handleChange} name={name} id={id} checked={formik.values[name as keyof object]}/>
                  <span className={styles.switch} />
                </label>
              </div>
              <p className={styles.test_checkbox_text_desc}>{span2}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.classesContainer_type_btnBlock} style={{marginTop: 0}}>
        <Button
            style={{padding: '14px'}}
            variant={'cancel'}
            onClick={goToBack}
            text={'Назад'}
          />
        <Button
          type={'submit'}
          text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Добавить задание'}
          variant={isLoading ? 'inActive' : 'newPrimary'}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
