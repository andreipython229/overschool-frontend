import {ChangeEvent, FC, memo, useState} from 'react'

import {CheckboxPropsT} from '../../../types/commonComponentsTypes'

import styles from './checkbox.module.scss'

export const Checkbox: FC<CheckboxPropsT> = memo(({id, name, checked, onChange, children}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <>
            <label className={styles.label} htmlFor={id}>
                <input className={styles.label_input} type="checkbox" onChange={handleOnChange} name={name} id={id}
                       checked={isChecked}/>
                <span className={styles.label_customCheckbox}/>
                {children}
            </label>
        </>
    )
})


