import { FC, memo, useState } from 'react'

import { AccardionItem } from './AccardionItem/AccardionItem'
import { sectionT, studentAccardioT } from '../../types/sectionT'

import styles from './studentAccardion.module.scss'

export const StudentAccardion: FC<studentAccardioT> = memo(({ modules }) => {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const handleToggleOpen = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <div className={styles.accardionWrapper}>
      {modules?.sections.map((module: sectionT, index: number) => (
        <AccardionItem key={module.section} openIndex={openIndex} modules={modules} moduleIndex={index} module={module} handleToggleOpen={handleToggleOpen} />
      ))}
    </div>
  )
})
