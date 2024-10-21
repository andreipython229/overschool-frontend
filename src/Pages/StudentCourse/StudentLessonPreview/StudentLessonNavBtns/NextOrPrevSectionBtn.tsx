import React, { FC, useEffect } from 'react'
import { Button } from '../../../../components/common/Button/Button'
import styles from '../lesson.module.scss'
import { useFetchModuleLessonsQuery } from '../../../../api/modulesServices'
import { useNavigate } from 'react-router-dom'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'

type NextSectionButtonProps = {
  sectionId: number
  courseId: number
  nextDisabled: boolean
}

export const NextOrPrevSectionButton: FC<NextSectionButtonProps> = ({ sectionId, courseId, nextDisabled }) => {
  const navigate = useNavigate()
  const schoolName = window.location.href.split('/')[4]
  const { data: nextSection, isSuccess } = useFetchModuleLessonsQuery({ sectionId: String(sectionId), schoolName, courseId: String(courseId) })
  const nextSectionHandler = () => {
    if (nextSection && nextSection.lessons?.length > 0) {
      const lesson = nextSection.lessons?.[0]
      const newPath = `/school/${schoolName}/courses/student-course/${courseId}/module/${sectionId}/${lesson.type}/${lesson.id}`
      navigate(newPath, { replace: true })
    }
  }

  if (isSuccess) {
    return (
      <Button text={''} onClick={nextSectionHandler} disabled={nextDisabled} variant="emptyInside">
        <p style={{ fontFamily: 'SFPROMedium' }}>Следующий раздел</p>
        <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} styles={{ transform: 'rotate(180deg)' }} />
      </Button>
    )
  } else {
    return <SimpleLoader />
  }
}

export default NextOrPrevSectionButton
