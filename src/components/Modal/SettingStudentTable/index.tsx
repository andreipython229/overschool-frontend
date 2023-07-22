import {FC, useState, useEffect, ChangeEvent} from 'react'
import {Reorder} from 'framer-motion'

import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {SettingStudentTableT} from '../ModalTypes'
import {IconSvg} from '../../common/IconSvg/IconSvg'
import {SettingItem} from './SettingItem'
import {crossIconPath} from '../../../config/commonSvgIconsPath'
import {useFetchStudentsTableHeaderQuery, usePatchStudentsTableHeaderMutation} from '../../../api/studentTableService'
import {studentGroupInfoT} from 'types/studentsGroup'
import {useDebounceFunc} from 'customHooks/useDebounceFunc'
import {checkedIconPath} from './config/svgIconsPath'

import styles from '../Modal.module.scss'
import scss from './settingStudentTable.module.scss'
import itemStyles from './SettingItem/settingItem.module.scss'

export const SettingStudentTable: FC<SettingStudentTableT> = ({setShowModal, tableId}) => {
    const {data: studentsTableInfo, isSuccess} = useFetchStudentsTableHeaderQuery(tableId)

    const [patchTable] = usePatchStudentsTableHeaderMutation()

    const debounced = useDebounceFunc(() => patchTable({
        id: tableId,
        students_table_info: nameAndEmailSettingsList.concat(settingList)
    }), 2000)

    const [checkedList, setIsCheckedList] = useState<studentGroupInfoT[]>([])
    const [settingList, setSettingsList] = useState<studentGroupInfoT[]>([])
    const [nameAndEmailSettingsList, setNameAndEmailSettingsList] = useState<studentGroupInfoT[]>([])

    const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
        if (checkedList.length >= 3 && event.target.checked) {
            return
        }

        const checkedItemsList = settingList.map(item => {
            if (item.order.toString() === event.target.id.toString()) {
                return {
                    ...item,
                    checked: event.target.checked,
                }
            }
            return item
        })
        setSettingsList(checkedItemsList)
    }

    const closeSettingsModal = () => {
        setShowModal()
    }

    useEffect(() => {
        if (isSuccess) {
            setSettingsList(studentsTableInfo?.students_table_info.filter(item => item.name !== 'Имя' && item.name !== 'Email'))
            setNameAndEmailSettingsList(studentsTableInfo?.students_table_info.filter(item => item.name === 'Имя' || item.name === 'Email'))
        }
    }, [isSuccess])

    useEffect(() => {
        debounced()
        const isCheckedListItem = settingList.filter(checkedItem => checkedItem.checked)
        setIsCheckedList(isCheckedListItem)
    }, [settingList])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
        <span className={styles.main_closed}>
          <IconSvg functionOnClick={closeSettingsModal} width={18} height={18} viewBoxSize="0 0 15 15"
                   path={crossIconPath}/>
        </span>
                <div className={styles.settings_title}>Настройка таблицы учеников</div>
                <p style={{fontSize: '14px', textAlign: 'center', margin: '10px 0', userSelect: 'none'}}>Выберите до 5
                    колонок для отображения в таблице</p>
                <form className={scss.form}>
                    {nameAndEmailSettingsList.map(item => (
                        <div className={`${itemStyles.wrapper_item} ${styles.wrapper_item_init}`} key={item.id}>
                            <Checkbox id={item.order.toString()} name={item?.name} onChange={handleChecked}
                                      checked={item.checked}>
                                <p>{item.name}</p>
                                <div
                                    className={`${itemStyles.wrapper_item_icon} ${item.checked ? itemStyles.wrapper_item_icon_checked : ''}`}>
                                    <IconSvg width={20} height={20} viewBoxSize={'0 0 19 19'} path={checkedIconPath}>
                                        <circle cx="8.5" cy="8.5" r="8" stroke="currentColor"/>
                                    </IconSvg>
                                </div>
                            </Checkbox>
                        </div>
                    ))}
                    <Reorder.Group className={styles.settings_list} as="ul" onReorder={setSettingsList}
                                   values={settingList}>
                        {settingList.map((item: studentGroupInfoT) => (
                            <SettingItem key={item.order} item={item} handleChecked={handleChecked}/>
                        ))}
                    </Reorder.Group>
                </form>
            </div>
        </div>
    )
}
