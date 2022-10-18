// used once at courses/create-course

import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import { IconSvg } from '../IconSvg/IconSvg'
import { selectInputIconPath } from './config/svgIconspath'
import { SelectInputPropsT } from '../commonComponentsTypes'

import styles from './selectInput.module.scss'

export const SelectInput: FC<SelectInputPropsT<object>> = ({ optionsList, optionName, setSelectedValue }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<number>(0)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const handleToggleOptionsOpen = () => {
    setIsOptionsOpen(!selectedOption)
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
          {optionsList.length ? optionsList[selectedOption || 0][optionName] : '------------'}
        </button>
        <ul tabIndex={-1} role="listbox" className={`${styles.options} ${isOptionsOpen ? styles.show : ''}`}>
          {optionsList &&
            optionsList?.map(
              (option, index: number): ReactNode => (
                <li
                  key={option[optionName]}
                  tabIndex={0}
                  role="option"
                  aria-selected={selectedOption === index}
                  onClick={() => {
                    setSelectedOption(index)
                    setIsOptionsOpen(false)
                    setSelectedValue && setSelectedValue(option)
                  }}
                >
                  {option[optionName]}
                </li>
              ),
            )}
        </ul>
      </div>
    </div>
  )
}
