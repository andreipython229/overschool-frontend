import React, { FC, useEffect } from 'react'
import { Button } from '../../../../components/common/Button/Button'
import styles from '../lesson.module.scss'
import { useFetchModuleLessonsQuery } from '../../../../api/modulesServices'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { SimpleLoader } from '../../../../components/Loaders/SimpleLoader'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'

type PrevSectionButtonProps = {
  sectionId: number
  courseId: number
}

export const PrevSectionButton: FC<PrevSectionButtonProps> = ({ sectionId, courseId }) => {
  const navigate = useNavigate()
  const schoolName = window.location.href.split('/')[4]
  const { data: prevSection, isSuccess } = useFetchModuleLessonsQuery({ sectionId: String(sectionId), schoolName, courseId: String(courseId) })
  const prevSectionHandler = () => {
    if (prevSection && prevSection.lessons?.length > 0) {
      const lesson = prevSection.lessons?.[prevSection.lessons?.length - 1]
      const newPath = `/school/${schoolName}/courses/student-course/${courseId}/module/${sectionId}/${lesson.type}/${lesson.id}`
      navigate(newPath, { replace: true })
    }
  }

  if (isSuccess) {
    return (
      <Button text="Предыдущий раздел" onClick={prevSectionHandler} variant="emptyInside">
        <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
      </Button>
    )
  } else {
    return <SimpleLoader />
  }
}

export default PrevSectionButton
