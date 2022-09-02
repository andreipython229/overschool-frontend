import { FC, memo, useState, ChangeEvent, useEffect } from 'react'
import { useLocation, Location } from 'react-router-dom'

// import { useAppSelector } from '../../../../store/hooks'
// import { RootState } from '../../../../store/redux/store'
import { Path } from '../../../enum/pathE'
import { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } from 'api/schoolHeaderService'
import { Button } from '../../common/Button/Button'
import { schoolHeaderReqT } from '../../../types/schoolHeaderT'

import noAvatar from '../../../assets/img/noAvatar.svg'

import styles from '../previou.module.scss'

type GlobalPreviousT = {
  avatar: string
  description?: string
  name: string
  about?: string
  buttonText?: string
  onClick?: () => void
}

export const GlobalPrevious: FC<GlobalPreviousT> = memo(({ avatar, name, about, description /*onClick, buttonText*/ }) => {
  // const role = useAppSelector((state: RootState) => state.user.permission)

  const { pathname }: Location = useLocation()
  const [edit, setEdit] = useState<boolean>(false)

  const { data, isSuccess } = useFetchSchoolHeaderQuery(3)

  console.log(data)
  const [schoolHeaderData, setSchoolHeaderData] = useState<schoolHeaderReqT>({
    name: '',
    description: '',
    photo_logo: '',
    photo_background: '',
  })

  const [setSchoolHeader] = useSetSchoolHeaderMutation()

  const handleChangePrevious = () => {
    setEdit(!edit)
  }

  useEffect(() => {
    if (isSuccess) {
      setSchoolHeaderData({
        ...schoolHeaderData,
        name: data.name,
        description: data.description,
      })
    }
  }, [isSuccess])

  const onChangeSchoolHeader = () => {
    const formData = new FormData()

    Object.entries(schoolHeaderData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    setSchoolHeader({formData, id: 3})
    handleChangePrevious()
  }

  const handleChangeSchoolHeaderData = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files && target.files[0]) {
      // const url = URL.createObjectURL(target.files[0])

      setSchoolHeaderData({ ...schoolHeaderData, [target.name]: target.files[0] })
    } else {
      setSchoolHeaderData({ ...schoolHeaderData, [target.name]: target.value })
    }
  }

  const { name: headerName, description: headerDes, photo_background, photo_logo } = schoolHeaderData
  const isMatchPath = pathname === '/' + Path.InitialPage + Path.Courses

  const changedBg = photo_background
    ? {
        background: `url(${photo_background}) no-repeat center center`,
        backgroundSize: 'cover',
      }
    : { background: '#e0dced' }

  return (
    <div className={styles.previous} style={changedBg}>
      {edit && (
        <label className={styles.label_input_background_image}>
          <span>Изменить фон секции</span>
          <input className={styles.input_background_image} type="file" name="photo_background" value={''} onChange={handleChangeSchoolHeaderData} />
        </label>
      )}
      <div className={styles.previous_infoBlock}>
        {edit && (
          <input
            className={`${styles.previous_infoBlock_avatar} ${styles.input_change} ${styles.hide_input}`}
            name="photo_logo"
            type="file"
            value={''}
            onChange={handleChangeSchoolHeaderData}
          />
        )}

        <img className={styles.previous_infoBlock_avatar} src={photo_logo || noAvatar} alt="" />
        <div className={styles.previous_infoBlock_title}>
          {edit ? (
            <input
              className={`${styles.previous_infoBlock_title_description} ${styles.input_change}`}
              name="description"
              type="text"
              value={headerDes}
              onChange={handleChangeSchoolHeaderData}
            />
          ) : (
            <p className={styles.previous_infoBlock_title_description}>{headerDes} </p>
          )}
          {edit ? (
            <input
              className={`${styles.previous_infoBlock_title_name} ${styles.input_change}`}
              name="name"
              type="text"
              value={headerName}
              onChange={handleChangeSchoolHeaderData}
            />
          ) : (
            <span className={styles.previous_infoBlock_title_name}>{headerName}</span>
          )}
          <p className={styles.previous_infoBlock_title_about}>{about}</p>
        </div>
      </div>
      <div className={styles.previous_btn}>
        {isMatchPath && (
          <Button
            variant="primary"
            style={{
              width: '220px',
              fontSize: '10px',
              fontWeight: '800',
            }}
            text={edit ? 'Завершить настройку курсов' : 'Настроить страницу курсов'}
            onClick={edit ? onChangeSchoolHeader : handleChangePrevious}
          />
        )}
      </div>
    </div>
  )
})
