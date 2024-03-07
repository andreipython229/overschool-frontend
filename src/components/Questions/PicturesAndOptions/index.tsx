import styles from './picturesAndOptions.module.scss';
import { Question } from '../Question';
import { AnswerOption } from '../AnswerOption';
import { QuestionHeader } from '../QuestionHeader';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { addPictureIconPath} from '../config/svgIconPath';
import { InputBlock } from 'components/common/Input/InputBlock';
import {PropsQuestionBlockT} from "../../AddQuestion";
import { FC, MouseEvent, PointerEvent, useEffect, useState, useCallback } from 'react'
import { useBoolean } from '../../../customHooks'
import { useAddAnswerMutation } from '../../../api/questionsAndAnswersService'
import { useDragControls } from 'framer-motion'
import { usePatchAnswerMutation } from 'api/questionsAndAnswersService'
import { Button } from '../../common/Button/Button'
import { orderBy } from 'lodash';

export const PicturesAndOptions: FC<PropsQuestionBlockT> = ({question, title, answers, id, testId}) => {
    const [questionState, setQuestionState] = useState(question);
    const [isOpen, { onToggle }] = useBoolean()
    const [answersToRender, setAnswersToRender] = useState(answers || [])
    const schoolName = window.location.href.split('/')[4]
    const [questionImage, setQuestionImage] = useState<string | null>(null);
    const isAddButtonVisible = answersToRender.length < 4;
  
    const [addAnswer] = useAddAnswerMutation()
    const [patchAnswer] = usePatchAnswerMutation()
  
    const controls = useDragControls()
  
    const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
      controls.start(event)
    }
  
    const handleChangeQuestion = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
          const files = event.target.files;
          
          if (files && files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append('question', questionId.toString());
            formData.append('body', 'Введите вопрос');
            formData.append('picture', file);

            if (testId) {
                formData.append('test', testId.toString());
              }
      
            fetch(`/api/${schoolName}/questions/${questionId}/`, {
              method: 'PATCH',
              body: formData,
            })
            .then(response => {
                setQuestionImage(URL.createObjectURL(file));
            })
          }
        },
        [schoolName]
      );

      useEffect(() => {
        setQuestionState(question);
        if (question?.picture) {
            setQuestionImage(question.picture)
        }
    }, [question]);
  
    const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const answerToAdd = {
        question: question?.question_id,
        image: File,
        body: 'Вариант ответа'
      }
      addAnswer({ body: answerToAdd, schoolName })
    }
  
    useEffect(() => {
      setAnswersToRender(answers || [])
      
    }, [answers])

  return (
    <div className={styles.wrapper}>
        <QuestionHeader title={title} id={id} isOpen={isOpen} onToggle={onToggle} testId={testId}>
            <div className={styles.wrapper_header_iconWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconColumn}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                </div>
            </div>
        </QuestionHeader>
        
        {isOpen && (
            <div className={styles.wrapper_optionsContent}>
                <Question id={id} title={title} testId={testId}>
                        <div className={styles.wrapper_optionsContent_addPicture}>
                            {questionImage ? (
                                <div style={{ marginBottom: '-15px', marginLeft: '33%' }}>
                                    <img src={questionImage} alt="Question Image" width={300} height={275} style={{ borderRadius: '10px', display: 'block' }}/>
                                 </div>
                                ) : (
                                    <>
                                        <p className={styles.wrapper_optionsContent_addPicture_text}>Добавить изображение</p>
                                        <div className={styles.wrapper_optionsContent_addPicture_iconWrapper}>
                                            <InputBlock name={''} type={'file'} value={''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeQuestion(e, question?.question_id ?? 0)} />
                                            <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath} />
                                        </div>
                                    </>
                                )}
                        </div>
                </Question>
                {answersToRender ? (
              orderBy(answersToRender, 'answer_id').map((answer, index) => (
                <div key={`${answer.body}_${index}`} className={styles.answerOptionContainer}>
                      <AnswerOption id={id} answer={answer} />
                </div>
              ))
            ) : (
              ''
            )}
            </div>
            )}
            {isOpen && isAddButtonVisible && (
            <Button
                text={'+ Добавить вариант'}
                style={{ marginTop: '26px', marginLeft: '38%', display: 'block' }}
                variant={'primary'}
                onClick={handleAddAnswer}
            />
            )}
    </div>
  )
}
