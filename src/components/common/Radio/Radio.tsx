import React, {FC, memo} from 'react';
import {RadioPropsT} from '../../../types/commonComponentsTypes';
import styles from './radio.module.scss';

export const Radio: FC<RadioPropsT> = React.memo(({ name, title, id, func }) => (
    <div className={styles.radioContainer} onClick={func && (() => func(id || ''))} key={id}>
      <input type="radio" name={name} id={id} className={styles.custom_radio} value={id} key={`${id}`}/>
      <label htmlFor={id}>{title}</label>
    </div>
  ));

