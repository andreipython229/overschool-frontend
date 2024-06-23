import { blocksNamesE } from "../enum/blocksNamesE"
import {BlockKeys} from "../types/blocksControllerT"

// состояние блоков по умолчанию
export const initialBlocks: BlockKeys = {
  header: {
    id: 0,
    content: blocksNamesE.header,
    visible: true,
    onlyShow: true,
    canUp: false,
    canDown: false,
    photoBackground: "",
    name: "",
    description: "",
  },
  stats: {
    id: 1,
    content: blocksNamesE.stats,
    visible: true,
    canUp: false,
    canDown: false,
    lessonCount: 0,
  },
  audience: {
    id: 2,
    content: blocksNamesE.audience,
    description: "",
    chips: [
        { id: -1, position: 0, photo: "", title: 'Начинающим изучение темы', description: '' },
        { id: -1, position: 1, photo: "", title: 'Профессионалам в данной теме', description: '' },
        { id: -1, position: 2, photo: "", title: 'Специалистам в данной теме', description: '' },
    ],
    visible: true,
    canUp: false,
    canDown: true
  },
  trainingProgram: {
    id: 3,
    content: blocksNamesE.trainingProgram,
    visible: true,
    canUp: true,
    canDown: false,
    sections: []
  },
  trainingPurpose: {
    id: 4,
    content: blocksNamesE.trainingPurpose,
    description: "",
    chips: [
        { id: -1, position: 0, photo: "", title: 'Изучите навык 1', description: '' },
        { id: -1, position: 1, photo: "", title: 'Изучите навык 2', description: '' },
    ],
    visible: true,
    canUp: false,
    canDown: true
  },
}
