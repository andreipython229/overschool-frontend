import {useAppDispatch, useAppSelector} from "store/hooks"
import { Paper } from '@mui/material'
import { Reorder, useDragControls } from 'framer-motion'
import {LinkBlockRedactor} from "./LinkBlockRedactor";
import { AddBox } from '@mui/icons-material'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import styles from './styles/LinkBlock.module.scss'
import {useState} from "react";


export const LinkBlock: React.FC = () => {
  const dispatch = useAppDispatch()
  const linkButton = useAppSelector(state => state.landing.blocks.linkButton)
  const [isEditorVisible, setIsEditorVisible] = useState(false)

  const handleToggleEditor = () => {
    setIsEditorVisible(!isEditorVisible)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_redactorField}>
        <Paper elevation={3} className={styles.wrapper_redactorField_paper} sx={{ borderRadius: '8px' }}>
          <span className={styles.wrapper_redactorField_paper_title}>Блок ссылок:</span>
          {isEditorVisible ? (
            <LinkBlockRedactor/>
          ) : (
            <div className={styles.createButton} onClick={handleToggleEditor}>
              <AddBox sx={{ color: '#BA75FF' }} />
              <p>Развернуть редактор</p>
            </div>
          )}
        </Paper>
      </div>
          </div>
  )
}