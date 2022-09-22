import { FC, useState } from 'react'

import { AccardionItem } from './AccardionItem/AccardionItem'
import { sectionsT, sectionT } from '../../types/sectionT'

import styles from './studentAccardion.module.scss'

type studentAccardioT = {
  modules: /*sectionsT[]*/ any
}

export const StudentAccardion: FC<studentAccardioT> = ({ modules }) => {
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
        <AccardionItem key={module.section_id} openIndex={openIndex} moduleIndex={index} module={module} handleToggleOpen={handleToggleOpen} />
      ))}
    </div>
  )
}
