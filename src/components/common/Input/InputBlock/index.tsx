import { FC, memo } from 'react'
import { InputBlockT } from '../../commonComponentsTypes'
import styles from './input.module.scss'

export const InputBlock: FC<InputBlockT> = memo(props => {
  const { type, id, name, value, placeholder, ...rest } = props

  return (
    <label className={styles.label}>
      <input {...rest} id={id} name={name} type={type} value={value} placeholder={placeholder} />
    </label>
  )
})
