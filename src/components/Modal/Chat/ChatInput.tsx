import { ChangeEvent, Dispatch, FC, KeyboardEvent, SetStateAction, useState } from 'react'

import styles from './chat.module.scss'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { sendArrPath, updateArrPath } from '../../AllStudentsBlock/config/svgIconsPath'

type chatInputT = {
  message: string
  handleSubmit: () => void
  handleChangeMessage: (event: ChangeEvent<HTMLInputElement>) => void
  files: string[]
  setFiles: Dispatch<SetStateAction<string[]>>
}

export const ChatInput: FC<chatInputT> = ({ message, handleSubmit, handleChangeMessage, files, setFiles }) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles)
      const base64Files: string[] = []

      // Преобразование каждого файла в Base64
      for (const file of filesArray) {
        const base64 = await convertToBase64(file)
        base64Files.push(base64 as string)
      }

      // Обновление состояния с массивом Base64 файлов
      setFiles(base64Files)
    }
  }

  // Функция для преобразования файла в Base64
  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = error => {
        reject(error)
      }
    })
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '10px' }}>
      {files.length > 0 && (
        <div style={{ paddingLeft: '30px', display: 'flex', alignItems: 'center' }}>
          {files.map((file, index) => (
            <div key={index} style={{ padding: '10px 0 0', position: 'relative' }}>
              <button
                onClick={() => setFiles([])}
                style={{
                  position: 'absolute',
                  right: '-2px',
                  top: '8px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  fontSize: '8px',
                  borderWidth: '0',
                }}
              >
                X
              </button>
              <img src={file} alt={`Uploaded file ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '50px', borderRadius: '7px' }} />
            </div>
          ))}
        </div>
      )}
      <div className={styles.chatInput}>
        <label htmlFor="file-loader" className={styles.filePicker}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.1294 16.7187C15.1294 18.7373 14.4339 20.4556 13.0428 21.8733C11.6516 23.2911 9.94986 24 7.93742 24C5.92497 24 4.2192 23.2911 2.82008 21.8733C1.42097 20.4556 0.720528 18.7369 0.71875 16.7173V5.07733C0.71875 3.66667 1.20408 2.468 2.17475 1.48133C3.14364 0.493778 4.33386 0 5.74542 0C7.15697 0 8.3472 0.493334 9.31608 1.48C10.285 2.46667 10.7699 3.66578 10.7708 5.07733V16.1027C10.7708 16.8849 10.4974 17.5591 9.95075 18.1253C9.40497 18.6916 8.73919 18.9747 7.95342 18.9747C7.16764 18.9747 6.49208 18.696 5.92675 18.1387C5.36142 17.5813 5.07875 16.9027 5.07875 16.1027V5.02533H6.41208V16.1027C6.41208 16.5284 6.55742 16.8911 6.84808 17.1907C7.13964 17.4911 7.49831 17.6413 7.92408 17.6413C8.34986 17.6413 8.70853 17.4911 9.00008 17.1907C9.29164 16.8902 9.43742 16.5276 9.43742 16.1027V5.052C9.43208 4.01556 9.07564 3.13689 8.36808 2.416C7.66142 1.69422 6.78719 1.33333 5.74542 1.33333C4.71164 1.33333 3.83786 1.69822 3.12408 2.428C2.40942 3.15778 2.05208 4.04089 2.05208 5.07733V16.7173C2.04764 18.3644 2.61786 19.7676 3.76275 20.9267C4.90853 22.0867 6.30364 22.6667 7.94808 22.6667C9.56853 22.6667 10.9463 22.0867 12.0814 20.9267C13.2165 19.7667 13.7885 18.364 13.7974 16.7187V5.02533H15.1308L15.1294 16.7187Z"
              fill="#357EEB"
            />
          </svg>
          <input id="file-loader" accept="image/*" type="file" multiple={false} onChange={handleFileChange} />
        </label>

        <input
          className={styles.chatInput_input}
          type="text"
          name="message"
          value={message}
          placeholder="Напишите сообщение..."
          onChange={handleChangeMessage}
          onKeyDown={handleKeyPress}
        />
        <div className={styles.chatInput_send} onClick={handleSubmit}>
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z" fill="#357EEB" />
          </svg>

          {/* <IconSvg width={30} height={20} viewBoxSize="0 0 30 20" path={sendArrPath} /> */}
        </div>
      </div>
    </div>
  )
}
