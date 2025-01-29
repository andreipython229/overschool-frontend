import React, { FC, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import { useFetchCoursesQuery } from "../../../api/coursesServices";
import MenuItem from "@mui/material/MenuItem";
import { CoursesDataT } from "../../../types/CoursesT";
import { useFetchStudentsGroupQuery } from "../../../api/studentsGroupService";
import { useFetchSchoolHeaderQuery } from "../../../api/schoolHeaderService";
import { useCreateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation } from "../../../api/meetingsService";
import { useCreateMeetingsRemindersMutation } from "api/tgNotificationsServices";
import Timer from "../../Timer/Timer";
import { TgMeetingReminders } from "types/tgNotifications";
import { Button } from 'components/common/Button/Button'
import { number } from "yup";
import styles from './addMeeting.module.scss';
import { SchoolMeeting } from "../../../types/schoolMeetingsT";
import { RootState } from "../../../store/redux/store";
import { setTotalMeetingCount } from "../../../store/redux/meetings/meetingSlice";
import { Input } from 'components/common/Input/Input/Input'

interface AddMeetingProps {
    showAddMeetingForm: boolean;
    setShowAddMeetingForm: (show: boolean) => void;
}

export const AddMeeting: FC<AddMeetingProps> = ({ showAddMeetingForm, setShowAddMeetingForm }) => {
    const schoolName = window.location.href.split('/')[4];
    const [showReminderOptions, setShowReminderOptions] = useState(false);
    const { data: studentsGroups, isSuccess: groupsSuccess } = useFetchStudentsGroupQuery(schoolName);
    const { data: Courses, isSuccess: coursesSuccess } = useFetchCoursesQuery(schoolName);
    const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null);
    const [allGroups, setAllGroups] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [createMeeting, { isLoading, error }] = useCreateMeetingMutation();
    const [createMeetingsReminder] = useCreateMeetingsRemindersMutation();

    
    const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount);

    const [newMeetingData, setNewMeetingData] = useState<SchoolMeeting>({
        id: 0,
        students_groups: [],
        link: '',
        start_date: new Date(),
        title: '',
        description: '',
    });

    const [newMeetingReminder, setNewMeetingReminder] = useState<TgMeetingReminders>({
        daily: false,
        in_three_hours: false,
        ten_minute: false,
        sent: false,
        meeting: newMeetingData.id
    })

    useEffect(() => {
        setNewMeetingData({
            ...newMeetingData,
            students_groups: [],
        });
    }, []);

    const handleCourseChange = (courseId: number) => {
        setAllGroups(false);
        setSelectedCourse(Courses?.results.find(course => course.course_id === courseId) || null)
    };

    const handleGroupChange = (groupId: number) => {
        setNewMeetingData(prevData => ({
            ...prevData,
            students_groups: [...prevData.students_groups, groupId],
        }));
        setShowReminderOptions(true); // Показываем опции напоминаний после выбора группы
    };

    const handleReminderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setNewMeetingReminder(prevReminder => ({
            ...prevReminder,
            [name]: checked,
        }));
    };

    const handleAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isAll = event.target.checked
        setAllGroups(isAll)
        const groupsByCourse = studentsGroups?.results.filter(group => group.course_id === selectedCourse?.course_id)
        const groupsIds = groupsByCourse?.map(group => group.group_id)
        if (isAll) {
            groupsByCourse?.map(group => {
                setNewMeetingData((prevData: SchoolMeeting) => ({
                    ...prevData,
                    students_groups: [...prevData.students_groups, group.group_id],
                }) as SchoolMeeting);
            })
            setShowReminderOptions(true)
        } else {
            setNewMeetingData((prevData: SchoolMeeting) => ({
                ...prevData,
                students_groups: prevData.students_groups.filter((id) => {
                    return !new Set(groupsIds).has(id)
                }),
            }));
        }
    };


    const handleAddMeeting = () => {
        createMeeting({
            data: newMeetingData,
            schoolName,
        })
            .unwrap()
            .then((meetingResponse) => {

                if (meetingResponse.id) {
                    // Здесь вы устанавливаете meeting_id в newMeetingReminder
                    const updatedMeetingReminder = { ...newMeetingReminder, meeting: meetingResponse.id };

                    createMeetingsReminder({
                        data: updatedMeetingReminder,
                    })
                        .unwrap()
                        .then(() => {
                            dispatch(setTotalMeetingCount(totalMeetingCount + 1));
                            setShowAddMeetingForm(false);
                        })
                        .catch((error) => {
                            console.error("Error creating meeting reminder", error);
                        });
                }
            })
    };


    return (<>
        <Dialog className={styles.modal_background} open={showAddMeetingForm} onClose={() => setShowAddMeetingForm(false)}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: '#fff',
                    border: '1px solid #3170E7',
                    // borderImageSource: 'linear-gradient(90deg, #3170E7 13.5%, #7A90F7 100%)',
                    borderRadius: '24px',
                    padding: '44px',
                },
                '& .MuiTypography-h6': {
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#332F36',
                },
                '& .MuiTypography-root': {
                    width: '100%',
                    textAlign: 'center',
                    zIndex: '2',
                },
                '& .MuiDialogContent-root': {
                    fontSize: '16px',
                    color: '#332F36',
                    padding: '0',
                    zIndex: '2',
                },
                '& .MuiInputBase-root': { //also select?
                    borderRadius: '10px',
                    border: 'none',
                    textAlign: 'start',
                },

                '& .MuiSelect-select': { //select
                    backgroundColor: '#CFE2FF',
                    borderRadius: '10px',
                },

                '& .MuiOutlinedInput-notchedOutline': { //focus select
                    border: 'none',
                    borderRadius: '10px',
                },

                '& .MuiDialogActions-root': {
                    marginTop: "24px",
                    display: 'flex',
                    gap: '6px',
                    justifyContent: 'space-between',
                    padding: '0',
                    borderRadius: '10px',
                    button: {
                        padding: '16px',
                        width: '100%',
                        zIndex: '2',
                    }
                }

            }}>
            <div className={styles.modal_ellipse}>
            </div>
            <DialogTitle>Добавить видеоконференцию</DialogTitle>
            <Typography variant="caption">Выберите дату и время видеоконференции</Typography>

            <DialogContent className={styles.modal_window} >

                <div style={{
                    marginBottom: '1rem',
                    marginTop: '1rem',
                }}>
                    <Input
                        name='datetime'
                        id="datetime-local"
                        label=""
                        type="datetime-local"
                        value={new Date().toISOString().slice(0, 16)}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        // fullWidth={true}
                        onChange={(e) =>
                            setNewMeetingData({
                                ...newMeetingData,
                                start_date: new Date(e.target.value),
                            })
                        }
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <Input
                        type='text'
                        id="title"
                        name="title"
                        placeholder="Тема видеоконференции"
                        value={newMeetingData.title}
                        onChange={(e) =>
                            setNewMeetingData({ ...newMeetingData, title: e.target.value })
                        }
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <Input
                        type='text'
                        id="description"
                        name="description"
                        placeholder="Описание видеоконференции"
                        value={newMeetingData.description}
                        onChange={(e) =>
                            setNewMeetingData({ ...newMeetingData, description: e.target.value })
                        }
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <Input
                        type='text'
                        id="link"
                        name="link"
                        placeholder="Ссылка на видеоконференцию"
                        // label="Ссылка на видеоконференцию"
                        value={newMeetingData.link}
                        // fullWidth={true}
                        onChange={(e) =>
                            setNewMeetingData({ ...newMeetingData, link: e.target.value })
                        }
                    />
                </div>
                <div>
                    <TextField
                        id="course"
                        select
                        fullWidth={true}
                        onChange={(e) => {
                            const courseId = parseInt(e.target.value);
                            handleCourseChange(courseId);
                        }}
                        value={selectedCourse?.course_id || "-1"}
                    >
                        <MenuItem value='-1' disabled>
                            Выберите курс
                        </MenuItem>
                        {Courses?.results.map(course => (
                            <MenuItem key={course.course_id} value={course.course_id}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {studentsGroups && selectedCourse &&
                    <div>
                        <Checkbox checked={allGroups} onChange={(e) => { handleAllGroups(e) }} />
                        <span><b>все группы курса</b></span>
                    </div>}
                {studentsGroups && selectedCourse && studentsGroups.results
                    .filter(group => group.course_id === selectedCourse.course_id)
                    .map(group => {
                        if (group.course_id === selectedCourse.course_id) {
                            return (
                                <div key={group.group_id}>
                                    <Checkbox
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            if (isChecked) {
                                                setNewMeetingData((prevData: SchoolMeeting) => ({
                                                    ...prevData,
                                                    students_groups: [...prevData.students_groups, group.group_id],
                                                }) as SchoolMeeting);
                                                setShowReminderOptions(true)
                                            } else {
                                                setAllGroups(false)
                                                setNewMeetingData((prevData: SchoolMeeting) => ({
                                                    ...prevData,
                                                    students_groups: prevData.students_groups.filter(
                                                        (id) => id !== group.group_id
                                                    ),
                                                }));
                                            }
                                        }}
                                        checked={new Set(newMeetingData.students_groups).has(Number(group.group_id))}
                                    />
                                    {group.name}
                                    <span> (Количество участников: {group.students.length})</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                {showReminderOptions && (
                    <div>
                        <div className={styles.reminders}>Установить телеграм напоминание за:</div>
                        <Checkbox
                            name="daily"
                            onChange={handleReminderChange}
                            checked={newMeetingReminder.daily}
                        />
                        За день
                        <Checkbox
                            name="in_three_hours"
                            onChange={handleReminderChange}
                            checked={newMeetingReminder.in_three_hours}
                        />
                        За три часа
                        <Checkbox
                            name="ten_minute"
                            onChange={handleReminderChange}
                            checked={newMeetingReminder.ten_minute}
                        />
                        За десять минут
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddMeeting} variant={'newPrimary'} text="Добавить" />
                <Button onClick={() => setShowAddMeetingForm(false)} variant={'cancel'} text="Отмена" />
            </DialogActions>
        </Dialog>
    </>)
}