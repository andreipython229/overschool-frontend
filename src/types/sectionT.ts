import { modulesListT } from '../Pages/School/Navigations/navigationTypes'

export type lessonT = {
  id: number
  name: string
  order: number
  type: string
}

export type sectionT = {
  section_name: string
  section: number
  lessons: lessonT[]
}

export type sectionsT = {
  course_id: string
  course_name: string
  sections: modulesListT[]
}

export type studentAccardioT = {
  modules: sectionsT
}
