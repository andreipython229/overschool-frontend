import { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import styles from './optionsWithPictures.module.scss';
import { Question } from '../Question';
import { AnswerOption } from '../AnswerOption';
import { QuestionHeader } from '../QuestionHeader';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { addPictureIconPath} from '../config/svgIconPath';

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
            <AnswerOption>
              <div className={styles.wrapper_addPicturesBlock}>
                <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath}/>
              </div>
            </AnswerOption>
        </div>
    </div>
  )
}
