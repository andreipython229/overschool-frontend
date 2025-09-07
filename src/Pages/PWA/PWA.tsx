import styles from './PWA.module.scss'

export const PWA = () => {
  return (
    <section className={styles.PWA}>
      <div className={styles.PWA_header}>
        <h1>Установка приложения</h1>
        <p>
          Установите CourseHUB как приложение на ваш телефон для более удобного использования. Приложение работает офлайн и обеспечивает быстрый
          доступ к курсам.
        </p>
      </div>

      <div className={styles.PWA_content}>
        <div className={styles.PWA_card}>
          <div className={styles.PWA_card_header}>
            <div className={`${styles.PWA_card_header_icon} ${styles.PWA_card_header_safari}`}>🍎</div>
            <h3>Safari (iPhone/iPad)</h3>
          </div>
          <div className={styles.PWA_card_steps}>
            <ol>
              <li>Зайдите на главную страницу с входом в систему</li>
              <li>Под доменом сайта перейдите на значок «Поделиться»</li>
              <li>Пролистайте вниз до кнопки «На экран «Домой»» и нажмите на нее</li>
              <li>Далее Вам предоставит страницу для подтверждения, в верхнем правом углу нажмите «Добавить»</li>
              <li>Вас перенаправит на Ваш рабочий стол с уже развернутым и установленным PWA</li>
              <li>Зайдите в PWA и войдите в систему</li>
            </ol>
          </div>
        </div>

        <div className={styles.PWA_card}>
          <div className={styles.PWA_card_header}>
            <div className={`${styles.PWA_card_header_icon} ${styles.PWA_card_header_chrome}`}>🌐</div>
            <h3>Chrome (Android)</h3>
          </div>
          <div className={styles.PWA_card_steps}>
            <ol>
              <li>Зайдите на главную страницу с входом в систему</li>
              <li>Нажмите на кнопку расширений в правом верхнем углу</li>
              <li>Внизу нажмите кнопку Добавить на главный экран</li>
              <li>Далее Вам предоставит страницу для подтверждения, нажмите «Добавить»</li>
              <li>Дождитесь уведомления о завершении загрузки</li>
              <li>Перейдите на рабочий стол</li>
              <li>Зайдите в PWA и войдите в систему</li>
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.PWA_info}>
        <h2>Преимущества установки приложения</h2>
        <p>После установки CourseHUB как приложения вы получите доступ к расширенным возможностям и более удобному интерфейсу для обучения.</p>

        <div className={styles.PWA_info_features}>
          <div className={styles.PWA_info_features_item}>
            <h4>🚀 Быстрый доступ</h4>
            <p>Запускайте приложение одним касанием с главного экрана телефона</p>
          </div>

          <div className={styles.PWA_info_features_item}>
            <h4>📱 Удобный интерфейс</h4>
            <p>Адаптированный дизайн для мобильных устройств с улучшенной навигацией</p>
          </div>

          <div className={styles.PWA_info_features_item}>
            <h4>💾 Офлайн доступ</h4>
            <p>Просматривайте загруженные материалы даже без интернета</p>
          </div>

          <div className={styles.PWA_info_features_item}>
            <h4>🔔 Уведомления</h4>
            <p>Получайте важные уведомления о новых уроках и заданиях</p>
          </div>

          <div className={styles.PWA_info_features_item}>
            <h4>⚡ Высокая скорость</h4>
            <p>Быстрая загрузка и плавная работа приложения</p>
          </div>

          <div className={styles.PWA_info_features_item}>
            <h4>🔒 Безопасность</h4>
            <p>Защищенное соединение и безопасное хранение данных</p>
          </div>
        </div>
      </div>
    </section>
  )
}
