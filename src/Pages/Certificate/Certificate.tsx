import logo from './img/logo.svg'
import border from './img/border.svg'
import logoHorizontal from './img/logoHorizontal.svg'
import stamp from './img/stamp.png'

import styles from './Certificate.module.scss'
import { useParams } from 'react-router-dom'
import { useFetchSertificateMutation } from 'api/userProgressService'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

export const Certificate = () => {
  const { certLink } = useParams()
  const [data, setData] = useState<{ courseId: number; userId: number; schoolId: number }>()
  const [getSertData, { data: sertData, isLoading, isSuccess: succSert }] = useFetchSertificateMutation()

  const decryptSertLink = (encryptedString: string): { courseId: number; userId: number; schoolId: number } => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, 'секретный_ключ')
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    setData(decryptedData)

    return decryptedData
  }

  useEffect(() => {
    if (certLink) {
      decryptSertLink(certLink)
    }
  }, [certLink])

  useEffect(() => {
    if (data && data.courseId && data.userId && data.schoolId) {
      getSertData({
        user_id: Number(data.userId),
        course_id: Number(data.courseId),
        school_id: Number(data.schoolId),
      })
    }
  }, [data])

  if (!sertData || isLoading) {
    return <SimpleLoader />
  }

  return sertData ? (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <picture className={styles.logo__img}>
            <source srcSet={logo} media="(min-width: 1025px)" />
            <source srcSet={logoHorizontal} media="(max-width: 1024px)" />
            <img src={logo} className={styles.logo__img} alt="logo" />
          </picture>
        </div>
        <div className={styles.certificate}>
          <div className={styles.certificate__header}>certificate</div>
          <div className={styles.certificate__producer}>
            <img className={styles.border} src={border} alt="border" />
            {sertData.school_name} school
          </div>
          <div className={styles.certificate__graduate}>{sertData.user_full_name}</div>
          <div className={styles.certificate__content}>
            Has successfully completed <span className={styles.bold}>{sertData.course_name}</span> course. Key skills: {sertData.course_description}.
          </div>
          <div className={styles.signs}>
            <div className={styles.signs__date}>19.09.2022</div>
            <div className={styles.signs__content}>
              <div className={styles.sign}>
                <div className={styles.sign__signatory}>
                  Teacher
                  <br />
                  {sertData.teacher}
                </div>
                <div className={styles.sign__img}></div>
              </div>
              <div className={styles.sign}>
                <div className={styles.sign__signatory}>
                  Director
                  <br />
                  {sertData.school_owner}
                </div>
                <div className={styles.sign__img}>
                  <img className={styles.sign__stamp} src={stamp} alt="stamp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <></>
  )
}
