import { FC, useEffect, useState } from 'react'
import logo from './img/logo.png'
import border from './img/border.svg'
import logoHorizontal from './img/logoHorizontal.svg'
// import stamp from './img/stamp.png'
import complete from './img/complete.png'
import signature from './img/signature.png'
import QR from './img/QR.png'

import styles from './Certificate.module.scss'
import { useParams } from 'react-router-dom'
import { useFetchSertificateMutation } from 'api/userProgressService'
import CryptoJS from 'crypto-js'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import { CertificatCourseModules } from './certificatModules'
import { Lesson, Section } from 'types/courseStatT'
import { DateTime } from 'luxon'

import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

const StampSVG1 = () => (
  <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stamp1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#F57AF5', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#9B219E', stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="55" stroke="url(#stamp1Gradient)" strokeWidth="2" fill="none"/>
    <circle cx="60" cy="60" r="45" stroke="url(#stamp1Gradient)" strokeWidth="1" fill="none"/>
    <text x="60" y="40" textAnchor="middle" fill="#F57AF5" fontSize="10" fontWeight="bold" fontFamily="Montserrat">OFFICIAL</text>
    <text x="60" y="55" textAnchor="middle" fill="#F57AF5" fontSize="10" fontWeight="bold" fontFamily="Montserrat">STAMP</text>
    <text x="60" y="70" textAnchor="middle" fill="#F57AF5" fontSize="10" fontWeight="bold" fontFamily="Montserrat">OF</text>
    <text x="60" y="85" textAnchor="middle" fill="#F57AF5" fontSize="10" fontWeight="bold" fontFamily="Montserrat">SCHOOL</text>
  </svg>
);

const StampSVG2 = () => (
  <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stamp2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#9B219E', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#4D0FAF', stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="55" stroke="url(#stamp2Gradient)" strokeWidth="2" fill="none"/>
    <circle cx="60" cy="60" r="45" stroke="url(#stamp2Gradient)" strokeWidth="1" fill="none"/>
    <text x="60" y="35" textAnchor="middle" fill="#9B219E" fontSize="10" fontWeight="bold" fontFamily="Montserrat">SCHOOL</text>
    <text x="60" y="50" textAnchor="middle" fill="#9B219E" fontSize="10" fontWeight="bold" fontFamily="Montserrat">CERTIFICATION</text>
    <text x="60" y="65" textAnchor="middle" fill="#9B219E" fontSize="10" fontWeight="bold" fontFamily="Montserrat">AND</text>
    <text x="60" y="80" textAnchor="middle" fill="#9B219E" fontSize="10" fontWeight="bold" fontFamily="Montserrat">VERIFICATION</text>
  </svg>
);

type PreviewDataT = {
  user_full_name: string
  course_name: string
  school_name: string
  date: string
  signature: string
  sections: any[]
  stampType?: 'stamp1' | 'stamp2'
}

type CertificatePropsT = {
  previewData?: PreviewDataT
}

export const Certificate: FC<CertificatePropsT> = ({ previewData }) => {
  const { certLink } = useParams()
  const [data, setData] = useState<{ courseId: number; userId: number; schoolId: number }>()
  const [getSertData, { data: sertData, isLoading, isSuccess: succSert }] = useFetchSertificateMutation()
  const [openIndex, setOpenIndex] = useState<number>(0)
  const [finishDate, setFinishDate] = useState<string>()
  const { headerId } = useAppSelector(schoolSelector)

  const { data: dataHeader, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))

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
    if (certLink && !previewData) {
      decryptSertLink(certLink)
    }
  }, [certLink])

  useEffect(() => {
    if (data && data.courseId && data.userId && data.schoolId && !previewData) {
      getSertData({
        user_id: Number(data.userId),
        course_id: Number(data.courseId),
        school_id: Number(data.schoolId),
      })
    }
  }, [data])

  useEffect(() => {
    if (previewData || sertData) {
      const date = previewData?.date || sertData?.date || new Date()
      const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat('dd.MM.yyyy')
      setFinishDate(formattedDate)
    }
  }, [sertData, previewData])

  if ((!sertData && !previewData) || isLoading) {
    return <SimpleLoader />
  }

  const handleToggleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  const displayData = previewData || sertData

  return displayData ? (
    <main>
      <div className={styles.main}>
        <div className={styles.tape}></div>

        <div className={styles.wrapper}>
          <div className={styles.logo}>
            {displayData.school_name} school
            <img className={styles.logo__over} src={logo} alt="logo" />
          </div>

          <div className={styles.certificate}>
            <div className={styles.certificate__header}>
              <h2>Certi</h2>
              <div className={styles.certificate__header_middle}>
                <h3>Certificate</h3>
              </div>
              <h2 className={styles.certificate__header_down}>ficate</h2>
              <div className={styles.certificate__header_completion}>of completion</div>
              <div className={styles.certificate_line}></div>
            </div>

            {/* <div className={styles.certificate__producer}>
              <img className={styles.border} src={border} alt="border" />
              <div className={styles.border__text}>
              {sertData.school_name} school
              </div>
            </div> */}

            <div className={styles.certificate__graduate}>{displayData.user_full_name}</div>
            <div className={styles.certificate__content}>
              Has successfully completed course
              <div className={styles.certificate__content_nameCourse}>
                <span className={styles.bold}>{displayData.course_name}</span>
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
                  {displayData.signature ? (
                    <img 
                      className={styles.sign__signature} 
                      src={displayData.signature} 
                      alt="signature" 
                      style={{
                        maxWidth: '200px',
                        maxHeight: '100px',
                        objectFit: 'contain'
                      }}
                    />
                  ) : (
                    <img className={styles.sign__signature} src={signature} alt="signature" />
                  )}
                  <div className={styles.sign__stamp}>
                    {displayData.stampType === 'stamp2' ? <StampSVG2 /> : <StampSVG1 />}
                  </div>
                </div>
                <div className={styles.sign__signatory}>
                  Director
                  <br />
                  {displayData.signatory || displayData.signature}
                </div>
              </div>
            </div>
          </div>
          <img className={styles.complete} src={complete} alt="complete" />
        </div>

        {/* <div className={styles.courseName}></div> */}
      </div>
      <div className={styles.mainSkills}>
        <div className={styles.mainSkills__title}>Course Program</div>
        <div className={styles.mainSkills__content_skills}>The course provides knowledge on the following topics:</div>
        <div className={styles.mainSkills__content_modules}>
          {displayData.sections.map((module: any, index: number) => (
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
