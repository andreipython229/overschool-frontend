import { useCreateInvitesProgramLinkMutation, useFetchInvitesProgramQuery } from 'api/schoolService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { FC } from 'react'
import { schoolSelector } from 'selectors'
import { useAppSelector } from 'store/hooks'
import styles from './inviteProgram.module.scss'
import { Button } from 'components/common/Button/Button'
import { InviteLink } from './inviteLink'
import { useFetchStudentsGroupWithParamsQuery } from 'api/studentsGroupService'

export const SettingsInvitesProgram: FC = () => {
  const { schoolName } = useAppSelector(schoolSelector)
  const { data: inviteData, refetch } = useFetchInvitesProgramQuery(schoolName)
  const [createLink, { isLoading: linkCreating }] = useCreateInvitesProgramLinkMutation()
  const { data: studentsGroups } = useFetchStudentsGroupWithParamsQuery({ schoolName: schoolName, params: 's=100' })

  const createNewLink = () => {
    if (schoolName) {
      createLink({ link: '', schoolName: schoolName })
        .unwrap()
        .then(() => refetch())
    }
  }

  if (!inviteData || !studentsGroups || linkCreating) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_head}>
        <p className={styles.main_title}>Настройка ссылки на инвайт программу</p>
        {inviteData.length === 0 && (
          <Button
            className={styles.main_create_banner_btn}
            disabled={linkCreating}
            variant={'newPrimary'}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            text={'Создать ссылку'}
            onClick={createNewLink}
          />
        )}
      </div>
      <div className={styles.main_body}>
        {inviteData.map(invite => (
          <InviteLink linkData={invite} key={invite.id} refetch={refetch} groups={studentsGroups} schoolName={schoolName} />
        ))}
      </div>
    </div>
  )
}
