import { FormEvent, useEffect, useState } from 'react'
import { useCreateLessonsMutation } from '../api/modulesServices'
import { findLength } from '../utils/findLength'
import { useAppSelector } from '../store/hooks'
import { getSectionId } from '../selectors'
import { sectionT } from '../types/sectionT'
import { lessonIdAndTypeT } from '../components/Modal/ModalTypes'

type useCreateLessonT = {
  modulesList: sectionT[]
  typeLesson: string
  time_accept?: string
  description?: string
  automate_accept?: boolean
  success_percent?: number
  setType: (arg: keyof object) => void
  setLessonIdAndType: (arg: lessonIdAndTypeT) => void
  random_questions?: boolean
  random_answers?: boolean
  show_right_answers?: boolean
  attempt_limit?: boolean
  attempt_count?: number
  balls_per_answer?: number
}

type UseCreateLessonReturnT = {
  setNameLesson: (arg: string) => void
  setBalls: (arg: number) => void
  handleCreateLesson: (event: FormEvent<HTMLFormElement>) => void
  balls: number
  nameLesson: string
  isLoading?: boolean
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
  random_questions?: boolean
  random_answers?: boolean
  show_right_answers?: boolean
  attempt_limit?: boolean
  attempt_count?: number
  balls_per_answer?: number
}

export const useCreateLesson = ({
  setType,
  modulesList,
  typeLesson,
  description,
  success_percent,
  time_accept,
  automate_accept,
  setLessonIdAndType,
  random_questions,
  random_answers,
  show_right_answers,
  attempt_limit,
  attempt_count,
  balls_per_answer,
}: useCreateLessonT): UseCreateLessonReturnT => {
  const [nameLesson, setNameLesson] = useState<string>('')
  const [balls, setBalls] = useState<number>(0)

  const { section_id } = useAppSelector(getSectionId)

  const [createLesson, { data, isSuccess, isLoading }] = useCreateLessonsMutation()

  const handleCreateLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!nameLesson) {
      return
    }
    console.log(random_questions, random_answers, show_right_answers, attempt_limit, attempt_count, balls_per_answer)
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
    if (random_questions) {
      createLessonData['random_questions'] = random_questions
    }
    if (random_answers) {
      createLessonData['random_answers'] = random_answers
    }
    if (show_right_answers) {
      createLessonData['show_right_answers'] = show_right_answers
    }
    if (attempt_limit) {
      createLessonData['attempt_limit'] = attempt_limit
    }
    if (attempt_count) {
      createLessonData['time_accept'] = time_accept
    }
    if (balls_per_answer) {
      createLessonData['balls_per_answer'] = balls_per_answer
    }
    console.log(createLessonData)

    await createLesson({ createLessonData, type: typeLesson })
  }
  useEffect(() => {
    if (isSuccess) {
      const type = typeLesson.slice(0, -1)
      setLessonIdAndType({ id: data[`${type}_id`], type: type })
      setType(null as keyof object)
    }
  }, [isSuccess])

  return { nameLesson, balls, isLoading, setNameLesson, setBalls, handleCreateLesson }
}
