import { FormEvent, useState } from 'react'
import { useCreateLessonsMutation } from '../api/modulesServices'
import { findLength } from '../utils/findLength'
import { useAppSelector } from '../store/hooks'
import { getSectionId } from '../selectors'
import { sectionT } from '../types/sectionT'

type UseCreateLessonT = {
  modulesList: sectionT[]
  typeLesson: string
  time_accept?: string
  description?: string
  automate_accept?: boolean
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

type createLessonDataT = {
  name: string
  order: number | undefined
  section: number
  balls: number
  success_percent?: number
  time_accept?: string
  automate_accept?: boolean
  description?: string
}

export const useCreateLesson = ({
  setType,
  modulesList,
  typeLesson,
  description,
  success_percent,
  time_accept,
  automate_accept = false,
}: UseCreateLessonT): UseCreateLessonReturnT => {
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

    const createLessonData: createLessonDataT = {
      name: nameLesson,
      order: orderLessons,
      section: section_id,
      balls: balls,
    }
    if (description) {
      createLessonData['description'] = description
    }
    if (automate_accept) {
      createLessonData['automate_accept'] = automate_accept
    }
    if (success_percent) {
      createLessonData['success_percent'] = success_percent
    }
    if (time_accept) {
      createLessonData['time_accept'] = time_accept
    }

    await createLesson({ createLessonData, type: typeLesson })
    setType(null as keyof object)
  }

  return { nameLesson, balls, setNameLesson, setBalls, handleCreateLesson }
}
