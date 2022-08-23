import React, { ChangeEvent, FC, useState } from 'react'
import { Input } from '../../../common/Input/Input/Input'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button/Button'
import { Radio } from '../../../common/Radio/Radio'
import { cross } from '../../../../constants/iconSvgConstants'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { useShowModal } from '../../../../customHooks/useShowModal'
import { ModalTestSvgBlock } from '../ModalTypeClassesSvgTest'

import styles from '../../Modal.module.scss'

type TestModalPropsT = {
  goToBack: () => void
  addCourse: (name: string, type: string) => void
  closedAll: () => void
}

export const TestModal: FC<TestModalPropsT> = ({ goToBack, addCourse, closedAll }) => {
  const [nameClasses, setNameClasses] = useState<string>('')
  const [percent, setPercent] = useState<string>('60')
  const [settingsActive, setSettingsActive] = useState<number>(0)
  const [attempts, setAttempts] = useState<string>('1')
  const [randomQuestions, setRandomQuestions] = useState<boolean>(false)
  const [shuffleAnswers, setShuffleAnswers] = useState<boolean>(false)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const [numberOfAttempts, setNumberOfAttempts] = useState<boolean>(false)

  const changeAttempts = (event: ChangeEvent<HTMLInputElement>) => {
    setAttempts(event.currentTarget.value)
  }

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameClasses(event.currentTarget.value)
  }
  const changePercent = (event: ChangeEvent<HTMLInputElement>) => {
    setPercent(event.currentTarget.value)
  }

  useShowModal({ closedAll })

  return (
    <div className={styles.wrapper}>
      <div className={styles.classesContainer}>
        <div onClick={closedAll} className={styles.classesContainer_closed}>
          <IconSvg
            width={14}
            height={14}
            d={cross}
            stroke={'#E0DCED'}
            strokeWidth={'2'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            viewBoxSize="0 0 14 14"
          />
        </div>
        <div className={styles.test}>
          <ModalTestSvgBlock />
          <span className={styles.classesContainer_title}>Настройте тест</span>
        </div>
        <div className={styles.navBtn}>
          <span
            onClick={() => setSettingsActive(0)}
            className={
              settingsActive === 0
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Основные
          </span>
          <span
            onClick={() => setSettingsActive(1)}
            className={
              settingsActive === 1
                ? styles.navBtn_btn + ' ' + styles.navBtn_active
                : styles.navBtn_btn
            }
          >
            Баллы за прохождение
          </span>
        </div>
        <div style={{ marginTop: '15px' }} className={styles.usually_input}>
          <span className={styles.usually_title}>Название теста:</span>
          <Input
            placeholder={'Основы языка HTML'}
            name={'name classes'}
            onChange={changeName}
            type={'text'}
            value={nameClasses}
          />
        </div>

        {settingsActive === 0 ? (
          <>
            <div style={{ marginTop: '15px' }} className={styles.usually_input}>
              <span className={styles.usually_title}>
                Процент правильных ответов для выполнения:
              </span>
              <Input
                placeholder={'Процент ответов'}
                name={'name classes'}
                onChange={changePercent}
                type={'text'}
                value={percent}
              />
            </div>
            <div className={styles.test_checkboxPack}>
              <div className={styles.test_checkbox}>
                <Checkbox
                  id={'attempts'}
                  name={'Number of attempts'}
                  checked={numberOfAttempts}
                  onChange={() => setNumberOfAttempts(!numberOfAttempts)}
                />
                <div>
                  <span className={numberOfAttempts ? styles.test_checkbox_text_checked : ''}>
                    Ограничить количество попыток
                  </span>
                </div>
                {numberOfAttempts && (
                  <input
                    className={styles.test_checkbox_attempts}
                    type="text"
                    onChange={changeAttempts}
                    value={attempts}
                  />
                )}
              </div>
              <div className={styles.test_checkbox}>
                <Checkbox
                  id={'randomQuestions'}
                  name={'Random Questions'}
                  checked={randomQuestions}
                  onChange={() => setRandomQuestions(!randomQuestions)}
                />
                <div className={styles.test_checkbox_text}>
                  <span className={randomQuestions ? styles.test_checkbox_text_checked : ''}>
                    Ограничить количество попыток
                  </span>
                  <span className={styles.test_checkbox_text_desc}>
                    Вопросы будут задаваться в случайном порядке{' '}
                  </span>
                </div>
              </div>
              <div className={styles.test_checkbox}>
                <Checkbox
                  id={'shuffleAnswers'}
                  name={'Shuffle Answer'}
                  checked={shuffleAnswers}
                  onChange={() => setShuffleAnswers(!shuffleAnswers)}
                />
                <div className={styles.test_checkbox_text}>
                  <span className={shuffleAnswers ? styles.test_checkbox_text_checked : ''}>
                    Перемешивать варианты ответов
                  </span>
                  <span className={styles.test_checkbox_text_desc}>
                    Варианты ответов будут отображаться в случайном порядке
                  </span>
                </div>
              </div>
              <div className={styles.test_checkbox}>
                <Checkbox
                  id={'showCorrectAnswer'}
                  name={'Show correct Answer'}
                  checked={showCorrectAnswer}
                  onChange={() => setShowCorrectAnswer(!showCorrectAnswer)}
                />
                <div className={styles.test_checkbox_text}>
                  <span className={showCorrectAnswer ? styles.test_checkbox_text_checked : ''}>
                    Показывать правильные варианты ответов
                  </span>
                  <span className={styles.test_checkbox_text_desc}>
                    После завершения тестирования будут отображены правильные ответы на вопросы
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.test_grade}>
            <span className={styles.test_grade_title}>Как выдавать баллы ученикам:</span>
            <div className={styles.test_grade_radio}>
              <Radio title={'За успешно пройденный тест'} id={'success'} />
              <div className={styles.test_grade_radio_input}>
                <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
                <span>баллов</span>
              </div>
            </div>
            <div>
              <Radio title={'За каждый правильный ответ'} id={'notSuccess'} />
              <div className={styles.test_grade_radio_input}>
                <input type={'number'} placeholder={'0'} className={styles.usually_grade_points} />
                <span>баллов</span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.btnBlock}>
          <Button onClick={goToBack} text={'Назад'} />
          <Button
            onClick={() => addCourse(nameClasses, 'test')}
            text={'Добавить занятие'}
            variant={'primary'}
          />
        </div>
      </div>
    </div>
  )
}
