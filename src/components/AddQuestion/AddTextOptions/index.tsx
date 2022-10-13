import styles from './addTextOptions.module.scss'

export const AddTextOptions = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconRow}>
          <span />
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Текстовые варианты</h4>
    </div>
  )
}
