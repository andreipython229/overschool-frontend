export type individualRatingT = {
  completed_lessons: number
  top_by_lessons_num: number | undefined
  available_courses: number
  top_by_courses_num: number | undefined
}

export type ratingPaginatorT = {
  count: number
  next: null
  previous: null
  results: studentRatingT[]
}

export type studentRatingT = {
  id: number
  email: string
  first_name: string
  last_name: string
  completed_lessons?: number
  available_courses?: number
}
