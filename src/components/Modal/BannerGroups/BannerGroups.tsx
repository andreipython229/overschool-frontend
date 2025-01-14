import { Checkbox } from '../../../components/common/Checkbox/Checkbox'
import styles from '../Modal.module.scss'
import { motion } from 'framer-motion'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath, arrowDownPoligonPath } from 'config/commonSvgIconsPath'
import { Button } from 'components/common/Button/Button'
import { studentsGroupT } from 'types/studentsGroup'
import { IBanner } from 'api/apiTypes'
import React, { FC, useState } from 'react'
import { isCheckedFunc } from 'utils/isCheckedFunc'
import { useDeleteBannerMutation, useUpdateSchoolBannerMutation } from 'api/schoolBonusService'
import { useBoolean } from 'customHooks'

export type BannerGroupsT = {
    setShowModal: (value: boolean) => void
    groups: studentsGroupT
    banner: IBanner
    schoolName: string
    refetch: () => void
}

export const BannerGroups: FC<BannerGroupsT> = ({ refetch, schoolName, setShowModal, groups, banner }) => {
    const [activeGroups, setActiveGroups] = useState<number[]>(banner.groups)
    const [allGroups, setAllGroups] = useState<boolean>(activeGroups.length === groups.results.length)
    const [saveChanges, { isLoading }] = useUpdateSchoolBannerMutation()
    const [isEditing, { on: closeEditing, off: openEditing }] = useBoolean(false)


    const handleSelectAllGroups = (event: React.MouseEvent<HTMLButtonElement>) => {
        const groupsIds = groups?.results.map(group => Number(group.group_id))
        setActiveGroups(groupsIds)
    }

    const handleUnselectAllGroups = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveGroups([])
    }

    return (
        <motion.div
            className={styles.banner_groups}
            initial={{
                scale: 0.1,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                delay: 0.5,
            }}
        >
            <div className={styles.container}>
                <div className={styles.container_buttons}>
                    <Button style={{ padding: '12px 30px' }} onClick={handleSelectAllGroups} variant={'newPrimary'} text={'Выбрать все группы'} />
                    <Button style={{ padding: '12px 30px' }} onClick={handleUnselectAllGroups} variant={'cancel'} text={'Снять выделение со всех групп'} />
                </div>

                <span className={styles.main_closed} onClick={async () => {
                    setShowModal(false);
                    const formdata = new FormData();
                    activeGroups.map(grp => formdata.append('groups', String(grp)));
                    await saveChanges({ schoolName: schoolName, data: formdata, id: banner.id })
                        .unwrap()
                        .then(() => {
                            closeEditing()
                            refetch()
                        })
                }
                }>
                    <IconSvg width={64} height={64} viewBoxSize="0 0 64 64" path={crossIconPath} />
                </span>

                {Object.entries(
                    groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
                        const courseName = group.course_name;
                        if (courseName) {
                            if (!acc[courseName]) {
                                acc[courseName] = [];
                            }
                            acc[courseName].push(group);
                        }
                        return acc;
                    }, {}),
                ).map(([courseName, groups]) => {
                    const allGroupsChecked = groups.every(group => isCheckedFunc(group.group_id as number, activeGroups));
                    const someGroupsChecked = groups.some(group => isCheckedFunc(group.group_id as number, activeGroups));


                    const handleCourseCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            setActiveGroups(prevGrps => [
                                ...prevGrps,
                                ...groups.map(group => Number(group.group_id))
                            ]);
                        } else {
                            setActiveGroups(prevGrps =>
                                prevGrps.filter(grp => !groups.map(group => Number(group.group_id)).includes(grp))
                            );
                        }
                    };

                    return (
                        <div className={styles.courses_container} key={courseName} style={{ marginBlockStart: '3px' }}>
                            <div className={styles.course_container}>
                                <div>
                                    <Checkbox
                                        checked={allGroupsChecked || someGroupsChecked}
                                        onChange={handleCourseCheckboxChange}
                                    />
                                    <b>{courseName} (групп: {groups.length})</b>
                                </div>
                                <button className={styles.to_select_groups}>
                                    <IconSvg width={14} height={15} viewBoxSize="0 0 14 15" path={arrowDownPoligonPath}></IconSvg>
                                </button>
                            </div>
                            {groups.map((group) => (
                                <div key={group.group_id} className={styles.group_container}>
                                    <Checkbox
                                        checked={isCheckedFunc(group.group_id as number, activeGroups)}
                                        onChange={e => {
                                            const isChecked = e.target.checked;
                                            if (!isChecked) {
                                                setAllGroups(false);
                                                setActiveGroups(prevGrps => prevGrps.filter(grp => grp !== Number(group.group_id)));
                                            } else {
                                                setActiveGroups(prevGrps => prevGrps.concat(Number(group.group_id)));
                                            }
                                        }}
                                    />
                                    {group.name}
                                    <span> (Кол-во студентов: {group.students.length})</span>
                                </div>
                            ))}
                        </div>
                    );
                })}


                {/* 
                {Object.entries(
                    groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
                        const courseName = group.course_name
                        if (courseName) {
                            if (!acc[courseName]) {
                                acc[courseName] = []
                            }
                            acc[courseName].push(group)
                        }
                        return acc
                    }, {}),
                ).map(([courseName, groups]) => (
                    <div className={styles.courses_container} key={courseName} style={{ marginBlockStart: '3px' }}>
                        <div className={styles.course_container}>
                            <div>
                                <Checkbox></Checkbox>
                                <b>{courseName} (групп: {groups.length})</b>
                            </div>
                            <button
                                className={styles.to_select_groups}>
                                <IconSvg width={14} height={15} viewBoxSize="0 0 14 15" path={arrowDownPoligonPath}></IconSvg>
                            </button>
                        </div>
                        {groups.map((group, index) => (
                            <div key={group.group_id} className={styles.group_container} >
                                <Checkbox
                                    checked={isCheckedFunc(group.group_id as number, activeGroups)}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        if (!isChecked) {
                                            setAllGroups(false)
                                            setActiveGroups(prevGrps => prevGrps.filter(grp => grp !== Number(group.group_id)))
                                        } else {
                                            setActiveGroups(prevGrps => prevGrps.concat(Number(group.group_id)))
                                        }
                                    }}
                                />
                                {group.name}
                                <span> (Кол-во студентов: {group.students.length})</span>
                            </div>
                        ))}
                    </div>
                ))} */}

                {/* 
                {Object.entries(
                    groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
                        if (courseName === group.course_name) {
                            if (!acc[courseName]) {
                                acc[courseName] = [];
                            }
                            acc[courseName].push(group);
                        }
                        return acc;
                    }, {}),
                ).map(([courseName, groups]) => (
                    <div className={styles.courses_container} key={courseName} style={{ marginBlockStart: '3px' }}>
                        {groups.map((group, index) => (
                            <div key={group.group_id} style={{ marginBlockStart: index === 0 ? '3px' : '-10px' }}>
                                <Checkbox
                                    checked={isCheckedFunc(group.group_id as number, activeGroups)}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        if (!isChecked) {
                                            setAllGroups(false)
                                            setActiveGroups(prevGrps => prevGrps.filter(grp => grp !== Number(group.group_id)))
                                        } else {
                                            setActiveGroups(prevGrps => prevGrps.concat(Number(group.group_id)))
                                        }
                                    }}
                                />
                                {group.name}
                                <span> (студентов: {group.students.length})</span>
                            </div>
                        ))}
                    </div>
                ))}
 */}
                {/* <div className={styles.warning_wrapper}>
            
                </div> */}
            </div>
        </motion.div>
    )
}






