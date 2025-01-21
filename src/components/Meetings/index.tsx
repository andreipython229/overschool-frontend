import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { authSelector, selectUser } from "../../selectors";
import { useCreateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation } from "../../api/meetingsService";
import styles from './meetings.module.scss';
import { Button } from 'components/common/Button/Button'
import { setTotalMeetingCount } from "../../store/redux/meetings/meetingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

import { AddMeeting } from "./modal/AddMeeting"
import { MeetingCard } from "./card/MeetingCard"

export const SchoolMeetings: FC = () => {
    const isLogin = useAppSelector(authSelector);
    const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount);
    const schoolName = window.location.href.split('/')[4];
    const headerId = localStorage.getItem('header_id');

    const { role: userRole } = useAppSelector(selectUser);
    // const {data, isSuccess} = useFetchSchoolHeaderQuery(Number(headerId));
    const { data: meetingsData, isSuccess: meetingsSuccess } = useFetchAllMeetingsQuery({ schoolName: schoolName });
    const [showAddMeetingForm, setShowAddMeetingForm] = useState(false);

    // const [deleteMeetingsReminder] = useDeleteMeetingsRemindersMutation();
    const [deleteMeeting, { isLoading: isDeleting, error: deleteError }] = useDeleteMeetingMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (meetingsSuccess && meetingsData) {
            dispatch(setTotalMeetingCount(meetingsData.length));
        }
    }, [meetingsData, meetingsSuccess, dispatch]);

    
    const handleDeleteMeeting = (meetingId: number,) => {
        deleteMeeting({ id: meetingId, schoolName });
        dispatch(setTotalMeetingCount(totalMeetingCount - 1));
    };

    const handleAddMeetingFormOpen = () => {
        setShowAddMeetingForm(true);
    };

    const renderMeetingLinks = () => {
        const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        if (meetingsSuccess) {
            return (
                <div className={styles.meetingList}>
                    {meetingsData.map((meeting, index) => (<MeetingCard key={meeting.id} meeting={meeting}></MeetingCard>))}
                </div>

                // <table className={styles.meetingTable}>
                //     <thead>
                //     <tr>
                //         <th>Ссылка</th>
                //         <th>Дата и время</th>
                //         <th>Группы</th>
                //         <th>Время до старта</th>
                //         <th></th>
                //     </tr>
                //     </thead>
                //     <tbody>
                //     {meetingsData.map((meeting, index) => (
                //         <tr key={meeting.id}>
                //             <td><a href={meeting.link} target="_blank" rel="noopener noreferrer">{meeting.link}</a>
                //             </td>
                //             <td>{dateFormatter.format(new Date(meeting.start_date))}</td>
                //             <td>{meeting.students_groups.map(groupId => {
                //                 const group = studentsGroups?.results.find(g => g.group_id === groupId);
                //                 return group ? group.name : '';
                //             }).join(', ')}</td>
                //             <td><Timer targetDate={new Date(meeting.start_date)} /></td>
                //             <td>
                //                 <Button onClick={() => handleDeleteMeeting(meeting.id)} text="Удалить"/>
                //             </td>
                //         </tr>
                //     ))}
                //     </tbody>
                // </table>
            );
        }
        return <table className={styles.meetingTable}>
            <tbody>
                <tr className={styles.table_no_results}>
                    <td>Ничего не найдено</td>
                </tr>
            </tbody>
        </table>;
    };

    return (
        <div className={styles.wrapper_actions}>
            {isLogin && (
                <>
                    <Button className={styles.generateMeetingButton} onClick={handleAddMeetingFormOpen} text="Добавить видеоконференцию" />
                    <AddMeeting setShowAddMeetingForm={setShowAddMeetingForm} showAddMeetingForm={showAddMeetingForm}></AddMeeting>
                    {renderMeetingLinks()}
                </>
            )}
        </div>
    );
};

export default SchoolMeetings;