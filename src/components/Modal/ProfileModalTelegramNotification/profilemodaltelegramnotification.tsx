import React, {FC, useEffect, useState} from "react";
import styles from "../../Modal/ProfileModalTelegramNotification/profilemodaltelegramnotification.module.scss";
import {IconSvg} from "../../common/IconSvg/IconSvg";
import {arrowLeftIconPath, crossIconPath} from "../../../config/commonSvgIconsPath";
import {CheckboxBall} from "../../common/CheckboxBall";
import {Button} from "../../common/Button/Button";
import {TelegramModalPropsT} from "../ModalTypes";
import {useAppSelector} from "../../../store/hooks";
import {selectUser} from "../../../selectors";
import {NotificationsIconPath, SettingsIconPath} from "../../../assets/Icons/svgIconPath";





export const SetupNotificationTelegramAdmin: FC<TelegramModalPropsT> = ({ setShowModal }) => {


    const {role: userRole} = useAppSelector(selectUser);
    const [timeanswer, setTimeanswer ] = useState(false)
    const [sound, setSound] = useState(false)
    const [messages_notifications, setMessages_notifications] = useState(false)
    const [completed_courses_notifications, setCompleted_courses_notifications] = useState(false)
    const [homework_notifications, setHomework_notifications] = useState(false)
    const [reminder_webinar, setReminder_webinar] = useState(false)



    return (
        <div>
            <div className={styles.modalTelegram}>
                <div className={styles.container}>
                    <div className={styles.bg}>
                        <div className={styles.bg_wrap1}></div>
                    </div>
                    <div className={styles.bg}>
                        <div className={styles.bg_wrap2}></div>
                    </div>
                    <div className={styles.bg}>
                        <div className={styles.bg_wrap3}></div>
                    </div>
                    <div className={styles.bg}>
                        <div className={styles.bg_wrap4}></div>
                    </div>
                    <div>
                        <div className={styles.modalTelegram_closed} onClick={setShowModal}>
                            <IconSvg width={25} height={25} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            textAlign: 'center',
                            // gap: '40px',
                             maxWidth: '380px',
                             paddingBottom: '75px',
                             paddingTop: '30px',
                             marginLeft: '30px',
                             paddingLeft: '20px',
                             paddingRight: '20px',
                        }}>
                            <IconSvg viewBoxSize="0 0 24 20" height={27} width={27} path={SettingsIconPath} />
                            <h2>Настройка уведомлений
                                Telegram</h2>
                        </div>

                        <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h2 style={{
                                    display: 'absolute',
                                    paddingBottom: '25px'
                                }}>Включить звук</h2>
                                <CheckboxBall toggleChecked={() => setSound(!sound)} isChecked={sound}/>
                            </div>
                        </div>

                        { userRole === 1  &&
                            <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{fontSize: '20px'}}> Напоминание о предстоящем вебинаре</span>
                                <CheckboxBall toggleChecked={() => setReminder_webinar(!reminder_webinar)} isChecked={reminder_webinar}/>
                            </div>
                        </div>
                        }

                        { userRole === 2 &&
                            <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{fontSize: '20px'}}>Ученик прислал ответ на задание</span>
                                <CheckboxBall toggleChecked={() => setHomework_notifications(!homework_notifications)} isChecked={homework_notifications}/>
                            </div>
                        </div>
                        }

                        { (userRole === 6 || userRole === 2) &&
                            <div>
                        <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{fontSize: '20px'}}>Ученик ждет ответа уже 24 часа</span>
                                <CheckboxBall toggleChecked={() => setTimeanswer(!timeanswer)} isChecked={timeanswer}/>
                            </div>
                        </div>

                            <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{fontSize: '20px'}}>Ученик завершил курс</span>
                                <CheckboxBall toggleChecked={() => setCompleted_courses_notifications(!completed_courses_notifications)} isChecked={completed_courses_notifications}/>
                            </div>
                        </div>
                                </div>
                        }

                        <div className={styles.container}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span style={{fontSize: '20px'}}>Уведомлять о непрочитанных
                                    сообщениях</span>
                                <CheckboxBall toggleChecked={() => setMessages_notifications(!messages_notifications)} isChecked={messages_notifications}/>
                            </div>
                        </div>
                        <div className={styles.modalTelegram_container}>
                            <Button
                                onClick={setShowModal}
                                variant='newPrimary'
                                text={'Сохранить изменения'}
                            />
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}