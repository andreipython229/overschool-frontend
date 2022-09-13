import { LoginParamsT } from '../../utils/validationLogin'
import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, FocusEvent, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

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

export type IconSvgT = {
  styles?: { [key: string]: string | number }
  width: number
  height: number
  fill?: string
  d: string
  d2?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square'
  strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel'
  viewBoxSize?: string
  className?: string
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  clipRule?: 'nonzero' | 'evenodd' | 'inherit'
  functionOnClick?: <T>(params: T) => void
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
  title: string
  id: string
}

export type SelectInputPropsT = {
  optionsList: Array<string | number>
}

export type ToggleButtonDropDownT = {
  isOpen: boolean
  handleToggleHiddenBlocks: () => void
}
