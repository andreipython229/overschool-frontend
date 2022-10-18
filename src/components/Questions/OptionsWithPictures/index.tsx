import { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import styles from './optionsWithPictures.module.scss';
import { Question } from '../Question';
import { AnswerOption } from '../AnswerOption';
import { QuestionHeader } from '../QuestionHeader';

export const OptionsWithPictures = () => {

  return (
    <div className={styles.wrapper}>
        <QuestionHeader>
            <div className={styles.wrapper_header_iconWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconColumn}>
                <span />
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconColumn}>
                <span />
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
