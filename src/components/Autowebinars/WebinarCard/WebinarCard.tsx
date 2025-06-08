import React, { FC, useState } from "react";
import styles from './card.module.scss';
import { Autowebinar } from "../../../types/autowebinarsT";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import { AddWebinar } from "./../modal/AddWebinar"
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

interface WebinarCardProps {
  webinar: Autowebinar
}

export const WebinarCard: FC<WebinarCardProps> = ({ webinar }) => {
    const { schoolName } = useAppSelector(schoolSelector)
    const [showAddWebinarForm, setShowAddWebinarForm] = useState(false);

    const handleAddWebinarFormOpen = () => {
        setShowAddWebinarForm(true);
    };

    return (
      <div className={styles.card_container}>
        <AddWebinar setShowAddWebinarForm={setShowAddWebinarForm} showAddWebinarForm={showAddWebinarForm} existingWebinar={webinar}></AddWebinar>
        <div className={styles.card_avatar_container}></div>
        <div className={styles.card_description}>
            <div className={styles.card_cource_name}>{schoolName}</div>
            <div className={styles.card_meeting_title}>{webinar.title}</div>
            <div className={styles.card_meeting_description}>{webinar.description}</div>
        </div>
        <div className={styles.card_schedule}>
            <div className={styles.meeting_edit_btn_wrapper}>
                <div onClick={handleAddWebinarFormOpen} className={styles.meeting_edit_btn}>
                    <IconSvg path={settingsIconPath} viewBoxSize="0 0 24 24" height={48} width={48} />
                </div>
            </div>
            <div className={styles.date_wrapper}>
                <div>Начало в {webinar.start_time}</div>
            </div>
        </div>
     </div>)
}