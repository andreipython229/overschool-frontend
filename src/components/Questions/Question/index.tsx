import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';

import styles from './question.module.scss';
import { InputBlock } from 'components/common/Input/InputBlock';
import { addCommentsIconPath } from '../config/svgIconPath';

export const Question = () => {
  return (      
    <div className={styles.questionBlock}>
        <h4 className={styles.questionBlock_title}>Введите вопрос:</h4>
        <div className={styles.questionBlock_inputWrapper}>
            <InputBlock id={''} name={''} type={''} value={''} placeholder={''} />
            <div className={styles.questionBlock_inputWrapper_comment}>                    
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={addCommentsIconPath}>
                    <line x1="7.97656" y1="6.00781" x2="11.9531" y2="6.00781" stroke="#D4D7DD" strokeLinecap="round"/>
                    <line x1="5.48828" y1="9.00781" x2="11.9531" y2="9.00781" stroke="#D4D7DD" strokeLinecap="round"/>
                    <line x1="5.48828" y1="12.0078" x2="11.9531" y2="12.0078" stroke="#D4D7DD" strokeLinecap="round"/>
                </IconSvg>
            </div>
        </div>
        <p className={styles.questionBlock_addDescription}>+ добавить описание</p>
    </div>
  )
}
