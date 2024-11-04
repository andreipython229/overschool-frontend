import { FC } from 'react'
import { NewLoader, newLoaderT } from './SimpleLoader'
import styles from './loader.module.scss'

export const LoaderLayout: FC<newLoaderT> = ({ style }) => {
  return (
    <div className={styles.wrapper}>
      <NewLoader style={{ ...style }} />
    </div>
  )
}
