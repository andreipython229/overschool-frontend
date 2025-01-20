import React, { FC, useEffect, useState } from "react";
import styles from './card.module.scss';
import { SchoolMeeting } from "../../../types/schoolMeetingsT";
import { meetingCountSlice } from "store/redux/meetings/meetingSlice";
import { StGroupT } from "types/CoursesT";

interface MeetingCardProps {
    meeting: SchoolMeeting
}




export const MeetingCard: FC<MeetingCardProps> = ({ meeting }) => {
    function formatDate(isoDate: Date) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    function formatTime(isoDate: Date) {
        const date = new Date(isoDate);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }
    return (<div className={styles.card_container}>
        <div className={styles.card_avatar_container}></div>
        <div className={styles.card_description}></div>
        <div className={styles.card_schedule}>
            <div></div>
            <div className={styles.date_wrapper}>
                <div>{formatDate(meeting.start_date)}</div>
                <div>Начало в {formatTime(meeting.start_date)}</div>
            </div>
        </div>
    </div>)
}