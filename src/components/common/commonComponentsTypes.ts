import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, FocusEvent, HTMLAttributes, InputHTMLAttributes, ReactNode, PointerEvent } from 'react'

import { LoginParamsT } from '../../utils/validationLogin'

export type AuthSelectPropsT = {
  getInputVariant: (variant: keyof LoginParamsT) => void
}

export type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type SuperButtonPropsT = DefaultButtonPropsType & {
  text: string
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>
  variant?: 'default' | 'primary' | 'disabled' | 'registrationDisabled' | 'secondary' | 'withoutBack' | 'delete' | 'logIn' | 'create'
}

export type CheckboxPropsT = {
  id?: string
  name?: string
  checked?: boolean
  children?: ReactNode
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export type CheckSelectPropsT = {
  text: string
  children?: ReactNode
}

export type CheckSelectChildrenPropsT = {
  text: string
}

export type pathT = {
  d: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square'
  strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel'
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  clipRule?: 'nonzero' | 'evenodd' | 'inherit'
}

export type IconSvgT = {
  styles?: { [key: string]: string | number }
  width: number
  height: number
  viewBoxSize?: string
  className?: string
  id?: string | undefined
  path?: pathT[]
  children?: ReactNode
  functionOnClick?: <T>(params: T) => void
  onPointerDown?: (event: PointerEvent<SVGSVGElement | SVGPathElement>) => void
}

export type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type InputPropsT = DefaultInputPropsType & {
  id?: string
  name: string
  type: string
  value: string
  icon?: string
  label?: string
  placeholder?: string
  focus?: boolean
  children?: React.ReactNode | React.ReactNode[] | undefined
  onClick?: () => void
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
}

export type InputAuthPropsT = {
  id?: string
  name: string
  type: string
  value: string
  icon?: string
  label?: string
  placeholder?: string
  onClick?: () => void
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
}

export type RadioPropsT = {
  name?: string
  title: string
  id: string
}

export type SelectInputPropsT = {
  optionsList: Array<string | number>
}

export type ToggleButtonDropDownT = {
  isOpen: boolean
  nameOfItems?: string
  handleToggleHiddenBlocks: () => void
}

export type AudioPlayerT = {
  audioUrl: string
  title?: string
  styles?: { [key: string]: string | number }
}
