import { FormEvent, useState } from 'react'
import { useCreateLessonsMutation } from '../api/modulesServices'
import { findLength } from '../utils/findLength'
import { useAppSelector } from '../store/hooks'
import { getSectionId } from '../selectors'
import { ModulesT } from '../components/Modal/ModalTypes'

type UseCreateLessonT = {
  modulesList: ModulesT[]
  typeLesson: string
  text?: string
  success_percent?: number
  setType: (arg: keyof object) => void
}

type UseCreateLessonReturnT = {
  setNameLesson: (arg: string) => void
  setBalls: (arg: number) => void
  handleCreateLesson: (event: FormEvent<HTMLFormElement>) => void
  balls: number
  nameLesson: string
}

export const useCreateLesson = ({ setType, modulesList, typeLesson, text, success_percent }: UseCreateLessonT): UseCreateLessonReturnT => {
  const [nameLesson, setNameLesson] = useState<string>('')
  const [balls, setBalls] = useState<number>(0)
  const { section_id } = useAppSelector(getSectionId)
  const [createLesson] = useCreateLessonsMutation()

  const handleCreateLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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

      await createLesson({ createLessonData, type: typeLesson })
      setType(null as keyof object)
    } else {
      const createLessonData = {
        name: nameLesson,
        order: orderLessons,
        section: section_id,
        balls: balls,
      }

      await createLesson({ createLessonData, type: typeLesson })
      setType(null as keyof object)
    }
  }

  return { nameLesson, balls, setNameLesson, setBalls, handleCreateLesson }
}
