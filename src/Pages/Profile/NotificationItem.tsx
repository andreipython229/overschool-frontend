import { FC, memo } from 'react'

import { useBoolean } from '../../customHooks/useBoolean'
import { CheckboxBall } from '../../components/common/CheckboxBall'

import styles from './profile.module.scss'


type NotificationItemProps = {
  id: number
  info: string
  desc: string
  initialStates: {
    id: number
    homework_notifications: boolean;
    messages_notifications: boolean;
    completed_courses_notifications: boolean;
  };
  toggleType: 'homework_notifications' | 'messages_notifications' | 'completed_courses_notifications';

}

export const NotificationItem: FC<NotificationItemProps> = memo(({ id, info, desc, initialStates, toggleType }) => {

  const [toggleState, toggleHandlers] = useBoolean(initialStates[toggleType]);
  console.log(initialStates.id);
  

  return (
    <div key={id} className={styles.notification_toggleWrapper_toggleBlock}>
      <div className={styles.notification_toggleWrapper_toggleBlock_text}>
        <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>{info}</span>
        <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>{desc}</p>
      </div>
      <div className={styles.notification_toggleWrapper_toggleBlock_checkboxWrapper}>
        <CheckboxBall isChecked={toggleState} toggleChecked={toggleHandlers.onToggle} />
        
      </div>
    </div>
  );
});


