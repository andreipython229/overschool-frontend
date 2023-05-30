import { FC, memo } from 'react'

import { CheckboxPropsT } from '../../../types/commonComponentsTypes'

import styles from './checkbox.module.scss'

export const Checkbox: FC<CheckboxPropsT> = memo(({id, name, checked, onChange, children}) => {

    return (
        <>
            <label htmlFor={id}>
                <input type="checkbox" onChange={onChange} name={name} id={id} checked={checked}
                />
                <span>{children}</span>
            </label>
        </>
    );
});


