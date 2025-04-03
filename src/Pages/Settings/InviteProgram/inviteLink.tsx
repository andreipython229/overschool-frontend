import { IInviteProgramResp } from 'api/apiTypes'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Portal } from 'components/Modal/Portal'
import { arrowDownPoligonPath } from 'config/commonSvgIconsPath'
import { useBoolean } from 'customHooks'
import { FC, useEffect, useState } from 'react'
import { studentsGroupT } from 'types/studentsGroup'
import styles from '../NotificationBannerSettings/Banner.module.scss'
import { InvitesProgramGroups } from 'components/Modal/InvitesProgramGroups'
import { Input } from 'components/common/Input/Input/Input'
import { useDeleteInvitesProgramLinkMutation, useUpdateInvitesProgramMutation } from 'api/schoolService'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { CheckboxBall } from 'components/common/CheckboxBall'
import { useAppDispatch } from 'store/hooks'
import { clearInviteProgramData, setInviteProgram } from 'store/redux/inviteProgram/inviteProgramSlice'

interface ILinkIvitation {
  linkData: IInviteProgramResp
  schoolName: string
  refetch: () => void
  groups: studentsGroupT
}

export const InviteLink: FC<ILinkIvitation> = ({ linkData, schoolName, refetch, groups }) => {
  const [linkState, setLinkState] = useState<IInviteProgramResp>(linkData)
  const [show, { on: closeModal, off: openModal }] = useBoolean(false)
  const [updateLinkData, { isLoading: updating }] = useUpdateInvitesProgramMutation()
  const [deleteLink, { isLoading: deleting }] = useDeleteInvitesProgramLinkMutation()
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLinkState(linkData)
  }, [linkData])

  const handleDelete = () => {
    if (schoolName) {
      deleteLink({ id: linkState.id, schoolName })
        .unwrap()
        .then(() => {
          dispatch(clearInviteProgramData())
          refetch()
        })
    }
  }

  const updateLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setLinkState(prevState => ({ ...prevState, link: event.target.value }))
  }

  const updateActive = () => {
    setLinkState(prevState => ({ ...prevState, is_active: !linkState.is_active }))
  }

  const handleSave = () => {
    if (linkState.link.length > 0) {
      const formdata = new FormData()
      formdata.append('is_active', String(linkState.is_active))
      formdata.append('link', linkState.link)
      updateLinkData({ schoolName: schoolName, id: linkState.id, data: formdata })
        .unwrap()
        .then(data => {
          dispatch(setInviteProgram(data))
          refetch()
        })
    } else {
      setError('Ссылка не может быть пустой')
    }
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '14px',
        background: '#ffffff',
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {(updating || deleting) && <LoaderLayout />}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CheckboxBall isChecked={linkState.is_active} toggleChecked={updateActive} />
        <span style={{ fontWeight: '800', color: 'gray' }}>{linkState.is_active ? 'Активная ссылка' : 'Неактивная ссылка'}</span>
      </div>

      <label htmlFor="link" style={{ fontWeight: '600', fontSize: '14px', marginBottom: '-0.75rem', color: 'black' }}>
        Ссылка:
      </label>
      <Input value={linkState.link} onChange={updateLink} id="link" name="link" type="text" placeholder="Введите ссылку-приглашение..." />
      {error.length > 0 && <span style={{ color: 'red', fontSize: '12px', marginTop: '-0.75rem' }}>{error}</span>}
      {groups && (
        <>
          <div className={styles.wrapper_content_groups}>
            <span style={{ fontWeight: '600', fontSize: '14px', color: 'black' }}>Группы в которых будет отображена эта ссылка:</span>
            <div className={styles.banner_groups_btn_cont}>
              <Button text={'Выберите одну или несколько групп'} variant="newLogIn" onClick={openModal} className={styles.banner_groups_btn}>
                <IconSvg width={14} height={15} viewBoxSize="0 0 14 15" path={arrowDownPoligonPath} />
              </Button>
            </div>

            {show && (
              <Portal closeModal={closeModal}>
                <InvitesProgramGroups refetch={refetch} schoolName={schoolName} setShowModal={closeModal} groups={groups} invite={linkData} />
              </Portal>
            )}
          </div>
          <div className={styles.wrapper_buttons}>
            <Button
              style={{ padding: '17px 40px' }}
              onClick={handleSave}
              text="Сохранить"
              variant={JSON.stringify(linkData) === JSON.stringify(linkState) ? 'newDisabled' : 'newPrimary'}
              disabled={JSON.stringify(linkData) === JSON.stringify(linkState)}
            />
            <Button style={{ padding: '15px 40px' }} onClick={handleDelete} text="Удалить" variant={'cancel'} />
          </div>
        </>
      )}
    </div>
  )
}
