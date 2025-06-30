import React, { FC, useState } from "react";
import styles from './card.module.scss';
import { Autowebinar } from "../../../types/autowebinarsT";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsIconPath, copyIconPath, successIconPath } from 'config/commonSvgIconsPath'
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
    const protocol = window.location.protocol;
    const host = window.location.host;
    const webinarUrl = `${protocol}//${host}/webinar/${webinar.slug}/`;

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(webinarUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error('Ошибка копирования:', err);
      }
    };

    return (
      <div className={styles.card_container}>
        <AddWebinar setShowAddWebinarForm={setShowAddWebinarForm} showAddWebinarForm={showAddWebinarForm} existingWebinar={webinar}></AddWebinar>
        <div className={styles.card_avatar_container}></div>
        <div className={styles.card_description}>
            <div className={styles.card_cource_name}>{schoolName}</div>
            <div className={styles.card_meeting_title}>{webinar.title}</div>
            <div className={styles.card_meeting_description}>{webinar.description}</div>
            <div className={styles.card_meeting_link}>
              <div className={styles.card_meeting_description}>
                  Ссылка: <span>{webinarUrl}</span>
              </div>
              {copied ? (
                <div className={styles.card_meeting_copysvg}>
                    <IconSvg path={successIconPath} viewBoxSize="0 0 122.88 122.88" height={14} width={14} />
                </div>
              ) : (
                <div onClick={handleCopy} className={styles.card_meeting_copysvg}>
                    <IconSvg path={copyIconPath} viewBoxSize="0 0 115.77 122.88" height={14} width={14} />
                </div>
              )}
            </div>
        </div>
        <div className={styles.card_schedule}>
            <div className={styles.meeting_edit_btn_wrapper}>
                <div onClick={handleAddWebinarFormOpen} className={styles.meeting_edit_btn}>
                    <IconSvg path={settingsIconPath} viewBoxSize="0 0 24 24" height={48} width={48}/>
                </div>
            </div>
            <div className={styles.date_wrapper}>
                <div>Начало в {webinar.start_time}</div>
            </div>
        </div>
     </div>)
}