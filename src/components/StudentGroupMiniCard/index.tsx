import { FC } from 'react'
import styles from './courseSmallBanner.module.scss'
import bgImage from './assets/image.png'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import { PeopleIconSvg } from './assets/iconsComponents'
import { CoursesMiniCardT } from 'types/pageTypes'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { Link, generatePath } from 'react-router-dom'
import { RoleE } from 'enum/roleE'
import { Path } from 'enum/pathE'
import { SettingsGroupModal } from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'
import { useBoolean } from 'customHooks/useBoolean'
import { Portal } from 'components/Modal/Portal'
import { StudentsGroupPropsT } from 'Pages/School/StudentsStats/StudentsCountGroup'

export const StudentGroupMiniCard: FC<StudentsGroupPropsT> = ({ title, type, courseId, countStudent, id, active, click }) => {
  const { role } = useAppSelector(selectUser)
  const [isModalOpen, { on: close, off: open }] = useBoolean()

  const pathLink = generatePath(
    generatePath(Path.School + (role === RoleE.Teacher ? '' : Path.Courses) + `group/${id}`, {
      school_name: localStorage.getItem('school') || window.location.href.split('/')[4],
    }),
  )

  console.log(`active ${id}?:`, active)
  return (
    <>
      {isModalOpen && (
        <Portal closeModal={close}>
          <SettingsGroupModal closeModal={close} name={title} groupId={id} courseId={courseId} />
        </Portal>
      )}
      <div
        className={`${active ? styles.active : ''} ${styles.wrapper}`}
        style={{ background: `url(${bgImage}) rgb(119, 119, 119) 50% / cover no-repeat` }}
        // onClick={() => click && click(id)}
      >
        <Link to={pathLink} style={{ zIndex: 20 }}>
          <div className={styles.wrapper_text}>
            <p className={styles.wrapper_text_title}>{title}</p>
            <p className={styles.wrapper_text_description}>
              <PeopleIconSvg />
              {countStudent} учеников
            </p>
          </div>
        </Link>
        {RoleE.Admin && (
          <div className={styles.wrapper_settings} onClick={open}>
            <IconSvg path={settingsIconPath} viewBoxSize="0 0 24 24" height={24} width={24} />
          </div>
        )}
        <div className={`${styles.wrapper_shadow}`} onClick={() => click && click(id)} />
      </div>
    </>
  )
}
