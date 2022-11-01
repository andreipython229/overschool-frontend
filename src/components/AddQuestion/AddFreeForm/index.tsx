import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addFreeForm.module.scss'

export const AddFreeForm: FC<AddQuestionOptionsT> = ({ setTypeQuestions }) => {
  const handleGetTypeQuestion = () => {
    setTypeQuestions('Free' as keyof object)
  }
  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_icon}>
          <IconSvg width={51} height={37} viewBoxSize="0 0 51 37">
            <rect x="0.0449219" y="0.429688" width="50.0352" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="0.0449219" y="8.53125" width="26.1523" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="29.8418" y="8.53125" width="21.1133" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="0.0449219" y="16.6328" width="13.3398" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="18.3926" y="16.6328" width="20.1836" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="0.0449219" y="24.7344" width="46.0156" height="4.10156" rx="2.05078" fill="#6B7280" />
            <rect x="0.0449219" y="32.8359" width="21.4004" height="4.10156" rx="2.05078" fill="#6B7280" />
          </IconSvg>
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Свободная форма</h4>
    </button>
  )
}
