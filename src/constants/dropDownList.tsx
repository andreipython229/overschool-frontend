import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { burgerdHwPath, acceptedHwPath, rejectedHwPath, waitingdHwPath } from '../config/commonSvgIconsPath'
import { ReactElement } from 'react'

export interface IDropDownListItem {
  id: number
  icon: ReactElement
  title: string
  bg: string
  arrow: string
  arrow_fill: string
  variant: 'newPrimary' | 'newSecondary' | 'newDelete' | 'newDisabled'
}

export const initialDropDownList: IDropDownListItem[] = [
  {
    id: 1,
    icon: <IconSvg width={15} height={13} viewBoxSize="0 0 15 15" path={burgerdHwPath} />,
    title: 'Все статусы',
    bg: 'bg_color_hamburger',
    arrow: 'arrow_humburger',
    arrow_fill: '#9A9A9A',
    variant: 'newSecondary',
  },

  {
    id: 2,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 20 20" path={acceptedHwPath} />,
    title: 'Принято',
    bg: 'bg_color_accepted',
    arrow: 'arrow_accepted',
    arrow_fill: '#4bc3af',
    variant: 'newPrimary',
  },
  // {
  //   id: 3,
  //   icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={autoCheckHwPath} />,
  //   title: 'Автопроверка',
  //   bg: 'bg_color_auto_check',
  //   arrow: 'arrow_autocheck',
  //   arrow_fill: '#9a9a9a',
  // },
  // {
  //   id: 4,
  //   icon: <IconSvg width={15} height={18} viewBoxSize="0 0 15 20" path={underRevisionHwPath} />,
  //   title: 'На доработке',
  //   bg: 'bg_color_under',
  //   arrow: 'arrow_under_revision',
  //   arrow_fill: '#ffca71',
  // },
  {
    id: 5,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={rejectedHwPath} />,
    title: 'Отклонено',
    bg: 'bg_color_rejected',
    arrow: 'arrow_rejected',
    arrow_fill: '#ef4444',
    variant: 'newDelete',
  },
  {
    id: 6,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />,
    title: 'Ждет проверки',
    bg: 'bg_color_waiting',
    arrow: 'arrow_waiting',
    arrow_fill: '#6b7280',
    variant: 'newDisabled',
  },
]

export const checkHomeworkStatusFilters = [
  {
    id: 1,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 20 20" path={acceptedHwPath} />,
    title: 'Принято',
    bg: 'bg_color_accepted',
    arrow: 'arrow_accepted',
    arrow_fill: '#4bc3af',
  },
  {
    id: 2,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={rejectedHwPath} />,
    title: 'Отклонено',
    bg: 'bg_color_rejected',
    arrow: 'arrow_rejected',
    arrow_fill: '#ef4444',
  },
]

export const dropDownListFilterHomework = [
  { id: 7, title: 'Курсы' },
  { id: 8, title: 'Группы' },
  // { id: 9, title: 'задание' },
  { id: 10, title: 'Последний ответ' },
  { id: 11, title: 'Балл' },
  { id: 5, title: 'Статус' },
  { id: 6, title: 'Преподаватель' },
]

export const dropDownListFilterStudents = [
  // { id: 20, title: 'Имя' }  ,
  // { id: 19, title: 'Фамилия' },
  { id: 17, title: 'Курсы' },
  { id: 18, title: 'Группы' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
  { id: 40, title: 'Спрятать удалённых' },
  { id: 43, title: 'Дата выдачи доступа' },
  { id: 44, title: 'Доступ' },
]

export const dropDownListFilterStudentsCourses = [
  // { id: 30, title: 'Имя' }  ,
  // { id: 29, title: 'Фамилия' },
  // { id: 18, title: 'группы' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
  { id: 45, title: 'Доступ' },
  { id: 47, title: 'Дата выдачи доступа' },
]

export const dropDownListFilterStudentsGroups = [
  // { id: 38, title: 'Имя' }  ,
  // { id: 37, title: 'Фамилия' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
  { id: 46, title: 'Доступ' },
  { id: 48, title: 'Дата выдачи доступа' },
]
