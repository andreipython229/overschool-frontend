import {FC, useState, useEffect} from 'react'
import {Link, NavLink, useParams} from 'react-router-dom'
import {Button} from '../../common/Button/Button'
import styles from '../previou.module.scss'
import {Path} from "../../../enum/pathE";
import {arrowLeftIconPath} from "../../../config/commonSvgIconsPath";
import {IconSvg} from "../../common/IconSvg/IconSvg";
import {useFetchSchoolHeaderQuery} from "../../../api/schoolHeaderService";

export const ProfilePrevious: FC = () => {


    const headerId = localStorage.getItem('header_id')
    const { data, isSuccess, isFetching, isError, isLoading } = useFetchSchoolHeaderQuery(Number(headerId))



    return (
        <>
            <p className={styles.previous_infoBlock_title_name}>Профиль</p>
            <div className={styles.previousHeader_nav}>
                <NavLink to={Path.Courses}>
                    <Button  className={styles.lessonHeader_backToMaterials}
                            variant={"emptyInside"} text={'К материалам курса'}>
                    <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
                        </Button>
                </NavLink>
            </div>
            <div className={styles.previous}>
             <img className={styles.background_image_profile} src={data?.photo_background} alt="bg"/>
            </div>

            </>
    )
}