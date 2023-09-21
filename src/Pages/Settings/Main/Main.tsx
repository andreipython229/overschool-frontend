import { useSetSchoolMutation, useFetchSchoolQuery } from "../../../api/schoolService";
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from 'components/common/Button/Button'
import {Input} from 'components/common/Input/Input/Input'

import styles from '../superAdmin.module.scss'

export const Main = memo(() => {
  const schoolId = localStorage.getItem("school_id")

  const {data } = useFetchSchoolQuery(Number(schoolId))
  const [updateDateSchoolName, { data: newName, isLoading, isSuccess }] = useSetSchoolMutation()

  const [name, setName] = useState<string>('')
  const [isNewName, setIsNewName] = useState<boolean>(false)
  const [oldName, setOldName] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [isNewUrl, setIsNewUrl] = useState<boolean>(false)
  const [oldUrl, setOldUrl] = useState<string>('')

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setName(data?.name)
      setUrl(data?.offer_url)
      setOldName(data?.name)
      setOldUrl(data?.offer_url)
    }
  }, [data])

  const handleChangeSchoolName = (event: ChangeEvent<HTMLInputElement>) => {
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
    formdata.append('name', oldName)
    formdata.append('offer_url', url)
    setIsNewUrl(false)
    await updateDateSchoolName({ formdata, id: Number(schoolId) })
  }

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("school", name)
      navigate(`/school/${name}/settings`)
    }
  },[isSuccess])

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.main}>
        <div className={styles.main_title}>Основные настройки школы</div>
        <div className={styles.main_project}>Название школы</div>
        <div className={styles.main_description} style={{color: 'red', padding: '0px', lineHeight: '1.5', fontSize: '12px'}}>
          Название будет подставляться в url адресах относящихся к вашей школе.<br/>
          Имейте ввиду, если вы делились с кем либо url ссылками на вашу школу - то после изменения по старым url адресам она будет не доступна!!!<br />
          Частая смена не рекомендуется!!!</div>
        <div>
          <Input name={'name'} type={'text'} style={{width: '320px', paddingBottom: '10px'}} value={name} onChange={handleChangeSchoolName}/>
          <Button onClick={onChangeProjectName} style={{width: '120px'}} variant={isNewName && !isLoading ? 'primary' : 'disabled'}
                            text={'Сохранить'} disabled={!isNewName || isLoading} />
        </div>
        <div><br/></div>
        <hr />
        <div className={styles.main_project}>Ссылка на файл публичного договора оферты</div>
        <div>
          <Input name={'name'} type={'text'} style={{width: '320px', paddingBottom: '10px'}} value={url} onChange={handleChangeUrl}/>
          <Button onClick={onChangeUrl} style={{width: '120px'}} variant={isNewUrl && !isLoading ? 'primary' : 'disabled'}
                            text={'Сохранить'} disabled={!isNewUrl || isLoading}/>
        </div>
      </div>
    </div>
  )
})
