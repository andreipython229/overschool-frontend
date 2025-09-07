import { useSetSchoolMutation, useFetchSchoolQuery } from '../../../api/schoolService'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/common/Button/Button'
import { Input } from 'components/common/Input/Input/Input'
import styles from '../superAdmin.module.scss'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Path } from 'enum/pathE'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { RoleE } from 'enum/roleE'
import { role } from 'store/redux/users/slice'
import { useDispatch } from 'react-redux'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { InstagramIconPath, LinkIconPath, TelegramIconPath, VKIconPath, XIconPath, YoutubeIconPath } from '../../../assets/Icons/svgIconPath'
import { penIconPath } from './iconComponents'
import { schoolSelector } from 'selectors'

export const Main = memo(() => {
  const { schoolId } = useAppSelector(schoolSelector)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const dispatchRole = useDispatch()

  const { data, refetch } = useFetchSchoolQuery(Number(schoolId))
  const [updateDateSchoolName, { data: newName, isLoading, isSuccess, isError }] = useSetSchoolMutation()
  const [updateSchoolLink, { data: linkData, isLoading: isLoadingLink, isSuccess: isSuccessLink, isError: isErrorLink }] = useSetSchoolMutation()

  const [name, setName] = useState<string>('')
  const [isNewName, setIsNewName] = useState<boolean>(false)
  const [oldName, setOldName] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [isNewUrl, setIsNewUrl] = useState<boolean>(false)
  const [oldUrl, setOldUrl] = useState<string>('')
  const [error, setError] = useState<string>()
  const [social, setSocial] = useState<string>('')
  const [telegram, setTelegram] = useState<string>('')
  const [instagram, setInstagram] = useState<string>('')
  const [x, setX] = useState<string>('')
  const [youtube, setYoutube] = useState<string>('')
  const [vk, setVk] = useState<string>('')
  const [customSocial, setCustomSocial] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setName(data.name)
      setUrl(data.offer_url)
      setOldName(data.name)
      setOldUrl(data.offer_url)
      setSocial(data.contact_link)
      setTelegram(data.telegram_link || '')
      setInstagram(data.instagram_link || '')
      setX(data.twitter_link || '')
      setYoutube(data.youtube_link || '')
      setVk(data.vk_link || '')
      setCustomSocial(data.extra_link || '')
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
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeSocial = async () => {
    const formdata = new FormData()
    formdata.append('contact_link', social)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }
  const onChangeTelegram = async () => {
    const formdata = new FormData()
    formdata.append('telegram_link', telegram)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeInstagram = async () => {
    const formdata = new FormData()
    formdata.append('instagram_link', instagram)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeX = async () => {
    const formdata = new FormData()
    formdata.append('twitter_link', x)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeYoutube = async () => {
    const formdata = new FormData()
    formdata.append('youtube_link', youtube)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeVk = async () => {
    const formdata = new FormData()
    formdata.append('vk_link', vk)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
  }

  const onChangeCustomSocial = async () => {
    const formdata = new FormData()
    formdata.append('extra_link', customSocial)
    await updateSchoolLink({ formdata, id: Number(schoolId) })
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
      setError(`Имя школы "${name}" уже существует`)
    }
    if (isSuccessLink) {
      refetch()
    }
  }, [isSuccess, isError, isSuccessLink])

  return (
    <div className={styles.wrapper}>
      <div className={styles.main_title}>Основные настройки платформы</div>
      <div className={styles.wrapper_actions}>
        <div className={styles.main}>
          <div className={styles.main_project}>Название платформы</div>
          <div
            className={styles.main_description}
            style={{
              color: 'rgb(53, 126, 235)',
              padding: '0px',
              lineHeight: '19px',
              fontWeight: '500',
              fontSize: '12px',
            }}
          >
            Название будет подставляться в url адресах, относящихся к вашей платформе.
            <br />
            Имейте ввиду, если вы делились с кем либо url ссылками на вашу платформу - то после изменения по старым url адресам она будет не доступна!
            <br />
            Частая смена не рекомендуется!
          </div>
          <div className={styles.text}>
            <div className={styles.inputWrapper}>
              <Input className={styles.main_input} name={'name'} type={'text'} value={name} onChange={handleChangeSchoolName} />
              <div className={styles.penIcon}>
                <IconSvg width={24} height={24} viewBoxSize={'0 0 24 24'} path={penIconPath} />
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <Button
              onClick={handleOpenAlert}
              className={styles.save_button}
              // variant={isNewName && !isLoading ? 'primary' : 'disabled'}
              text={'Сохранить'}
              disabled={!isNewName || isLoading}
            />
          </div>
        </div>
      </div>
      <div className={styles.wrapper_actions}>
        <div className={styles.main}>
          <div className={styles.main_project}>Ссылка на файл публичного договора оферты</div>
          <div className={styles.text}>
            <div className={styles.inputWrapper}>
              <Input
                name={'name'}
                type={'text'}
                placeholder="Введите ссылку для договора публичной оферты"
                className={styles.main_input}
                value={url}
                onChange={handleChangeUrl}
              />
              <div className={styles.penIcon}>
                <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
              </div>
            </div>
            <Button
              onClick={onChangeUrl}
              className={styles.save_button}
              // variant={isNewUrl && !isLoadingLink ? 'primary' : 'disabled'}
              text={'Сохранить'}
              disabled={!isNewUrl || isLoadingLink}
            />
          </div>
        </div>
      </div>
      <div className={styles.wrapper_actions}>
        <div className={styles.main}>
          <div className={styles.main_project}>Ссылка для связи с руководством платформы</div>
          <div
            className={styles.main_description}
            style={{
              color: 'red',
              padding: '0px',
              lineHeight: '1.5',
              opacity: '0.6',
              fontWeight: 'bold',
              fontSize: '12px',
            }}
          >
            Обязательное поле
          </div>
          <div className={styles.text}>
            <div className={styles.inputWrapper}>
              <Input
                name={'contactUrl'}
                type={'text'}
                value={social}
                onChange={event => setSocial(event.target.value)}
                className={styles.main_input}
                placeholder="Введите ссылку для связи с руководством платформы"
              />
              <div className={styles.penIcon}>
                <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
              </div>
            </div>
            <Button
              onClick={onChangeSocial}
              className={styles.save_button}
              // variant={social && !isLoadingLink && social !== data?.contact_link ? 'primary' : 'disabled'}
              text={'Сохранить'}
              disabled={!social || isLoadingLink || social === data?.contact_link}
            />
          </div>
        </div>
      </div>
      <div className={styles.wrapper_actions}>
        <div className={styles.main}>
          <div className={styles.links}>
            <div className={styles.main_project}>Настройка ссылок для перехода</div>
            <div className={styles.text}>
              <IconSvg path={TelegramIconPath} width={28} height={24} viewBoxSize="0 0 28 24" />
              <div className={styles.inputWrapper}>
                <Input
                  name="telegram"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={telegram}
                  onChange={event => setTelegram(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button
                onClick={onChangeTelegram}
                className={styles.save_button}
                text="Сохранить"
                disabled={telegram === data?.telegram_link || isLoadingLink}
              />
            </div>

            <div className={styles.text}>
              <IconSvg path={InstagramIconPath} width={32} height={32} viewBoxSize="0 0 32 32" />
              <div className={styles.inputWrapper}>
                <Input
                  name="instagram"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={instagram}
                  onChange={event => setInstagram(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button
                onClick={onChangeInstagram}
                className={styles.save_button}
                text="Сохранить"
                disabled={instagram === data?.instagram_link || isLoadingLink}
              />
            </div>

            <div className={styles.text}>
              <IconSvg path={XIconPath} width={28} height={28} viewBoxSize="0 0 28 28" />
              <div className={styles.inputWrapper}>
                <Input
                  name="x"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={x}
                  onChange={event => setX(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button onClick={onChangeX} className={styles.save_button} text="Сохранить" disabled={x === data?.twitter_link || isLoadingLink} />
            </div>

            <div className={styles.text}>
              {/*<YoutubeIcon/>*/}
              <IconSvg path={YoutubeIconPath} width={32} height={32} viewBoxSize="0 0 32 32" />
              <div className={styles.inputWrapper}>
                <Input
                  name="youtube"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={youtube}
                  onChange={event => setYoutube(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button
                onClick={onChangeYoutube}
                className={styles.save_button}
                text="Сохранить"
                disabled={youtube === data?.youtube_link || isLoadingLink}
              />
            </div>

            <div className={styles.text}>
              <IconSvg path={VKIconPath} width={28} height={28} viewBoxSize="0 0 28 28" />
              <div className={styles.inputWrapper}>
                <Input
                  name="vk"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={vk}
                  onChange={event => setVk(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button onClick={onChangeVk} className={styles.save_button} text="Сохранить" disabled={vk === data?.vk_link || isLoadingLink} />
            </div>

            <div className={styles.text}>
              <IconSvg path={LinkIconPath} width={32} height={30} viewBoxSize="0 0 32 30" />
              <div className={styles.inputWrapper}>
                <Input
                  name="custom"
                  type="text"
                  placeholder="Введите ссылку"
                  className={styles.main_input}
                  value={customSocial}
                  onChange={event => setCustomSocial(event.target.value)}
                />
                <div className={styles.penIcon}>
                  <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={penIconPath} />
                </div>
              </div>
              <Button
                onClick={onChangeCustomSocial}
                className={styles.save_button}
                text="Сохранить"
                disabled={customSocial === data?.extra_link || isLoadingLink}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={alertOpen} onClose={handleCloseAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Вы действительно хотите изменить название платформы "${oldName}" на "${name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {' После нажатия на кнопку "Подтвердить", вы будете перенаправлены на страницу выбора платформы, продолжить?'}
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
