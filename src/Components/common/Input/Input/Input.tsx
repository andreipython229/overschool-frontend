import React, {FC} from 'react';
import styles from './input.module.scss'

export type InputPropsT = {
    id?: string
    name: string
    type: string
    onChange: (value: any) => void
    value: string
    onBlur?: (e: any) => void
    icon?: string
    onClick?: () => void
    label?: string
    placeholder?: string
}

export const Input: FC<InputPropsT> = props => {
    const {label, onClick, icon, type, id, name, onChange, value, placeholder, ...rest} = props
    return (
        <div className={styles.input_container}>
            {label && <label htmlFor={name} className={styles.input_container_textFieldLabel}>
                {label}
            </label>}
            <div className={styles.input}>
                <input
                    required
                    id={id}
                    name={name}
                    type={type}
                    onChange={onChange}
                    value={value}
                    onBlur={rest.onBlur}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
};

