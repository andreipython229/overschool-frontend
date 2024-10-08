import { FC, memo, useState, ChangeEvent, useEffect } from 'react'
import { useLocation, Location } from 'react-router-dom'

import { GlobalPreviousT } from '../../../types/componentsTypes'
import { Path } from '../../../enum/pathE'
import { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } from 'api/schoolHeaderService'
import { Button } from '../../common/Button/Button'
import { schoolHeaderReqT } from 'types/schoolHeaderT'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { noAvatar } from 'assets/img/common'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { RoleE } from 'enum/roleE'

import styles from '../previou.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import zIndex from '@mui/material/styles/zIndex'
import {  courseLogo } from '../../../assets/img/common/index'


export const GlobalPrevious: FC<GlobalPreviousT> = memo(() => {
  const user = useAppSelector(selectUser)

  const { pathname }: Location = useLocation()
  const headerId = localStorage.getItem('header_id')
  const { data, isSuccess, isFetching, isError, isLoading } = useFetchSchoolHeaderQuery(Number(headerId))
  const [setSchoolHeader] = useSetSchoolHeaderMutation()

  const [edit, setEdit] = useState<boolean>(false)
  const [fileError, setFileError] = useState<string>('')

  const [schoolHeaderData, setSchoolHeaderData] = useState<schoolHeaderReqT>({
    name: '',
    description: '',
    logo_header: '',
    photo_background: '',
  })

  const [schoolHeaderDataToRender, setSchoolHeaderDataToRender] = useState({
    logo_school: '',
    photo_background: '',
  })

  const handleChangePrevious = () => {
    setEdit(!edit)
  }

  const onChangeSchoolHeader = () => {
    const formdata = new FormData()

    Object.entries(schoolHeaderData).forEach(([key, value]) => {
      value && formdata.append(key, value)
    })

    setSchoolHeader({ formdata, id: Number(headerId) })
    setEdit(false)
  }

  const handleChangeSchoolHeaderData = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const target = e.target

    if (target.files && target.files[0]) {
      if (target.files[0].size <= 7 * 1024 * 1024) {
        const url = URL.createObjectURL(target.files[0])
        setSchoolHeaderDataToRender({ ...schoolHeaderDataToRender, [target.name]: url })
        setSchoolHeaderData({ ...schoolHeaderData, [target.name]: target.files[0] })
      } else {
        setFileError('Допустимый размер файла не должен превышать 7 МБ')
      }
    } else {
      setSchoolHeaderData({ ...schoolHeaderData, [target.name]: target.value })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const { name, description, photo_background, logo_school } = data

      setSchoolHeaderData({
        ...schoolHeaderData,
        name,
        description,
      })

      setSchoolHeaderDataToRender({ logo_school: logo_school, photo_background: photo_background })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (pathname !== Path.InitialPage + Path.Courses) {
      setEdit(false)
    }
  }, [pathname])

  const { name: headerName, description: headerDes } = schoolHeaderData
  const { photo_background, logo_school } = schoolHeaderDataToRender
  const changedBg = photo_background
    ? {
        backgroundImage: `url(${photo_background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        ObjectFit: 'fill',
        zIndex: 2,
      }
    : { backgroundColor: 'rgba(51, 47, 54, 0.5)' }

  return (
    <>
      {fileError && <p className={styles.previous_error}>{fileError}</p>}
      <div className={styles.previous}>
        <div className={styles.previous} style={changedBg} />
        <div>
          {isFetching && (
            <div className={styles.previous_loader}>
              <SimpleLoader style={{ width: '50px', height: '50px' }} />
            </div>
          )}
          {edit && (
            <label className={styles.label_input_background_image}>
              <span>Изменить фон секции</span>
              <input
                className={styles.input_background_image}
                type="file"
                name="photo_background"
                value={''}
                onChange={handleChangeSchoolHeaderData}
              />
            </label>
          )}
          {edit && (
            <input
              className={`${styles.previous_avatar} ${styles.input_change} ${styles.hide_input}`}
              name="logo_school"
              type="file"
              value={''}
              onChange={handleChangeSchoolHeaderData}
            />
          )}

          <img className={styles.previous_avatar} src={courseLogo || noAvatar} alt={headerName} />
          <div className={styles.previous_infoBlock}>
            <div className={styles.previous_infoBlock_title}>
              {edit ? (
                <input
                  className={`${styles.previous_infoBlock_title_name} ${styles.input_change}`}
                  name="description"
                  type="text"
                  value={headerDes}
                  onChange={handleChangeSchoolHeaderData}
                />
              ) : (
                <p className={styles.previous_infoBlock_title_name}>{headerDes}</p>
              )}
              {/* {edit ? (
                <input
                  className={`${styles.previous_infoBlock_title_name} ${styles.input_change}`}
                  name="name"
                  type="text"
                  value={headerName}
                  onChange={handleChangeSchoolHeaderData}
                />
              ) : (
                <p className={styles.previous_infoBlock_title_name}>
                  <strong>{headerName}</strong>
                </p>
              )} */}
            </div>
          </div>
          {user.role === RoleE.Admin && (
            <div className={styles.previous_btn} onClick={edit ? onChangeSchoolHeader : handleChangePrevious}>
              <IconSvg path={settingsIconPath} viewBoxSize="0 0 24 24" height={24} width={24} />
              {/* <Button
            variant={isFetching || isError || isLoading ? 'disabled' : 'primary'}
            disabled={isFetching || isError || isLoading}
            style={{
              width: '220px',
              fontSize: '10px',
              fontWeight: '800',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
            text={edit ? 'Завершить настройку курсов' : 'Настроить страницу курсов'}
            onClick={edit ? onChangeSchoolHeader : handleChangePrevious}
          /> */}
            </div>
          )}
        </div>
      </div>
    </>
  )
})
