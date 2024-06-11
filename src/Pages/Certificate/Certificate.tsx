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

import { CertificatCourseModules } from './certificatModules'
import { Lesson, Section } from 'types/courseStatT'


type CertificatModulesT = {
  section: Section
  sectionIndex: number
  handleToggleOpen: (index: number) => void
  openIndex: number
}



export const Certificate = () => {
  const { certLink } = useParams()
  const [data, setData] = useState<{ courseId: number; userId: number; schoolId: number }>()
  const [getSertData, { data: sertData, isLoading, isSuccess: succSert }] = useFetchSertificateMutation()
  const [openIndex, setOpenIndex] = useState<number>(0)

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
  

  const handleToggleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }
  
  

  return sertData ? (
    <main>
      <div  className={styles.main}> 
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
              <div className={styles.border__text}>
              {sertData.school_name} school
              </div>
            </div>
            <div className={styles.certificate__graduate}>{sertData.user_full_name}</div>
            <div className={styles.certificate__content}>
              Has successfully completed
              <p> <span className={styles.bold}>{sertData.course_name}</span> course.</p>  
            </div>  
          </div>
        </div>
        <div className={styles.signs}>
              <div className={styles.signs__date}>19.09.2022</div>
              <div className={styles.signs__content}>
                <div className={styles.sign}>
                  <div className={styles.sign__signatory}>
                    Director
                    <br />
                    {sertData.school_owner}
                  </div>
                  <div className={styles.sign__img}>
                    <img className={styles.sign__signature} src={sertData.signature} alt="signature" />
                    <img className={styles.sign__stamp} src={sertData.stamp} alt="stamp" />
                  </div>
                </div>
              </div>
            </div>
        {/* <div className={styles.courseName}></div> */}
      </div> 
      <div className={styles.mainSkills}> 
        <div className={styles.mainSkills__title}>
          COURSE PROGRAM
        </div> 
        <div className={styles.mainSkills__content_skills}>
                The course provides knowledge on the following topics:
        </div>
        <div className={styles.mainSkills__content_modules}>
            {sertData.sections.map((module:any, index: number) => (
              <CertificatCourseModules
                section={module}
                sectionIndex={index}
                key={module.section_id}
                handleToggleOpen={handleToggleOpen}
                openIndex={openIndex}
              />
            ))}
          </div>
      </div>
    </main> 
  ) : (
    <></>
  )
}
