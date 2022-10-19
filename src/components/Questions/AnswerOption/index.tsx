import { ChangeEvent, FC, memo, ReactNode, useEffect, useState } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';

import styles from './answerOption.module.scss';
import { InputBlock } from 'components/common/Input/InputBlock';
import { Checkbox } from 'components/common/Checkbox/Checkbox';
import { deleteIconPath, addCommentsIconPath, grabIconPath } from '../config/svgIconPath';
import { Button } from 'components/common/Button/Button';

type AnswerOptionT = {
    children?: ReactNode
}

export const AnswerOption:FC<AnswerOptionT>= memo(({children}) => {
  return (
    <div className={styles.answerOptionsBlock}>
        <h4 className={styles.answerOptionsBlock_title}>Добавьте варианты ответов:</h4>
        <div className={styles.answerOptionsBlock_inputWrapper}>
            {children}
            <InputBlock  id={''} name={''} type={''} value={''} placeholder={'Вариант ответа'} />
            <div className={styles.answerOptionsBlock_inputWrapper_correctAnswerWrapper}>
                <Checkbox>Правильный ответ</Checkbox>
            </div>
            <div className={styles.answerOptionsBlock_inputWrapper_comment}>                    
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={addCommentsIconPath}>
                    <line x1="7.97656" y1="6.00781" x2="11.9531" y2="6.00781" stroke="#D4D7DD" strokeLinecap="round"/>
                    <line x1="5.48828" y1="9.00781" x2="11.9531" y2="9.00781" stroke="#D4D7DD" strokeLinecap="round"/>
                    <line x1="5.48828" y1="12.0078" x2="11.9531" y2="12.0078" stroke="#D4D7DD" strokeLinecap="round"/>
                </IconSvg>
            </div>
            <div className={styles.answerOptionsBlock_inputWrapper_delete}>
                <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} />
            </div>
            <div className={styles.answerOptionsBlock_inputWrapper_grab}>                    
                <IconSvg  width={21} height={14} viewBoxSize="0 0 21 14" path={grabIconPath}/>
            </div>
        </div>        
        <Button text={'+ Добавить вариант'} style={{ marginTop: '26px' }} variant={'primary'} ></Button>       
    </div>
  )
})
