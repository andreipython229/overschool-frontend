import React, {FC, useEffect, useState} from "react";
import styles from "./ProfileModalTelegramNotification.module.scss";
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
    const [timeAnswer, setTimeAnswer ] = useState(false)
    const [sound, setSound] = useState(false)
    const [messagesNotifications, setMessagesNotifications] = useState(false)
    const [completedCoursesNotifications, setCompletedCoursesNotifications] = useState(false)
    const [homeworkNotifications, setHomeworkNotifications] = useState(false)
    const [reminderWebinar, setReminderWebinar] = useState(false)



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
                        <div className={styles.modalTelegram_title}>
                            <h2><IconSvg viewBoxSize="0 0 24 20" height={27} width={27} path={SettingsIconPath} />
                                Настройка уведомлений
                                Telegram</h2>
                        </div>

                        <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <h2 style={{
                                    paddingBottom: '25px'
                                }}>Включить звук</h2>
                                <div>
                                <CheckboxBall toggleChecked={() => setSound(!sound)} isChecked={sound}/>
                                    </div>
                            </div>
                        </div>

                        { userRole === 1  &&
                            <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <span className={styles.modalTelegram_wrapper_title}> Напоминание о предстоящем вебинаре</span>
                                <div>
                                <CheckboxBall toggleChecked={() => setReminderWebinar(!reminderWebinar)} isChecked={reminderWebinar}/>
                                    </div>
                            </div>
                        </div>
                        }

                        { userRole === 2 &&
                            <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <span className={styles.modalTelegram_wrapper_title}>Ученик прислал ответ на задание</span>
                                <div>
                                <CheckboxBall toggleChecked={() => setHomeworkNotifications(!homeworkNotifications)} isChecked={homeworkNotifications}/>
                                    </div>
                            </div>
                        </div>
                        }

                        { (userRole === 6 || userRole === 2) &&
                            <div>
                        <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <span className={styles.modalTelegram_wrapper_title}>Ученик ждет ответа уже 24 часа</span>
                                <div>
                                <CheckboxBall toggleChecked={() => setTimeAnswer(!timeAnswer)} isChecked={timeAnswer}/>
                                    </div>
                            </div>
                        </div>

                            <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <span className={styles.modalTelegram_wrapper_title}>Ученик завершил курс</span>
                                <div>
                                <CheckboxBall toggleChecked={() => setCompletedCoursesNotifications(!completedCoursesNotifications)} isChecked={completedCoursesNotifications}/>
                                    </div>
                            </div>
                        </div>
                                </div>
                        }

                        <div className={styles.container}>
                            <div className={styles.modalTelegram_wrapper}>
                                <span className={styles.modalTelegram_wrapper_title}>Уведомлять о непрочитанных
                                    сообщениях</span>
                                <div>
                                <CheckboxBall toggleChecked={() => setMessagesNotifications(!messagesNotifications)} isChecked={messagesNotifications}/>
                                    </div>
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