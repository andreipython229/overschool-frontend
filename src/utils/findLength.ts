import { ModulesT } from '../components/Modal/ModalTypes'

export const findLength = (id: number, dataList: ModulesT[]): number | undefined => {
  const findSection = dataList.find((item: ModulesT) => id === item.section)
  if (findSection) {
    return findSection.lessons.length + 1 || 0
  }
}
