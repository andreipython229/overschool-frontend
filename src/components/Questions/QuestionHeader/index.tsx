import { FC, memo, ReactNode } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { deleteIconPath, lessonIcon, arrowDownPath, arrowDownTimerIconPath, grabIconPath } from '../config/svgIconPath'
import { PropsQuestionBlockT } from '../../AddQuestion'
import { useRemoveQuestionsMutation } from '../../../api/questionsAndAnswersService'

import styles from './questionHeader.module.scss'

type QuestionHeaderT = {
  children?: ReactNode
}

export const QuestionHeader: FC<QuestionHeaderT & PropsQuestionBlockT> = memo(({ title, id, isOpen, onToggle, children }) => {
  const [deleteQuestion] = useRemoveQuestionsMutation()

  const handleGetTypeQuestion = async () => {
    await deleteQuestion(id)
  }

  return (
    <div className={styles.header}>
      {children}
      <h4>{title}</h4>
      <div className={styles.header_controlIconWrapper}>
        {/* <div className={styles.header_controlIconWrapper_timer}>
          <IconSvg width={15} height={15} viewBoxSize="0 0 19 19">
            <g clipPath="url(#clip0_2875_4565)">
              <path d="M8.83789 3.10156H7.83789V8.66753L11.4508 10.3847L11.8801 9.48147L8.83789 8.03559V3.10156Z" fill="#25B59E" />
              <path
                d="M8.35352 0.617188C4.21139 0.617188 0.853516 3.97506 0.853516 8.11719C0.853516 12.2593 4.21139 15.6172 8.35352 15.6172C12.4956 15.6172 15.8535 12.2593 15.8535 8.11719C15.8535 3.97506 12.4956 0.617188 8.35352 0.617188ZM8.35352 14.6172C4.76367 14.6172 1.85352 11.707 1.85352 8.11719C1.85352 4.52734 4.76367 1.61719 8.35352 1.61719C11.9434 1.61719 14.8535 4.52734 14.8535 8.11719C14.8535 11.707 11.9434 14.6172 8.35352 14.6172Z"
                fill="#17B198"
              />
            </g>
            <defs>
              <rect width="16" height="16" fill="white" transform="translate(0.353516 0.117188)" />
            </defs>
          </IconSvg>
          <input type={'time'} />
          <div className={styles.wrapper_header_controlIconWrapper_timer_clearTimer}>
            <IconSvg width={6} height={6} viewBoxSize="0 0 6 6" path={clearTimerPath}/>
          </div> 
          <div className={styles.header_controlIconWrapper_timer_openList}>
            <IconSvg width={10} height={10} viewBoxSize="0 0 10 15" path={arrowDownPath} />
          </div>
        </div> */}
        <div
          onClick={onToggle}
          className={!isOpen? styles.header_controlIconWrapper_togglerShowOption
              : styles.header_controlIconWrapper_togglerShowOption + ' ' + styles.rotate_arrow
          }
        >
          <IconSvg width={22} height={17} viewBoxSize="0 0 22 22" path={arrowDownTimerIconPath} />
        </div>
        {/* <div className={styles.header_controlIconWrapper_duplicate}>
          <IconSvg width={22} height={22} viewBoxSize="0 0 22 22" path={lessonIcon} />
        </div> */}
        <div onClick={handleGetTypeQuestion} className={styles.header_controlIconWrapper_delete}>
          <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
        </div>
        {/*<div onPointerDown={onPointerDown} className={styles.header_controlIconWrapper_grab}>*/}
        {/*  <IconSvg width={21} height={14} viewBoxSize="0 0 21 14" path={grabIconPath} />*/}
        {/*</div>*/}
      </div>
    </div>
  )
})
