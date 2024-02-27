import { ChangeEvent, memo, useEffect, useState } from 'react'

import { LogoAddBlock } from '../DecorPlatform/LogoAddBlock/LogoAddBlock'

import styles from '../superAdmin.module.scss'
import { useLazyFetchSchoolDocumentQuery, useSetSchoolDocumentsMutation } from 'api/schoolService'
import { useAppSelector } from 'store/hooks'
import { schoolIdSelector } from 'selectors'

export const Passport = memo(() => {
  const [fetchDocs, { data: documentsData, isFetching }] = useLazyFetchSchoolDocumentQuery()
  const [createDocs] = useSetSchoolDocumentsMutation()
  const schoolId = useAppSelector(schoolIdSelector)
  const schoolName = window.location.href.split('/')[4]

  const [stampError, setStampError] = useState<string>('')
  const [signError, setSignError] = useState<string>('')

  useEffect(() => {
    if (schoolName) {
      fetchDocs(schoolName)
    }
  }, [])

  console.log(documentsData)

  const onChangeStamp = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target

    if (target.files) {
      const formdata = new FormData()
      formdata.append('stamp', target.files[0])
      formdata.append('school', String(schoolId))

      if (target.files[0].size <= 2 * 1024 * 1024) {
        await createDocs({ data: formdata, schoolName: schoolName })
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
      formdata.append('user', String('92'))
      formdata.append('school', String(schoolId))

      if (target.files[0].size <= 200 * 1024) {
        await createDocs({ data: formdata, schoolName: schoolName })
      } else {
        setSignError('Неверный формат')
      }
    }
  }

  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.decor}>
        <div className={styles.decor_title}>Персональная информация владельца школы</div>
        <LogoAddBlock
          title={'Печать школы'}
          logoDesc={
            'Загрузите печать Вашей школы: она будет отображаться в сертификате, который выдается ученикам после успешного прохождения обучения'
          }
          aboutRequirements={'Требования к печати:'}
          onChange={onChangeStamp}
          requirementsArr={['Формат файла PNG (без заднего фона)', 'Размер файла не более 2 мб', ' Оптимальный размер печати 200px х 200px']}
        />
        {stampError && <span>{stampError}</span>}
        <LogoAddBlock
          title={'Подпись владельца школы'}
          logoDesc={
            'Загрузите подпись владельца Вашей школы: она будет отображаться в сертификате, который выдается ученикам после успешного прохождения обучения'
          }
          aboutRequirements={'Требования к подписи:'}
          onChange={onChangeSign}
          requirementsArr={['Формат файла PNG (без заднего фона)', 'Размер файла не более 200 кб', 'Оптимальный размер подписи 100px х 200px']}
        />
        {signError && <span>{signError}</span>}
      </div>
    </div>
  )
})
