import {
  modalTypeClassesTraining,
  modalTypeClassesTask,
  modalTypeClassesText,
  modalTypeClassesWebinar,
  modalTypeClassesWebinarBlock,
  modalTestSvgBlock,
  taskModalIcon,
} from '../constants/svgIcons'
import { basicModalHeaderSvgIcon } from '../../../../constants/iconSvgConstants'
import { pathT } from '../../../common/IconSvg/IconSvg'

export const modalTypeClassesTrainingPath: pathT[] = [
  { d: modalTypeClassesTraining, fill: '#9CA3AF', stroke: '#9CA3AF', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const modalTypeClassesTaskPath: pathT[] = [
  { d: modalTypeClassesTask.d1, fill: '#9CA3AF', stroke: '#9CA3AF', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: modalTypeClassesTask.d2, fill: '#9CA3AF', stroke: '#9CA3AF', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const taskModalPath: pathT[] = [
  { d: taskModalIcon.d1, fill: '#CACDD2', stroke: '#CACDD2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: taskModalIcon.d2, fill: '#CACDD2', stroke: '#CACDD2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const modalTypeClassesTextPath: pathT[] = [
  {
    d: modalTypeClassesText.d1,
    fill: '#9CA3AF',
    stroke: '#9CA3AF',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTypeClassesText.d2,
    fill: '#9CA3AF',
    stroke: '#9CA3AF',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTypeClassesText.d3,
    fill: '#9CA3AF',
    stroke: '#9CA3AF',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTypeClassesText.d4,
    fill: '#9CA3AF',
    stroke: '#9CA3AF',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
]

export const modalTestBlockTextPath: pathT[] = [
  {
    d: modalTestSvgBlock.d1,
    fill: '#CACDD2',
    stroke: '#CACDD2',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTestSvgBlock.d2,
    fill: '#CACDD2',
    stroke: '#CACDD2',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTestSvgBlock.d3,
    fill: '#CACDD2',
    stroke: '#CACDD2',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  {
    d: modalTestSvgBlock.d4,
    fill: '#CACDD2',
    stroke: '#CACDD2',
    strokeWidth: '0.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
]

export const modalTypeClassesWebinarPath: pathT[] = [
  { d: modalTypeClassesWebinar.d1, fill: '#9CA3AF', stroke: '#9CA3AF', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: modalTypeClassesWebinar.d2, fill: '#9CA3AF', stroke: '#9CA3AF', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const modalTypeClassesWebinarBlockPath: pathT[] = [
  { d: modalTypeClassesWebinarBlock.d1, fill: '#CACDD2', stroke: '#CACDD2', strokeLinecap: 'round', strokeLinejoin: 'round' },
  { d: modalTypeClassesWebinarBlock.d2, fill: '#CACDD2', stroke: '#CACDD2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]

export const basicModalHeaderIconPath: pathT[] = [
  { d: basicModalHeaderSvgIcon, fill: '#FFFFFF', stroke: '#CACDD2', strokeLinecap: 'round', strokeLinejoin: 'round' },
]
