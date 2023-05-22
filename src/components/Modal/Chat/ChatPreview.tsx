import styles from './chat.module.scss'

export const ChatPreview = () => {
  return (
    <div className={styles.chatPreview}>
      <div className={styles.chatPreview_avatarWrap}>
        {/* <img className={styles.chatPreview_avatar} src='' alt="avatar" /> */}
        ба
      </div>
      <div className={styles.chatPreview_info}>
        <div className={styles.chatPreview_top}>
          <p>Малашенко Дмитрий Сергеевич</p>
          <p>вт</p>
        </div>
        <div className={styles.chatPreview_lastMessage}>Менеджер сейчас отпишет в беседе</div>
      </div>
    </div>
  )
}
