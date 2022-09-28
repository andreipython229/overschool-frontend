export type lessonT = {
  lesson_id: number
  name: string
}

export type sectionT = {
  name: string
  section_id: number
  lessons: lessonT[]
}

export type sectionsT = {
  course_id: string
  sections: sectionT[]
}

export type studentAccardioT = {
  modules: sectionsT
}
