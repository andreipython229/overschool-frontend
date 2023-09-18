import { FC } from 'react'
import parse from 'html-react-parser'

import { UserHomeworkCheck } from 'types/homeworkT'
import { convertDate } from 'utils/convertDate'
import { iocnsByStatus } from 'components/HomeworksStatsTable/config/iocnsByStatus'
import { AudioFile } from 'components/AudioFile/index'
import { UploadedFile } from 'components/UploadedFile'

import styles from './userHomeworkHistory.module.scss'
import modalStyles from '../Modal/ModalCheckHomeWork/modal_check_home_work.module.scss'

type userHomeworkHistoryT = {
  homework: UserHomeworkCheck
}

export const UserHomeworkHistory: FC<userHomeworkHistoryT> = ({ homework }) => {
  const { mmddyyyy, hoursAndMinutes } = convertDate(new Date(homework?.updated_at || ''))

  return (
    <div className={styles.history}>
      <div className={styles.history_header}>
        <div className={styles.history_header_info}>
          <div className={styles.history_header_avatar}>
            {homework?.profile_avatar ? (
              <img src={homework.profile_avatar} alt="avatar" />
            ) : (
              `${homework?.author_last_name.charAt(0) || 'б'}${homework?.author_first_name.charAt(0) || 'и'}`
            )}
          </div>
          <div className={styles.history_header_text}>
            <p className={styles.history_header_username}>
              {homework?.author_last_name || 'Без'} {homework?.author_first_name || 'имени'}
            </p>
            <p className={styles.history_header_time}>
              {mmddyyyy} в {hoursAndMinutes}
            </p>
          </div>
        </div>
        <div className={styles.history_header_status}>
          <div>{iocnsByStatus[homework?.status as string]?.icon}</div>
          <span>{homework?.status}</span>
        </div>
      </div>
      <div className={styles.history_message_block}>
        <div className={styles.history_message}>
          <div className={styles.history_message_content}>
            <p>{parse(homework?.text || '')}</p>
            <div style={{ maxWidth: '500px' }}>
              <div>
                {homework?.text_files.map((file, index) => (
                  <UploadedFile key={file.id} index={index} name={file.file_url} file={`${file.file_url}`} size={1000} />
                ))}
              </div>
              <div className={modalStyles.task_modal_audio}>
                {homework?.audio_files.map(file => (
                  <AudioFile key={file.id} audioUrl={`${file.file_url}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
