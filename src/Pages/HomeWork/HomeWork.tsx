import { useState, FC } from 'react'

import { SelectDropDown } from '../../components/SelectDropDown/SelectDropDown'
import { FiltersButton } from '../../components/FiltersButton'
import { Input } from '../../components/common/Input/Input/Input'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { dropDownListFilter } from '../../constants/dropDownList'
import { HomeworksStatsTable } from '../../components/HomeworksStatsTable'
import { searchIconPath } from '../../config/commonSvgIconsPath'
import { ModalCheckHomeWork } from '../../components/Modal/ModalCheckHomeWork/ModalCheckHomeWork'

import styles from './home_work.module.scss'

export const HomeWork: FC = () => {
  const [arrowUsersState, setArrowUsersState] = useState<string[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [userHomeworkId, setUserHomeworkId] = useState<number>(0)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onSelectUserHomeworkId = (id: number) => {
    setUserHomeworkId(id)
  }

  return (
    <>
      <h3>Входящие работы от учеников</h3>
      <div className={styles.container}>
        <SelectDropDown setArrowUsersState={setArrowUsersState} />
        <FiltersButton filteringCategoriesList={dropDownListFilter} />
        <Input name="" type="search" value={''} onChange={() => console.log('заглушка')} placeholder="Поиск по ученикам и заданиям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>
      <HomeworksStatsTable onSelectUserHomeworkId={onSelectUserHomeworkId} handleOpenModal={handleOpenModal} />
      {isModalOpen && <ModalCheckHomeWork userHomeworkId={userHomeworkId} />}
    </>
  )
}
