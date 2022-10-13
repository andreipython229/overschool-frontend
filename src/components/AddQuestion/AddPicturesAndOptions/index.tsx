import styles from './addPicturesAndOptions.module.scss'

export const AddPicturesAndOptions = () => {

  return (
    <div className={styles.wrapper}>
        <div className={styles.wrapper_iconWrapper}>
            <div className={styles.wrapper_iconWrapper_iconColumn}>
                <span/>
            </div>
            <div className={styles.wrapper_iconWrapper_iconRowWrapper}>
            <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
                <span/>
            </div>
            <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
                <span/>
            </div>
            <div className={styles.wrapper_iconWrapper_iconRowWrapper_iconRow}>
                <span/>
            </div>
            </div>
        </div>
        <h4 className={styles.wrapper_title}>Картинка и варианты</h4>
    </div>
  )
}
