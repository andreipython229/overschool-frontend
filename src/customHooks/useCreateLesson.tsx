import { useState } from 'react'
import { useCreateLessonsMutation } from '../api/modulesServices'
import { findLength } from '../utils/findLength'
import { useAppSelector } from '../store/hooks'
import { getSectionId } from '../selectors'
import { ModulesT } from '../components/Modal/ModalTypes'

type UseCreateLessonT = {
  addCourse: (arg: string, argTwo: string) => void
  modulesList: ModulesT[]
  typeLesson: string
  modalType: string
  text?: string
  success_percent?: number
}

type UseCreateLessonReturnT = {
  setNameLesson: (arg: string) => void
  setBalls: (arg: number) => void
  handleCreateLesson: () => void
  balls: number
  nameLesson: string
}

export const useCreateLesson = ({
  addCourse,
  modulesList,
  typeLesson,
  modalType,
  text,
  success_percent,
}: UseCreateLessonT): UseCreateLessonReturnT => {
  const [nameLesson, setNameLesson] = useState<string>('')
  const [balls, setBalls] = useState<number>(0)
  const { section_id } = useAppSelector(getSectionId)
  const [createLesson] = useCreateLessonsMutation()

  const handleCreateLesson = async () => {
    if (!nameLesson) {
      return
    }
    const orderLessons = findLength(section_id, modulesList)
    if (text || success_percent) {
      const createLessonData = {
        name: nameLesson,
        order: orderLessons,
        section: section_id,
        balls: balls,
        text: text,
        success_percent: success_percent,
      }

      addCourse(nameLesson, modalType)

      await createLesson({ createLessonData, type: typeLesson })
    } else {
      const createLessonData = {
        name: nameLesson,
        order: orderLessons,
        section: section_id,
        balls: balls,
      }
      addCourse(nameLesson, modalType)

      await createLesson({ createLessonData, type: typeLesson })
    }
  }

  return { nameLesson, balls, setNameLesson, setBalls, handleCreateLesson }
}
