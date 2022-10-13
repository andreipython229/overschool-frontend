import styles from './addOptionsWithPictures.module.scss'

export const AddOptionsWithPictures = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
      </div>
      <h4 className={styles.wrapper_title}>Варианты с картинками</h4>
    </div>
  )
}
