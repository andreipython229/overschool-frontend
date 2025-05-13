import { FC, useState, ChangeEvent } from 'react'
import styles from './certificates.module.scss'
import { Button } from 'components/common/Button/Button'
import { Input } from 'components/common/Input/Input/Input'
import { useParams } from 'react-router-dom'
import { useFetchCourseQuery } from 'api/coursesServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { Certificate } from 'Pages/Certificate/Certificate'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from 'selectors'

export const Certificates: FC = () => {
  const { course_id } = useParams()
  const { data: course, isLoading } = useFetchCourseQuery({ id: course_id as string, schoolName: window.location.href.split('/')[4] })
  const { schoolName } = useAppSelector(schoolSelector)
  const [signature, setSignature] = useState<string>('')
  const [signatureImage, setSignatureImage] = useState<string>('')
  const [stamp, setStamp] = useState<string>('')
  const [stampType, setStampType] = useState<'stamp1' | 'stamp2'>('stamp1')
  const [previewData, setPreviewData] = useState<{
    user_full_name: string
    course_name: string
    school_name: string
    date: string
    signature: string
    sections: any[]
    stampType: 'stamp1' | 'stamp2'
    signatory: string
  }>({
    user_full_name: 'Иван Иванов',
    course_name: course?.name || '',
    school_name: schoolName || '',
    date: new Date().toISOString(),
    signature: '',
    sections: [],
    stampType: 'stamp1',
    signatory: ''
  })

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignature(value);
    setPreviewData(prev => ({
      ...prev,
      signatory: value
    }));
  }

  const handleSignatureImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSignatureImage(result);
        setPreviewData(prev => ({
          ...prev,
          signature: result
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  const handleStampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStamp(e.target.value)
  }

  const handleStampTypeChange = (type: 'stamp1' | 'stamp2') => {
    setStampType(type)
    setPreviewData(prev => ({
      ...prev,
      stampType: type
    }))
  }

  if (isLoading) {
    return <SimpleLoader />
  }

  return (
    <div className={styles.certificates}>
      <h2>Настройки сертификатов курса</h2>
      
      <div className={styles.certificates_content}>
        <div className={styles.settings}>
          <div className={styles.settings_section}>
            <h3>Подпись директора</h3>
            <div style={{ width: '300px' }}>
              <Input
                name="signature"
                type="text"
                value={signature}
                onChange={handleSignatureChange}
                placeholder="Введите имя директора"
                label="Имя директора"
                style={{ 
                  width: '300px',
                  fontSize: '12px',
                  padding: '4px'
                }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureImageChange}
                style={{ display: 'none' }}
                id="signature-upload"
              />
              <label 
                htmlFor="signature-upload"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#F57AF5',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Загрузить подпись
              </label>
              {signatureImage && (
                <div style={{ marginTop: '1rem' }}>
                  <img 
                    src={signatureImage} 
                    alt="Подпись" 
                    style={{ 
                      maxWidth: '200px',
                      maxHeight: '100px',
                      objectFit: 'contain'
                    }} 
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.settings_section}>
            <h3 className={styles.stamp_title}>Печать школы</h3>
            <div className={styles.stamp_selection}>
              <div 
                className={`${styles.stamp_option} ${stampType === 'stamp1' ? styles.active : ''}`}
                onClick={() => handleStampTypeChange('stamp1')}
              >
                <div className={styles.stamp_preview}>
                  <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="55" stroke="#FF0000" strokeWidth="2" fill="none"/>
                    <circle cx="60" cy="60" r="45" stroke="#FF0000" strokeWidth="1" fill="none"/>
                    <text x="60" y="40" textAnchor="middle" fill="#FF0000" fontSize="12" fontWeight="bold">OFFICIAL</text>
                    <text x="60" y="55" textAnchor="middle" fill="#FF0000" fontSize="12" fontWeight="bold">STAMP</text>
                    <text x="60" y="70" textAnchor="middle" fill="#FF0000" fontSize="12" fontWeight="bold">OF</text>
                    <text x="60" y="85" textAnchor="middle" fill="#FF0000" fontSize="12" fontWeight="bold">SCHOOL</text>
                  </svg>
                </div>
                <span>Печать 1</span>
              </div>
              <div 
                className={`${styles.stamp_option} ${stampType === 'stamp2' ? styles.active : ''}`}
                onClick={() => handleStampTypeChange('stamp2')}
              >
                <div className={styles.stamp_preview}>
                  <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="55" stroke="#0000FF" strokeWidth="2" fill="none"/>
                    <circle cx="60" cy="60" r="45" stroke="#0000FF" strokeWidth="1" fill="none"/>
                    <text x="60" y="35" textAnchor="middle" fill="#0000FF" fontSize="12" fontWeight="bold">SCHOOL</text>
                    <text x="60" y="50" textAnchor="middle" fill="#0000FF" fontSize="12" fontWeight="bold">CERTIFICATION</text>
                    <text x="60" y="65" textAnchor="middle" fill="#0000FF" fontSize="12" fontWeight="bold">AND</text>
                    <text x="60" y="80" textAnchor="middle" fill="#0000FF" fontSize="12" fontWeight="bold">VERIFICATION</text>
                  </svg>
                </div>
                <span>Печать 2</span>
              </div>
            </div>
          </div>

          <div className={styles.settings_section}>
            <h3>Предпросмотр сертификата</h3>
            <div className={styles.preview}>
              <Certificate previewData={previewData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 