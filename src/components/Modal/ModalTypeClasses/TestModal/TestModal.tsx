import { ChangeEvent, FC, useState } from 'react'

import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button/Button'
import { Radio } from '../../../common/Radio/Radio'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { checkboxData } from './config/checkboxData'
import { modalTestBlockTextPath } from '../config/svgIconsPath'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'

import styles from '../../Modal.module.scss'
import { TestModalPropsT } from '../../ModalTypes'
import { useCreateLesson } from '../../../../customHooks/useCreateLesson'

export const TestModal: FC<TestModalPropsT> = ({ modulesList, goToBack, addCourse, closedAll }) => {
  const [settingsActive, setSettingsActive] = useState<number>(0)

  const [inputItem, setInputItemValue] = useState<{ [key: string]: string }>({
    classesName: '',
    percent: '60',
    attempts: '1',
  })

  const [checkboxItem, setCheckboxItem] = useState<{ [key: string]: boolean }>({
    numOfAttempts: false,
    rndQuest: false,
    shuffleAnsw: false,
    showCorrect: false,
  })

  const handleChangeCheckboxItem = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    setCheckboxItem({ ...checkboxItem, [target.name]: event.target.checked })
  }

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    setInputItemValue({ ...inputItem, [target.name]: event.target.value })
  }

  const { numOfAttempts } = checkboxItem
  const { classesName, percent, attempts } = inputItem

  const { nameLesson, balls, setNameLesson, setBalls, handleCreateLesson } = useCreateLesson({
    modulesList,
    addCourse,
    typeLesson: 'tests',
    modalType: 'test',
    success_percent: 60,
  })

  const handleCreateTestName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLesson(event.target.value)
  }

  useShowModal({ closedAll })

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
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
        <div style={{ marginTop: '15px' }} className={styles.usually_input}>
          <span className={styles.usually_title}>Название теста:</span>
          <Input placeholder={'Основы языка HTML'} name="classesName" onChange={handleCreateTestName} type={'text'} value={nameLesson} />
        </div>

        {settingsActive === 0 ? (
          <>
            <div style={{ marginTop: '15px' }} className={styles.usually_input}>
              <span className={styles.usually_title}>Процент правильных ответов для выполнения:</span>
              <Input placeholder={'Процент ответов'} name="percent" onChange={handleChangeInputValue} type={'text'} value={percent} />
            </div>
            <div className={styles.test_checkboxPack}>
              <div className={styles.test_checkbox}>
                <Checkbox id={'attempts'} name="numOfAttempts" checked={numOfAttempts} onChange={handleChangeCheckboxItem} />
                <div>
                  <span className={numOfAttempts ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
                </div>
                {numOfAttempts && (
                  <input className={styles.test_checkbox_attempts} type="text" name="attempts" onChange={handleChangeInputValue} value={attempts} />
                )}
              </div>
              {checkboxData.map(({ id, name, span1, span2 }) => (
                <div key={id} className={styles.test_checkbox}>
                  <Checkbox id={id} name={name} checked={checkboxItem[name]} onChange={handleChangeCheckboxItem} />
                  <div className={styles.test_checkbox_text}>
                    <span className={checkboxItem[name] ? styles.test_checkbox_text_checked : ''}>{span1}</span>
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
              <Radio title={'За успешно пройденный тест'} id={'success'} />
              <div className={styles.test_grade_radio_input}>
                <input
                  type={'number'}
                  value={balls}
                  onChange={event => setBalls(+event.target.value)}
                  placeholder={'0'}
                  min="0"
                  className={styles.usually_grade_points}
                />
                <span>баллов</span>
              </div>
            </div>
            <div>
              <Radio title={'За каждый правильный ответ'} id={'notSuccess'} />
              <div className={styles.test_grade_radio_input}>
                <input type={'number'} placeholder={'0'} min="0" className={styles.usually_grade_points} />
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
          <Button onClick={handleCreateLesson} text={'Добавить занятие'} variant={'primary'} />
        </div>
      </div>
    </div>
  )
}
