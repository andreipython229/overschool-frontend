import { IconSvg } from '../../common/IconSvg/IconSvg'
import * as pathes from './svgIconsPath'

export const LIST_TYPES = [
  {
    label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.labelUnorderedListItemPath} />,
    style: 'unordered-list-item',
  },
  {
    label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.labelOrderedListItemPath} />,
    style: 'ordered-list-item',
  },
]

export const LINK = [
  {
    label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.labelOtherLinksPath} />,
    style: 'LINK',
  },
]

export const BLOCK_TYPES = [
  {
    label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.labelCodeBlockPath} />,
    style: 'code-block',
  },
  {
    label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.labelBlockQuotePath} />,
    style: 'blockquote',
  },
]

export const DIVIDER = [
  {
    label: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
        <rect x="6.5" y="11.375" width="15" height="1.25" fill="#332F36" />
      </svg>
    ),
    style: 'hr',
  },
]

export const INLINE_STYLES = [
  { label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.boldIconPath} />, style: 'BOLD' },
  { label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.italicIconPath} />, style: 'ITALIC' },
  { label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.underlineIconPath} />, style: 'UNDERLINE' },
  { label: <IconSvg width={28} height={24} viewBoxSize="0 0 28 24" path={pathes.strikeThroughIconPath} />, style: 'STRIKETHROUGH' },
]

export const DROPDOWN_STYLES = [
  {
    label: <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={pathes.labelTextAlignStartPath} />,
    style: 'left',
  },
  {
    label: <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={pathes.labelTextAlignCenterPath} />,
    style: 'center',
  },
  {
    label: <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={pathes.labelTextAlignRightPath} />,
    style: 'right',
  },
]
