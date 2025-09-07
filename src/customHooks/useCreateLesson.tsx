import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useCreateLessonsMutation } from '../api/modulesServices'
import { useAppSelector } from '../store/hooks'
import { getSectionId } from '../selectors'
import { sectionT } from '../types/sectionT'
import { lessonIdAndTypeT } from '../components/Modal/ModalTypes'

type useCreateLessonT = {
  modulesList: sectionT[]
  setModulesList?: Dispatch<SetStateAction<sectionT[]>>
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
  lessonId?: number
  insertAfterOrder?: number
}

type UseCreateLessonReturnT = {
  setNameLesson: (arg: string) => void
  handleCreateLesson: (event: FormEvent<HTMLFormElement>) => void
  nameLesson: string
  isLoading?: boolean
}

type createLessonDataT = {
  name: string
  order?: number | undefined
  section: number
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
  setModulesList,
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
  insertAfterOrder,
}: useCreateLessonT): UseCreateLessonReturnT => {
  const [nameLesson, setNameLesson] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  const { section_id } = useAppSelector(getSectionId)

  const [createLesson, { data, isSuccess, isLoading }] = useCreateLessonsMutation()

  const handleCreateLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!nameLesson) {
      return
    }

    const createLessonData: createLessonDataT = {
      name: nameLesson,
      section: section_id,
      order: insertAfterOrder !== undefined ? insertAfterOrder + 1 : 1,
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

    await createLesson({ arg: { createLessonData, type: typeLesson }, schoolName })
      .unwrap()
      .then(data => {
        const newLessonData = {
          type: typeLesson,
          name: nameLesson,
          order: data.order,
          id: data.lesson_id,
          active: data.active,
          baselesson_ptr_id: data.baselesson_ptr_id,
          viewed: false,
          completed: false,
        }
        const newModulesList = [...modulesList]
        const moduleIndexToUpdate = newModulesList.findIndex(module => module.section === section_id)
        const moduleToUpdate = { ...newModulesList[moduleIndexToUpdate] }
        let updatedLessons = [...moduleToUpdate.lessons] // место куда добавить урок по order
        //находим order после которого вставлять
        let insertIndex = updatedLessons.findIndex(lesson => lesson.order > (insertAfterOrder ?? -1))
        if (insertAfterOrder === undefined || insertIndex === -1) insertIndex = 0 //если order не найден, то урок вставляем в начало
        updatedLessons.splice(insertIndex, 0, newLessonData) //вставляем урок в нужное место
        updatedLessons = updatedLessons.map((lesson, index) => ({
          ...lesson,
          order: index + 1,
        }))

        newModulesList[moduleIndexToUpdate] = { ...moduleToUpdate, lessons: updatedLessons } //обновили модуль со списком урока
        if (setModulesList) {
          setModulesList(newModulesList)
        }
      })
  }

  useEffect(() => {
    if (isSuccess) {
      const type = typeLesson.slice(0, -1)
      console.log(data)
      setLessonIdAndType({ id: data[`${type}_id`], type: type, baseLessonId: data?.baselesson_ptr_id })
      setType(null as keyof object)
    }
  }, [isSuccess])

  return { nameLesson, isLoading, setNameLesson, handleCreateLesson }
}
