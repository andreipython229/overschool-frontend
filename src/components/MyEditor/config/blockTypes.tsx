import { IconSvg } from '../../common/IconSvg/IconSvg'
import {
  labelHeaderOnePath,
  labelHeaderTwoPath,
  labelHeaderThreePath,
  labelBlockQuotePath,
  labelUnorderedListItemPath,
  labelOrderedListItemPath,
  labelCodeBlockPath,
  labelImagePath,
} from './svgIconsPath'

export const BLOCK_TYPES = [
  {
    label: <IconSvg width={13} height={12} viewBoxSize="0 0 13 12" path={labelHeaderOnePath} />,
    style: 'header-one',
  },
  {
    label: <IconSvg width={14} height={12} viewBoxSize="0 0 14 12" path={labelHeaderTwoPath} />,
    style: 'header-two',
  },
  {
    label: <IconSvg width={14} height={12} viewBoxSize="0 0 14 12" path={labelHeaderThreePath} />,
    style: 'header-three',
  },
  {
    label: <IconSvg width={12} height={10} viewBoxSize="0 0 12 10" path={labelBlockQuotePath} />,
    style: 'blockquote',
  },
  {
    label: <IconSvg width={12} height={12} viewBoxSize="0 0 12 12" path={labelUnorderedListItemPath} />,
    style: 'unordered-list-item',
  },
  {
    label: <IconSvg width={12} height={12} viewBoxSize="0 0 12 12" path={labelOrderedListItemPath} />,
    style: 'ordered-list-item',
  },
  {
    label: <IconSvg width={16} height={12} viewBoxSize="0 0 16 12" path={labelCodeBlockPath} />,
    style: 'code-block',
  },
  {
    label: <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={labelImagePath} />,
    style: 'IMAGE',
  },
]

export const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]
