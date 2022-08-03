import { iconSvgHomeWorkPage } from './iconSvgConstants'

export const initialDropDownList = [
  {
    id: 1,
    icon: {
      width: 25,
      height: 25,
      fill: '#6B7484',
      d: iconSvgHomeWorkPage.hamburgerIcon,
    },
    title: 'Все статусы',
    bg: 'bg_color_hamburger',
    viewBoxSize: '0 0 20 12',
  },

  {
    id: 2,
    icon: {
      width: 25,
      height: 25,
      fill: '#17B198',
      d: iconSvgHomeWorkPage.acceptedDropdownBox,
    },

    title: 'Принято',
    bg: 'bg_color_accepted',
  },
  {
    id: 3,
    icon: {
      width: 25,
      height: 25,
      fill: '#6B7484',
      d: iconSvgHomeWorkPage.autoCheckDropdownBox,
    },
    title: 'Автопроверка',
    bg: 'bg_color_auto_check',
  },
  {
    id: 4,
    icon: {
      width: 25,
      height: 25,
      fill: '#FFCA71',
      d: iconSvgHomeWorkPage.underRevision,
    },
    title: 'На доработке',
    bg: 'bg_color_under',
  },
  {
    id: 5,
    icon: {
      width: 25,
      height: 25,
      fill: '#FF2C2C',
      d: iconSvgHomeWorkPage.rejected,
    },
    title: 'Отклонено',
    bg: 'bg_color_rejected',
  },
  {
    id: 6,
    icon: {
      width: 25,
      height: 25,
      fill: '#717985',
      d: iconSvgHomeWorkPage.waitingForVerification,
    },
    title: 'Ждёт проверки',
    bg: 'bg_color_waiting',
  },
]

export const dropDownListFilter = [
  { id: 1, title: 'курсы', isOpen: false },
  { id: 2, title: 'группа', isOpen: false },
  { id: 3, title: 'задание', isOpen: false },
  { id: 4, title: 'последний ответ', isOpen: false },
  { id: 5, title: 'баллы', isOpen: false },
]
