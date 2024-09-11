import { FC } from 'react'
import styles from './blockButtons.module.scss'
import { IButton } from 'types/sectionT'
import {
  LinkButtonT
} from "../../Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/types/blocksControllerT";

interface LinkButtonI {
  button: IButton | LinkButtonT
  color: string
  link?: string
  text?: string
}

export const BlockLinkButton: FC<LinkButtonI> = ({ button, color, link, text }) => {
  return (
    <a style={{ background: color }} className={styles.button} href={link || button.link} target="_blank" rel="noreferrer">
      {text || button.name}
    </a>
  )
}
