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
  sections: sectionT[]
}

export type studentAccardioT = {
  modules: sectionsT
}
