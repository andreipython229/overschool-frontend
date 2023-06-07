// used once at courses/create-course

import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import { IconSvg } from '../IconSvg/IconSvg'
import { selectInputIconPath } from './config/svgIconspath'
import { SelectInputPropsT } from '../../../types/commonComponentsTypes'

import styles from './selectInput.module.scss'

export const SelectInput: FC<SelectInputPropsT> = ({ optionsList, selectedOption, defaultOption = 'выбрать', setSelectedValue }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [selectOption, setSelectOption] = useState<number | null>(null)
  const [defaultOp, setDefaultOp] = useState<string>('')

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const handleToggleOptionsOpen = () => {
    setIsOptionsOpen(!selectOption)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (!menuRef.current?.contains(target)) {
      setIsOptionsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (typeof selectedOption !== 'undefined') {
      const indexOfItem = optionsList.findIndex(option => option.value.toLowerCase() === selectedOption?.toLowerCase())

      if (indexOfItem !== -1) {
        setSelectOption(indexOfItem)
        setDefaultOp('')
      } else {
        setSelectOption(null)
        setDefaultOp(defaultOption || '')
      }
    }
  }, [selectedOption])

  return (
    <div ref={menuRef} className={styles.wrapper} onClick={toggleOptions}>
      <div className={styles.container}>
        <IconSvg
          styles={{ transform: `${isOptionsOpen ? 'rotate(180deg)' : ''}` }}
          width={20}
          height={14}
          viewBoxSize={'0 0 14 7'}
          path={selectInputIconPath}
          functionOnClick={handleToggleOptionsOpen}
        />

        <button className={styles?.container_btn} type="button" aria-haspopup="listbox" aria-expanded={isOptionsOpen}>
          {defaultOp ? defaultOp : optionsList[selectOption!]?.label}
        </button>
        <ul tabIndex={-1} role="listbox" className={`${styles.options} ${isOptionsOpen ? styles.show : ''}`}>
          {optionsList?.map((option, index: number) => (
            <li
              key={index}
              tabIndex={0}
              role="option"
              aria-selected={selectOption === index}
              onClick={() => {
                setSelectOption(index)
                setDefaultOp('')
                setIsOptionsOpen(false)
                setSelectedValue && setSelectedValue(option.value)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
