import { FC, memo } from 'react'

import { useBoolean } from '../../customHooks/useBoolean'
import { CheckboxBall } from '../../components/common/CheckboxBall'

import styles from './profile.module.scss'
import { useUpdateNotificationsForStudentAndTeacherMutation, useUpdateNotificationsForAdminMutation } from 'api/tgNotificationsServices'
import { log } from 'console'


type NotificationItemProps = {
  id: number
  info: string
  desc: string
  initialStates: {
    id: number
    homework_notifications: boolean;
    messages_notifications: boolean;
    completed_courses_notifications: boolean;
    tg_user: number;
    user_role: number;
  };
  toggleType: 'homework_notifications' | 'messages_notifications' | 'completed_courses_notifications';

}

export const NotificationItem: FC<NotificationItemProps> = memo(({ id, info, desc, initialStates, toggleType }) => {

  const [toggleState, toggleHandlers] = useBoolean(initialStates[toggleType]);
  const [updateNotificationsForStudentAndTeacher, { isError, isSuccess }] = useUpdateNotificationsForStudentAndTeacherMutation()
  const [updateNotificationsForAdmin,] = useUpdateNotificationsForAdminMutation()

  
  const handleToggleChange = async () => {
    try { 
      if (initialStates.user_role === 1 || initialStates.user_role === 2) {          
        await updateNotificationsForStudentAndTeacher({
          id: initialStates.id,
          data: {
            [toggleType]: !toggleState,
            tg_user: initialStates.tg_user
          },
        });     
    } else if (initialStates.user_role === 6) {
      await updateNotificationsForAdmin({
        id: initialStates.id,
        data: {
          [toggleType]: !toggleState,
          tg_user: initialStates.tg_user
        },
      })
    }
        
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <div key={id} className={styles.notification_toggleWrapper_toggleBlock}>
      <div className={styles.notification_toggleWrapper_toggleBlock_text}>
        <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>{info}</span>
        <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>{desc}</p>
      </div>
      <div className={styles.notification_toggleWrapper_toggleBlock_checkboxWrapper}>
        <CheckboxBall
         toggleChecked={() => {
          toggleHandlers.onToggle()
          handleToggleChange();

        }} 
        isChecked={toggleState} />
        
      </div>
    </div>
  );
});


