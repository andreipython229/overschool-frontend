import React, { FC, useEffect, useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import { useFetchCoursesQuery } from "../../../api/coursesServices";
import MenuItem from "@mui/material/MenuItem";
import { CoursesDataT } from "../../../types/CoursesT";
import { useLazyFetchStudentsGroupQuery } from "../../../api/studentsGroupService";
import { useFetchSchoolHeaderQuery } from "../../../api/schoolHeaderService";
import { useCreateMeetingMutation, useUpdateMeetingMutation, useFetchAllMeetingsQuery, useDeleteMeetingMutation } from "../../../api/meetingsService";
import { useCreateMeetingsRemindersMutation } from "api/tgNotificationsServices";
import Timer from "../../Timer/Timer";
import { TgMeetingReminders } from "types/tgNotifications";
import { Button } from 'components/common/Button/Button'
import styles from './chatList.module.scss';
import { SchoolMeeting } from "../../../types/schoolMeetingsT";
import { RootState } from "../../../store/redux/store";
import { setTotalMeetingCount } from "../../../store/redux/meetings/meetingSlice";
import { Input } from 'components/common/Input/Input/Input'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

interface Chat {
  order: number;
  chat_name: string;
}

interface ChatData {
  [id: number]: Chat;
}

interface ChatListProps {
  showChatListForm: boolean;
  setShowChatListForm: (show: boolean) => void;
  chatData: ChatData;
  selectedChatId: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, chatId: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, chatId: number) => void;
  handleDragEnd: () => void;
  selectChat: (chatId: number | undefined) => void;
  handleDeleteChat: (chatId: number) => void;
  isCreatingChatDisabled: boolean;
  handleCreateChat: () => void;

}

export const ChatList: FC<ChatListProps> = ({ showChatListForm, setShowChatListForm, chatData, selectedChatId, handleDragOver, handleDragStart, handleDragEnd, selectChat, handleDeleteChat, isCreatingChatDisabled, handleCreateChat }) => {
  const activeChatRef = useRef<HTMLDivElement | null>(null);
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null);
  // const schoolName = window.location.href.split('/')[4];
  // const { role } = useAppSelector(selectUser)
  // const [showReminderOptions, setShowReminderOptions] = useState(false);
  // const [fetchGroups, { data: studentsGroups, isSuccess: groupsSuccess }] = useLazyFetchStudentsGroupQuery();
  // const { data: Courses, isSuccess: coursesSuccess } = useFetchCoursesQuery(schoolName);
  // const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null);
  // const [allGroups, setAllGroups] = useState<boolean>(false);
  // const dispatch = useDispatch();
  // const [createMeeting, { isLoading, error }] = useCreateMeetingMutation();
  // const [updateMeeting] = useUpdateMeetingMutation();
  // const [createMeetingsReminder] = useCreateMeetingsRemindersMutation();
  // const [isEditMode, setIsEditMode] = useState(false);

  // const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount);

  // const [newMeetingData, setNewMeetingData] = useState<SchoolMeeting>({
  //   id: 0,
  //   students_groups: [],
  //   link: '',
  //   start_date: new Date(),
  //   title: '',
  //   description: '',
  // });


  const handleCloseModal = () => {
    setShowChatListForm(false);
  }

  return (<>
    <Dialog className={styles.modal_background} open={showChatListForm} onClose={() => setShowChatListForm(false)}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: '10px 10px 50px 10px',
          width: '70%',
        },
        '& .MuiDialogContent-root': {
          padding: '0',
        },
        '& .MuiTypography-root': {
          margin: '0 auto',
        },
      }}
    >

      <DialogContent className={styles.modal_close}>
        <Button className={styles.modal_close_btn} text='' onClick={handleCloseModal}>
          <div className={styles.modal_close_btn_cross}></div>
        </Button>
      </DialogContent>



      {/* <DialogTitle>{!isEditMode ? 'Добавить видеоконференцию' : 'Редактировать видеоконференцию'}</DialogTitle> */}
      <Typography className={styles.modal_header_text}>История чатов</Typography>



      <DialogContent className={styles.modal_list} >
        <button className={styles.createChatButtonModal} onClick={() => { handleCreateChat(); setShowChatListForm(false) }} disabled={isCreatingChatDisabled}>Создать новый чат
        </button>
        <div className={styles.modal_list_scroll} >
          {Object.entries(chatData)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([chatId, chatValue]) => {
              const isActive = selectedChatId === Number(chatId);
              return (
                <div key={chatId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, Number(chatId))}
                  onDragOver={(e) => handleDragOver(e, Number(chatId))}
                  onDragEnd={handleDragEnd}
                  className={` ${styles.chatListItemWrapper}`}
                >
                  <div
                    onClick={() => {
                      selectChat(Number(chatId));
                      setShowChatListForm(false);
                    }}
                    ref={isActive ? activeChatRef : null}
                    className={`${draggedOverChatId === Number(chatId) ? styles.draggedOver : ''} ${styles.chatListItem} ${selectedChatId === Number(chatId) ? styles.activeChat : ''}`}
                    style={{ borderRadius: '20px' }}
                  >
                    <div className={styles.chatListItem_Circle}></div>
                    <span className={styles.centeredText}>
                      {`${chatValue.chat_name.length > 25 ? chatValue.chat_name.substring(0, 25) + '...' : chatValue.chat_name}`}
                    </span>
                  </div>
                  <button className={styles.deleteChatBtn} onClick={(e) => {
                    // e.stopPropagation(); // Предотвращаем всплытие события
                    handleDeleteChat(Number(chatId));
                  }}>
                    <div className={styles.close_cross}></div>
                  </button>
                </div>
              )
            }
            )}
        </div>
      </DialogContent>
    </Dialog>
  </>)
}