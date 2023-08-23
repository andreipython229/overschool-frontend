import { memo, FC } from 'react'

type studentLessonFileT = {
  arrOfFilesUrls: string[]
}

export const StudentLessonFile: FC<studentLessonFileT> = memo(({ arrOfFilesUrls }) => {
  return null
  // <>
  //   {arrOfFilesUrls?.map((fileUrl, index) => (
  //     <a key={index} href={fileUrl} download target={'_blanck'}>
  //       <div className={styles.lesson__download_container}>
  //         <div className={styles.lesson__dowload_wrap}>
  //           <div className={styles.lesson__dowload_blackDiv}> </div>
  //           <span>{lessonFileArrName[lessonFileArrName.length - 1].slice(0, 20)}</span>
  //         </div>
  //         <div className={styles.lesson__dowload_wrap}>
  //           <span className={styles.lesson__download_size}>445 КБ</span>
  //           <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={arrDownPath} />
  //         </div>
  //       </div>
  //     </a>
  //   ))}
  // </>
})
