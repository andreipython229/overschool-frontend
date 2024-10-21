import { FC } from 'react'
import styles from './studentProgress.module.scss'
import { WaterProgress } from './assets/waterProgress'
import { useFetchProgressQuery } from 'api/userProgressService'
import { useFetchCourseQuery } from 'api/coursesServices'
import { useFetchModulesQuery } from 'api/modulesServices'
import { useParams } from 'react-router-dom'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import firstMedal from './assets/1st_place.png'
import secondMedal from './assets/2nd_place.png'
import thirdMedal from './assets/3rd_place.png'
import person from './assets/defaultPerson.png'
import { useFetchProfileDataQuery } from 'api/profileService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { CameraDefs, HomeworkDefs, TestDefs, cloudSvgPath, homeworkSvgIconPath, testSvgIconPath, videoCameraSvgIconPath } from './assets/svgIconsPath'

export const StudentProgressBlock: FC = () => {
  const school = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()
  const { data: userProgress, isLoading, isError } = useFetchProgressQuery({ course_id: courseId as string, schoolName: school })
  const { data: profile } = useFetchProfileDataQuery()

  if (!userProgress || !profile) {
    return <SimpleLoader />
  }
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressWrapper_overallProgress}>
        <WaterProgress percentage={userProgress.courses[0].completed_percent} />
        <div className={styles.progressWrapper_overallProgress_text}>
          <p>Ваш прогресс</p>
          <span>Вы на 75 % лучше других учеников</span>
        </div>
      </div>
      <div className={styles.progressWrapper_peopleStats}>
        <div className={styles.progressWrapper_peopleStats_text}>
          <h3>Общий прогресс</h3>
          <h4>среди учеников</h4>
        </div>
        <div className={styles.progressWrapper_peopleStats_rates}>
          {userProgress.courses[0].top_leaders && userProgress.courses[0].top_leaders.length && userProgress.courses[0].top_leaders[1] ? (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-end' }}>
              <div
                className={styles.progressWrapper_peopleStats_rates_rate2}
                style={{ backgroundImage: `url(${userProgress.courses[0].top_leaders[1].student_avatar})` }}
              >
                <img src={secondMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>{userProgress.courses[0].top_leaders[1].progress_percent}%</h4>
              <h5>{userProgress.courses[0].top_leaders[1].student_name}</h5>
            </div>
          ) : (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-end' }}>
              <div className={styles.progressWrapper_peopleStats_rates_rate2} style={{ backgroundImage: `url(${person})` }}>
                <img src={secondMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>-</h4>
              <h5>-</h5>
            </div>
          )}
          {userProgress.courses[0].top_leaders && userProgress.courses[0].top_leaders.length && userProgress.courses[0].top_leaders[0] ? (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-start' }}>
              <div
                className={styles.progressWrapper_peopleStats_rates_rate1}
                style={{ backgroundImage: `url(${userProgress.courses[0].top_leaders[0].student_avatar})` }}
              >
                <img src={firstMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>{userProgress.courses[0].top_leaders[0].progress_percent}%</h4>
              <h5>{userProgress.courses[0].top_leaders[0].student_name}</h5>
            </div>
          ) : (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-start' }}>
              <div className={styles.progressWrapper_peopleStats_rates_rate1} style={{ backgroundImage: `url(${person})` }}>
                <img src={firstMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>-</h4>
              <h5>-</h5>
            </div>
          )}
          {userProgress.courses[0].top_leaders && userProgress.courses[0].top_leaders.length && userProgress.courses[0].top_leaders[2] ? (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-end' }}>
              <div
                className={styles.progressWrapper_peopleStats_rates_rate3}
                style={{ backgroundImage: `url(${userProgress.courses[0].top_leaders[2].student_avatar})` }}
              >
                <img src={thirdMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>{userProgress.courses[0].top_leaders[2].progress_percent}%</h4>
              <h5>{userProgress.courses[0].top_leaders[2].student_name}</h5>
            </div>
          ) : (
            <div className={styles.personProgressData} style={{ alignSelf: 'flex-end' }}>
              <div className={styles.progressWrapper_peopleStats_rates_rate3} style={{ backgroundImage: `url(${person})` }}>
                <img src={thirdMedal} className={styles.progressWrapper_peopleStats_rates_rate1_medal} />
              </div>
              <h4>-</h4>
              <h5>-</h5>
            </div>
          )}
        </div>
        <div className={styles.progressWrapper_peopleStats_personalData}>
          <div className={styles.progressWrapper_peopleStats_personalData_title}>ТОП среди учеников</div>
          <div className={styles.progressWrapper_peopleStats_personalData_placement}>
            <div className={styles.progressWrapper_peopleStats_personalData_placement_text}>
              <h5>Ваше место в рейтинге :</h5>
              <h3>{userProgress.courses[0].rank_in_course || 4}</h3>
            </div>
            <div className={styles.progressWrapper_peopleStats_personalData_placement_progressData}>
              <div className={styles.progressWrapper_peopleStats_personalData_placement_progressData_photoBlock}>
                <img src={profile[0].avatar} className={styles.progressWrapper_peopleStats_personalData_placement_progressData_photoBlock_photo} />
                <p className={styles.progressWrapper_peopleStats_personalData_placement_progressData_photoBlock_username}>
                  {profile[0].user.first_name}
                </p>
              </div>
              <div className={styles.progressWrapper_peopleStats_personalData_placement_progressData_percent}>
                <h4>{userProgress.courses[0].completed_percent}%</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.progressWrapper_progressSlice}>
        <div className={styles.progressWrapper_progressSlice_block}>
          <IconSvg path={cloudSvgPath} viewBoxSize="0 0 140 112" width={140} height={112}>
            <defs>
              <linearGradient id="paint0_linear_10465_64756" x1="17.063" y1="110.693" x2="109.937" y2="18.3054" gradientUnits="userSpaceOnUse">
                <stop offset="0.135" stopColor="#3170E7" />
                <stop offset="1" stopColor="#7A90F7" />
              </linearGradient>
            </defs>
          </IconSvg>
          <div className={styles.progressWrapper_progressSlice_block_ball}>{userProgress.courses[0].average_mark || '-'}</div>
          <h4>Средний балл</h4>
        </div>
        <div className={styles.progressWrapper_progressSlice_block} style={{ gap: 0, justifyContent: 'flex-start' }}>
          <IconSvg width={164} height={160} viewBoxSize="0 0 164 160" path={testSvgIconPath}>
            <TestDefs />
          </IconSvg>
          <h4>
            {userProgress.courses[0].tests.completed_lessons}/{userProgress.courses[0].tests.all_lessons} тестов
          </h4>
        </div>
        <div className={styles.progressWrapper_progressSlice_block} style={{ gap: 0, justifyContent: 'flex-start' }}>
          <IconSvg width={180} height={160} viewBoxSize="0 0 180 160" path={videoCameraSvgIconPath}>
            <CameraDefs />
          </IconSvg>
          <h4>
            {userProgress.courses[0].lessons.completed_lessons}/{userProgress.courses[0].lessons.all_lessons} уроков
          </h4>
        </div>
        <div className={styles.progressWrapper_progressSlice_block} style={{ gap: 0, justifyContent: 'flex-start' }}>
          <IconSvg width={180} height={160} viewBoxSize="0 0 180 160" path={homeworkSvgIconPath}>
            <HomeworkDefs />
          </IconSvg>
          <h4 className={styles.hw}>
            {userProgress.courses[0].homeworks.completed_lessons}/{userProgress.courses[0].homeworks.all_lessons} <p>Домашних работ</p>
          </h4>
        </div>
      </div>
    </div>
  )
}
