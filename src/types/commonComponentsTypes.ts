import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, FocusEvent, HTMLAttributes, InputHTMLAttributes, ReactNode, PointerEvent } from 'react'

import { IFile } from 'types/filesT'
import { LoginParamsT } from '../utils/validationLogin'

export type AuthSelectPropsT = {
  getInputVariant: (variant: keyof LoginParamsT) => void
}

export type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type SuperButtonPropsT = DefaultButtonPropsType & {
  text: string | ReactNode
  children?: DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement>
  variant?:
    | 'default'
    | 'primary'
    | 'disabled'
    | 'registrationDisabled'
    | 'secondary'
    | 'withoutBack'
    | 'delete'
    | 'logIn'
    | 'create'
    | 'newCreate'
    | 'newLogIn'
    | 'leaveRequest'
    | 'newSecondary'
    | 'goPlatform'
    | 'more'
    | 'tryForFree'
    | 'newPrimary'
    | 'mobile'
    | 'emptyInside'
}

export type CheckboxPropsT = {
  id?: string
  name?: string
  checked?: boolean
  children?: ReactNode
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  style?: string
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
  onClick?: () => void
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
  required?: boolean
}
export type InputBlockT = {
  id?: string
  name: string
  type: string
  value: string
  icon?: string
  label?: string
  placeholder?: string
  onClick?: () => void
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
}

export type InputAuthPropsT = {
  id?: string
  name: string
  type: string
  value: string
  icon?: string
  label?: string
  className?: string
  placeholder?: string
  onClick?: () => void
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
}

export type RadioPropsT = {
  name?: string
  title: string
  id: string | any
  func?: (arg: string) => void
  width?: string
}

export type SelectInputPropsT = {
  optionsList: Array<{ label: string; value: string }>
  selectedOption?: string
  defaultOption?: string
  setSelectedValue?: (value: any) => void
}

export type ToggleButtonDropDownT = {
  isOpen: boolean
  nameOfItems?: string
  handleToggleHiddenBlocks: () => void
}

export interface IDeleteFunc {
  id: number
  schoolName: string
}

export type AudioPlayerT = {
  delete?: (arg: IDeleteFunc) => void
  audioUrls?: IFile[]
  title?: string
  styles?: { [key: string]: string | number }
  files?: File[]
}
