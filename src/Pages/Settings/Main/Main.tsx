import { useSetSchoolMutation, useFetchSchoolQuery } from '../../../api/schoolService'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/common/Button/Button'
import { Input } from 'components/common/Input/Input/Input'

import styles from '../superAdmin.module.scss'
import { useAppDispatch } from 'store/hooks'
import { Path } from 'enum/pathE'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { RoleE } from 'enum/roleE'
import { role } from 'store/redux/users/slice'
import { useDispatch } from 'react-redux'

export const Main = memo(() => {
  const schoolId = localStorage.getItem('school_id')
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const dispatchRole = useDispatch()

  const { data } = useFetchSchoolQuery(Number(schoolId))
  const [updateDateSchoolName, { data: newName, isLoading, isSuccess, isError }] = useSetSchoolMutation()

  const [name, setName] = useState<string>('')
  const [isNewName, setIsNewName] = useState<boolean>(false)
  const [oldName, setOldName] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [isNewUrl, setIsNewUrl] = useState<boolean>(false)
  const [oldUrl, setOldUrl] = useState<string>('')
  const [error, setError] = useState<string>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setName(data?.name)
      setUrl(data?.offer_url)
      setOldName(data?.name)
      setOldUrl(data?.offer_url)
    }
  }, [data])

  const handleChangeSchoolName = (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setName(event.currentTarget.value)
  }

  useEffect(() => {
    setIsNewName(name !== oldName)
  }, [name])

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value)
    setIsNewUrl(true)
  }

  useEffect(() => {
    setIsNewUrl(url !== oldUrl)
  }, [url])

  const onChangeProjectName = async () => {
    const formdata = new FormData()
    formdata.append('name', name)
    setIsNewName(false)
    await updateDateSchoolName({ formdata, id: Number(schoolId) })
  }

  const onChangeUrl = async () => {
    const formdata = new FormData()
    formdata.append('offer_url', url)
    setIsNewUrl(false)
    await updateDateSchoolName({ formdata, id: Number(schoolId) })
  }

  const handleCloseAlert = () => {
    setAlertOpen(false)
  }

  const handleOpenAlert = () => {
    setAlertOpen(true)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatchRole(role(RoleE.Unknown))
      navigate(Path.ChooseSchool)
    }
    if (isError) {
      handleCloseAlert()
      setError('Такое имя школы уже существует')
    }
  }, [isSuccess, isError])

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.main}>
        <div className={styles.main_title}>Основные настройки школы</div>
        <div className={styles.main_project}>Название школы</div>
        <div
          className={styles.main_description}
          style={{ color: 'red', padding: '0px', lineHeight: '1.5', opacity: '0.6', fontWeight: 'bold', fontSize: '12px' }}
        >
          Название будет подставляться в url адресах относящихся к вашей школе.
          <br />
          Имейте ввиду, если вы делились с кем либо url ссылками на вашу школу - то после изменения по старым url адресам она будет не доступна!
          Частая смена не рекомендуется!
        </div>
        <div>
          <Input name={'name'} type={'text'} style={{ maxWidth: '320px', paddingBottom: '10px' }} value={name} onChange={handleChangeSchoolName} />
          {error && <p className={styles.error}>{error}</p>}
          <Button
            onClick={handleOpenAlert}
            style={{ width: '120px' }}
            variant={isNewName && !isLoading ? 'primary' : 'disabled'}
            text={'Сохранить'}
            disabled={!isNewName || isLoading}
          />
        </div>
        <div>
          <br />
        </div>
        <hr />
        <div className={styles.main_project}>Ссылка на файл публичного договора оферты</div>
        <div>
          <Input name={'name'} type={'text'} style={{ maxWidth: '320px', paddingBottom: '10px' }} value={url} onChange={handleChangeUrl} />
          <Button
            onClick={onChangeUrl}
            style={{ width: '120px' }}
            variant={isNewUrl && !isLoading ? 'primary' : 'disabled'}
            text={'Сохранить'}
            disabled={!isNewUrl || isLoading}
          />
        </div>
      </div>
      <Dialog open={alertOpen} onClose={handleCloseAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Вы действительно хотите изменить название школы "${oldName}" на "${name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {' После нажатия на кнопку "Подтвердить", вы будете перенаправлены на страницу выбора школы, продолжить?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} text={'Отмена'} variant={'secondary'} />
          <Button onClick={onChangeProjectName} autoFocus text={'Подтвердить'} variant={'primary'} />
        </DialogActions>
      </Dialog>
    </div>
  )
})
