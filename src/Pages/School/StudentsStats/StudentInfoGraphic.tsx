import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import styles from 'Pages/School/StudentsStats/studentsStats.module.scss'
import { useEffect, useState } from 'react'

export const StudentInfoGraphic = (courseId: any) => {
  const [data, setData] = useState<any[]>()
  const [countUsers, setCountUsers] = useState<any>()
  const [data2, setData2] = useState<any[]>()

  useEffect(() => {
    axios.get('http://45.135.234.137:8000/api/School_1/courses/' + courseId.courseId + '/user_count_by_month/').then(v => {
      if (v.data.count > 0) {
        setData2([
          {
            name: 'Май',
            uv: v.data.count,
            pv: 150,
          },
          {
            name: 'Июнь',
            uv: v.data.count,
            pv: 180,
          },
        ])
      }
      setCountUsers(v.data.count)
    })
  }, [])

  return (
    <>
      <div className={styles.statistics_new_student_wrapper_new_students}>
        <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</h4>
        <p className={styles.statistics_new_student_wrapper_new_students_amount}>{countUsers}</p>
        <div className={styles.statistics_new_student_wrapper_new_students_graph}>
          <AreaChart
            width={500}
            height={400}
            data={data2}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#ffff00" fill="#ffff00" />
          </AreaChart>
        </div>
        <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
          <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>
            <span className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info_amount_time}>+{countUsers}</span>
            за последний 31 день
          </p>
        </div>
      </div>
    </>
  )
}
