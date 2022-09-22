import { FC } from 'react'
import { useParams, Link, generatePath, Outlet } from 'react-router-dom'

import { Student } from '../../enum/pathE'
import { StudentCourseHeader } from './StudentCourseHeader/index'
import { useFetchCourseQuery } from '../../api/coursesServices'
import { useFetchModulesQuery } from '../../api/modulesServices'
import { CoursesT } from '../../types/CoursesT'

export const StudentCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const { data } = useFetchCourseQuery(courseId as string)
  const { data: modules } = useFetchModulesQuery(courseId as string)

  return (
    <>
      <StudentCourseHeader course={data as CoursesT} />
      {modules?.sections.map((item: any) => (
        <div key={item.section_id}>
          <h2>{item.name}</h2>
          <div>
            {item.lessons.map((lesson: any) => (
              <Link key={lesson.lesson_id} to={generatePath(Student.Lesson, { section_id: item.section_id, lesson_id: lesson.lesson_id })}>
                <div>{lesson.name}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {/* <Outlet /> */}
    </>
  )
}
