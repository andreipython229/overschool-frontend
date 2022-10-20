import styles from './textOptions.module.scss';
import { Question } from '../Question';
import { AnswerOption } from '../AnswerOption';
import { QuestionHeader } from '../QuestionHeader';

export const TextOptions = () => {

  return (
    <div className={styles.wrapper}>
        <QuestionHeader>
            <div className={styles.wrapper_header_iconWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRow}>
                    <span/>
                </div>
            </div>
        </QuestionHeader>
        <div className={styles.wrapper_optionsContent}>
            <Question />
            <AnswerOption />
        </div>
    </div>
  )
}
