import { FC, memo } from 'react'
import {Link, NavLink, useParams} from 'react-router-dom'
import styles from '../previou.module.scss'
import {Path} from "../../../enum/pathE";
import {Button} from "../../common/Button/Button";
import {IconSvg} from "../../common/IconSvg/IconSvg";
import {arrowLeftIconPath} from "../../../config/commonSvgIconsPath";


export const CourseStatPrevious: FC = memo(() => {


  return (
      <>
          <div>
              <p className={styles.title_profile}>Ученики платформы</p>
          </div>
          <div className={styles.previousHeader_nav}>
              <NavLink to={Path.Courses}>
                  <Button className={styles.previousHeader_nav_button}
                          variant={"emptyInside"} text={'Назад'}>
                      <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath}/>
                  </Button>
              </NavLink>
          </div>
          <div className={styles.previousCourseStat}>
              <div className={styles.previousCourseStat_title}>
                  <h5 className={styles.previousCourseStat_title_name}>Школа Эдварда Хомицкого</h5>
              </div>
          </div>
      </>
  )
})
