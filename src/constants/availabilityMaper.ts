import { noPublishedIconPath, publishedIconPath } from '../Pages/Courses/config/svgIconsPath'

export const availabilityMaper = {
  all: 'О',
  studentsOnly: 'С',
  nobody: 'Н',
}

export const availabilityMaperText: any = {
  О: { title: 'Опубликован', iconSvg: publishedIconPath },
  С: { title: 'Скрыт настройками курса', iconSvg: publishedIconPath },
  Н: { title: 'Не опубликован', iconSvg: noPublishedIconPath },
}
