import { FC } from 'react'

import { ChatI } from 'types/chatsT'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { chatsGroup } from 'config/commonSvgIconsPath'
import { getNounDeclension } from 'utils/getNounDeclension'

import styles from './chat.module.scss'

type chatUserT = {
  openGroup?: (isOpen: boolean) => void
  chatData: ChatI
  usersCount?: number
}

export const ChatUser: FC<chatUserT> = ({ openGroup, chatData, usersCount }) => {
  return (
    <div className={styles.chatUser}>
      <div>
        <div className={styles.chatUser_info}>
          <div className={styles.chatUser_avatar}>
            <IconSvg width={20} height={20} viewBoxSize="0 0 24 24" path={chatsGroup} />
          </div>
          <div>
            <div className={styles.chatUser_nameWrapper}>
              <p className={styles.chatUser_name}>{chatData?.name || 'Группа без имени'}</p>
            </div>
            <p className={styles.chatUser_lastVisit} onClick={() => openGroup && openGroup(true)}>
              {usersCount && `${usersCount} ` + getNounDeclension(usersCount, ['учатник', 'участника', 'участников'])}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