// type BannerGroupsProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     groups: any; // Замените на правильный тип
//     allGroups: boolean;
//     setAllGroups: (value: boolean) => void;
//     activeGroups: number[];
//     setActiveGroups: (groups: number[]) => void;
// };




// const BannerGroups: React.FC<BannerGroupsProps> = ({ isOpen, onClose, groups, allGroups, setAllGroups, activeGroups, setActiveGroups }) => {
//     const handleAllGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAllGroups(e.target.checked);
//         if (e.target.checked) {
//             // Логика для выбора всех групп
//             const allGroupIds = groups.results.map(group => group.group_id);
//             setActiveGroups(allGroupIds);
//         } else {
//             setActiveGroups([]);
//         }
//     };

//     const isCheckedFunc = (groupId: number, activeGroups: number[]) => {
//         return activeGroups.includes(groupId);
//     };

//     if (!isOpen) return null; // Если модалка не открыта, ничего не рендерим

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 <button onClick={onClose} className={styles.closeButton}>Закрыть</button>
//                 <div className={styles.wrapper_content_groups}>
//                     <span>Группы, в которых будет отображен этот баннер:</span>
//                     <button className={styles.banner_groups_btn}>Выберите одну или несколько групп</button>
//                     <div>
//                         <Checkbox
//                             style={{ color: '#ba75ff' }}
//                             checked={allGroups}
//                             onChange={handleAllGroups}
//                         />
//                         <span>
//                             <b>выбрать все группы</b>
//                         </span>
//                     </div>

//                     {Object.entries(
//                         groups.results.reduce<Record<string, typeof groups.results>>((acc, group) => {
//                             const courseName = group.course_name;
//                             if (courseName) {
//                                 if (!acc[courseName]) {
//                                     acc[courseName] = [];
//                                 }
//                                 acc[courseName].push(group);
//                             }
//                             return acc;
//                         }, {}),
//                     ).map(([courseName, groups]) => (
//                         <div key={courseName} style={{ marginBlockStart: '3px' }}>
//                             <b>{courseName}</b>
//                             {groups.map((group, index) => (
//                                 <div key={group.group_id} style={{ marginBlockStart: index === 0 ? '3px' : '-10px' }}>
//                                     <Checkbox
//                                         style={{ color: '#ba75ff' }}
//                                         checked={isCheckedFunc(group.group_id as number, activeGroups)}
//                                         onChange={e => {
//                                             const isChecked = e.target.checked;
//                                             if (!isChecked) {
//                                                 setAllGroups(false);
//                                                 setActiveGroups(prevGrps => prevGrps.filter(grp => grp !== Number(group.group_id)));
//                                             } else {
//                                                 setActiveGroups(prevGrps => prevGrps.concat(Number(group.group_id)));
//                                             }
//                                         }}
//                                     />
//                                     {group.name}
//                                     <span> (Кол-во студентов: {group.students.length})</span>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BannerGroups;
