import { sectionT } from 'types/sectionT'

export const findLength = (id: number, dataList: sectionT[]): number | undefined => {
  const findSection = dataList.find(item => id === item.section)
  if (findSection) {
    return findSection.lessons.length + 1 || 0
  }
}
