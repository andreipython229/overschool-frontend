import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { burgerdHwPath, acceptedHwPath, autoCheckHwPath, underRevisionHwPath, rejectedHwPath, waitingdHwPath } from '../config/commonSvgIconsPath'

export const initialDropDownList = [
  {
    id: 1,
    icon: <IconSvg width={15} height={13} viewBoxSize="0 0 15 15" path={burgerdHwPath} />,
    title: 'Все статусы',
    bg: 'bg_color_hamburger',
    arrow: 'arrow_humburger',
    arrow_fill: '#9A9A9A',
  },

  {
    id: 2,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 20 20" path={acceptedHwPath} />,
    title: 'Принято',
    bg: 'bg_color_accepted',
    arrow: 'arrow_accepted',
    arrow_fill: '#4bc3af',
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
  },
  {
    id: 6,
    icon: <IconSvg width={18} height={18} viewBoxSize="0 0 18 20" path={waitingdHwPath} />,
    title: 'Ждет проверки',
    bg: 'bg_color_waiting',
    arrow: 'arrow_waiting',
    arrow_fill: '#6b7280',
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
  { id: 7, title: 'курсы' },
  { id: 8, title: 'группы' },
  { id: 9, title: 'задание' },
  { id: 10, title: 'последний ответ' },
  { id: 11, title: 'баллы' },
]

export const dropDownListFilterStudents = [
  // { id: 20, title: 'Имя' }  ,
  // { id: 19, title: 'Фамилия' },
  // { id: 17, title: 'курсы' },
  // { id: 18, title: 'группы' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
  { id: 40, title: 'Спрятать удалённых' },
]

export const dropDownListFilterStudentsCourses = [
  // { id: 30, title: 'Имя' }  ,
  // { id: 29, title: 'Фамилия' },
  // { id: 18, title: 'группы' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
]

export const dropDownListFilterStudentsGroups = [
  // { id: 38, title: 'Имя' }  ,
  // { id: 37, title: 'Фамилия' },
  { id: 12, title: 'Суммарный балл' },
  { id: 16, title: 'Средний балл' },
  { id: 15, title: 'Последняя активность' },
]





