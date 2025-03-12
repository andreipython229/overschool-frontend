import { ChangeEvent, memo, useEffect, useState } from 'react'
import { LogoAddBlock } from '../DecorPlatform/LogoAddBlock/LogoAddBlock'
import styles from '../superAdmin.module.scss'
import { useLazyFetchSchoolDocumentQuery, useUpdateSchoolDocumentsMutation } from 'api/schoolService'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

export const Passport = memo(() => {
  const [fetchDocs, { data: documentsData }] = useLazyFetchSchoolDocumentQuery()
  const [updateDocs] = useUpdateSchoolDocumentsMutation()
  const { schoolId } = useAppSelector(schoolSelector)
  const schoolName = window.location.href.split('/')[4]

  const [stampUrl, setStampUrl] = useState<string>('')
  const [signUrl, setSignUrl] = useState<string>('')

  const [stampError, setStampError] = useState<string>('')
  const [signError, setSignError] = useState<string>('')

  useEffect(() => {
    if (schoolName) {
      fetchDocs(schoolName)
    }
  }, [])

  useEffect(() => {
    if (documentsData && documentsData[0]) {
      documentsData[0].stamp && setStampUrl(documentsData[0].stamp)
      documentsData[0].signature && setSignUrl(documentsData[0].signature)
    }
  }, [documentsData])

  const onChangeStamp = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files) {
      const formdata = new FormData()
      formdata.append('stamp', target.files[0])
      formdata.append('school', String(schoolId))
      console.log(target.files[0])
      if (target.files[0].size <= 2 * 1024 * 1024) {
        const url = URL.createObjectURL(target.files[0])
        setStampUrl(url)
        documentsData[0] && (await updateDocs({ id: documentsData[0].id, data: formdata, schoolName: schoolName }))
      } else {
        setStampError('Неверный формат')
      }
    }
  }

  const onChangeSign = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files) {
      const formdata = new FormData()
      formdata.append('signature', target.files[0])
      formdata.append('school', String(schoolId))

      if (target.files[0].size <= 200 * 1024) {
        const url = URL.createObjectURL(target.files[0])
        setSignUrl(url)
        documentsData[0] && (await updateDocs({ id: documentsData[0].id, data: formdata, schoolName: schoolName }))
      } else {
        setSignError('Неверный формат')
      }
    }
  }

  return (
    <>
      <div className={styles.title_passport}>
        <span className={styles.title_passport_header}>Печать платформы</span>
        <span className={styles.title_passport_header}>Подпись владельца платформы</span>
      </div>
      <div className={styles.title_passport_block}>
        <div className={styles.wrapper_actions}>
          <div className={styles.decor}>
            <LogoAddBlock
              title={'Печать платформы'}
              logoDesc={
                'Загрузите печать Вашей платформы: она будет отображаться в сертификате, который выдается ученикам после успешного прохождения обучения'
              }
              aboutRequirements={'Требования к печати:'}
              url={stampUrl}
              height={100}
              onChange={onChangeStamp}
              requirementsArr={['Формат файла PNG (без заднего фона)', 'Размер файла не более 2 мб', ' Оптимальный размер печати 200px х 200px']}
            />
            {stampError && <span>{stampError}</span>}
          </div>
        </div>
        <div className={styles.wrapper_actions}>
          <div className={styles.decor}>
            <LogoAddBlock
              title={'Подпись владельца платформы'}
              logoDesc={
                'Загрузите подпись владельца Вашей платформы: она будет отображаться в сертификате, который выдается ученикам после успешного прохождения обучения'
              }
              aboutRequirements={'Требования к подписи:'}
              url={signUrl}
              height={100}
              onChange={onChangeSign}
              requirementsArr={['Формат файла PNG (без заднего фона)', 'Размер файла не более 200 кб', 'Оптимальный размер подписи 100px х 200px']}
            />
            {signError && <span>{signError}</span>}
          </div>
        </div>
      </div>
    </>
  )
})
