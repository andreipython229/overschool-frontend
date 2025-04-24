import { FC } from 'react'
import styles from '../superAdmin.module.scss'
import { useCreateNewBannerMutation, useGetSchoolBannersQuery } from 'api/schoolBonusService'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import { BannerPreview } from './BannerPreview'

import { Button } from 'components/common/Button/Button'
import { useFetchStudentsGroupWithParamsQuery } from 'api/studentsGroupService'

export const NotificationBanner: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const { data: banners, isLoading, refetch } = useGetSchoolBannersQuery(schoolName)
  const { data: studentsGroups, isSuccess: groupsSuccess } = useFetchStudentsGroupWithParamsQuery({ schoolName: schoolName, params: 's=100' })
  const [createNewBanner, { isLoading: bannerCreating }] = useCreateNewBannerMutation()

  const createBanner = () => {
    const formdata = new FormData()
    formdata.append('title', 'Новый баннер')
    formdata.append('description', 'Введите текст нового баннера!')
    formdata.append('link', 'https://coursehb.ru')
    createNewBanner({ data: formdata, schoolName: schoolName })
      .unwrap()
      .then(() => refetch())
      .catch(err => console.error(err))
  }

  return (
    <div className={styles.wrapper_action}>
      {banners && studentsGroups ? (
        <div className={styles.main}>
          <div className={styles.main_banner_header} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className={styles.main_title}>Настройки баннеров объявлений для участников школы</p>
            <Button
              className={styles.main_create_banner_btn}
              disabled={bannerCreating}
              variant={'newPrimary'}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              text={'Добавить баннер'}
              onClick={createBanner}
            >
              {bannerCreating && <SimpleLoader style={{ height: '25px', width: '25px' }} />}
            </Button>
          </div>
          <div style={{ position: 'relative', overflow: 'visible', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {banners.map((banner, index) => (
              <>
                <BannerPreview banner={banner} key={banner.id} refetch={refetch} groups={studentsGroups} />
                {banners.length > index + 1 && <div style={{ width: '100%', height: 0, border: '1px #D9D9D9 solid' }}></div>}
              </>
            ))}
          </div>
        </div>
      ) : (
        <SimpleLoader />
      )}
    </div>
  )
}
