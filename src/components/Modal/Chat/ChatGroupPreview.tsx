import { FC, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { ChatI, SenderI } from 'types/chatsT'
import { getNounDeclension } from 'utils/getNounDeclension'

import { backArr } from 'components/Previous/config/svgIconPath'

import styles from './chat.module.scss'

type chatGroupPreviewT = {
  closeGroup: (isOpen: boolean) => void
  usersList: SenderI[]
  chatData: ChatI
}

export const ChatGroupPreview: FC<chatGroupPreviewT> = ({ closeGroup, usersList, chatData }) => {
  const [users, setUsers] = useState<SenderI[]>()

  useEffect(() => {
    usersList && setUsers(usersList)
  }, [usersList])

  return (
    <div className={styles.chatGroup}>
      <div className={styles.chatGroup_header}>
        <div>
          <div className={styles.chatGroup_header_info} onClick={() => closeGroup && closeGroup(false)}>
            <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
            <span>Чат</span>
          </div>
          <div className={styles.chatGroup_header_preview}>
            <span>{chatData.name || 'Группа без имени '}</span>
            <span>{usersList && `- ${usersList.length + 1} ${getNounDeclension(usersList.length + 1, ['учатник', 'участника', 'участников'])}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.chatGroup_content}>
        <div className={styles.chatGroup_content_track}>
          {users?.map(sender => (
            <div key={sender.id} className={styles.chatGroup_content_user}>
              <div className={styles.chatGroup_content_user_info}>
                <div className={styles.chatGroup_content_user_avatar}>
                  {sender?.avatar ? (
                    <img src={`${window.appConfig.imagePath}${sender.avatar}`} alt="avatar" />
                  ) : (
                    `${sender?.first_name[0] || 'Б'}${sender?.last_name[0] || 'И'}`
                  )}
                </div>
                <div>
                  {sender.first_name || 'Без'} {sender.last_name || 'Имени'}
                </div>
              </div>
              <Button text="Отправить сообщение" variant="primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
