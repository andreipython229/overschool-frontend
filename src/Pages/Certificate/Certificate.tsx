import logo from './img/logo.png'
import border from './img/border.svg'
import logoHorizontal from './img/logoHorizontal.svg'
import stamp from './img/stamp.png'
import complete from './img/complete.png'
import signature from './img/signature.png'
import QR from './img/QR.png'

import styles from './Certificate.module.scss'
import { useParams } from 'react-router-dom'
import { useFetchSertificateMutation } from 'api/userProgressService'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import { CertificatCourseModules } from './certificatModules'
import { Lesson, Section } from 'types/courseStatT'
import {DateTime} from "luxon";

import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'


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
  const [finishDate, setFinishDate] = useState<string>()

  const headerId = localStorage.getItem('header_id')

  const { data:dataHeader, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))

  const [logotype, setLogo] = useState<string | undefined>('')


  const decryptSertLink = (encryptedString: string): { courseId: number; userId: number; schoolId: number } => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, 'секретный_ключ')
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    setData(decryptedData)

    return decryptedData
  }

  useEffect(() => {
    if (isSuccess) {
      setLogo(dataHeader?.logo_school)
    }
  }, [dataHeader])

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

  useEffect(() => {
    if (sertData) {
      const date = sertData.date ? sertData.date : new Date();
      const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat('dd.MM.yyyy');
      setFinishDate(formattedDate);
    }
  }, [sertData])

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
      <div className={styles.tape}>
      </div>
      
        <div className={styles.wrapper}>
          <div className={styles.logo}>
              {sertData.school_name} school
              <img className={styles.logo__over} src={logo} alt="logo" />
          </div>
          
          <div className={styles.certificate}>
            <div className={styles.certificate__header}>
              <h2>Certi</h2>
              <div className={styles.certificate__header_middle}>
                <h3 >Certificate</h3>
              </div>
                <h2 className={styles.certificate__header_down}>ficate</h2>
              <div className={styles.certificate__header_completion}>
                of completion
              </div>
              <div className={styles.certificate_line}></div>
            </div>
            
            {/* <div className={styles.certificate__producer}>
              <img className={styles.border} src={border} alt="border" />
              <div className={styles.border__text}>
              {sertData.school_name} school
              </div>
            </div> */}
            
            <div className={styles.certificate__graduate}>{sertData.user_full_name}</div>
            <div className={styles.certificate__content}>
              Has successfully completed course
              <div className={styles.certificate__content_nameCourse}>
              <span className={styles.bold}>{sertData.course_name}</span>
              </div>
            </div>  
          </div>
          <div className={styles.signs}>
            <img className={styles.sign__QR} src={QR} alt="QR" />
              <div className={styles.signs__date}>
                <div className={styles.signs__date_text}>{finishDate}</div>
                <p className={styles.signs__date_text_issue}>issue date</p>
              </div>
              <div className={styles.signs__content}>
                <div className={styles.sign}>
                  <div className={styles.sign__img}>
                    <img className={styles.sign__signature} src={sertData.signature} alt="signature" />
                    {/* <img className={styles.sign__stamp} src={stamp} alt="stamp" /> */}
                  </div>
                  <div className={styles.sign__signatory}>
                    Director
                    {sertData.school_owner}
                  </div>
                </div>
              </div>
              
            </div>
            <img className={styles.complete} src={complete} alt="complete" />
        </div>
        
        {/* <div className={styles.courseName}></div> */}
      </div> 
      <div className={styles.mainSkills}> 
        <div className={styles.mainSkills__title}>
          Course Program
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
