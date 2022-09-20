// used once at courses/create-course

import { FC, ReactNode, useState } from 'react'

import { IconSvg } from '../IconSvg/IconSvg'
import { selectInputIconPath } from './config/svgIconspath'
import { SelectInputPropsT } from '../commonComponentsTypes'

import styles from './selectInput.module.scss'

export const SelectInput: FC<SelectInputPropsT> = ({ optionsList }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<number>(0)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const handleToggleOptionsOpen = () => {
    setIsOptionsOpen(!selectedOption)
  }

  return (
    <div className={styles.wrapper} onClick={toggleOptions}>
      <div className={styles.container}>
        <IconSvg
          styles={{ transform: `${isOptionsOpen ? 'rotate(180deg)' : ''}` }}
          width={14}
          height={8}
          viewBoxSize={'0 0 14 8'}
          path={selectInputIconPath}
          functionOnClick={handleToggleOptionsOpen}
        />

        <button className={styles?.container_btn} type="button" aria-haspopup="listbox" aria-expanded={isOptionsOpen}>
          {optionsList[selectedOption]}
        </button>
        <ul
          tabIndex={-1}
          role="listbox"
          // aria-activedescendant={optionsList[selectedOption]}
          className={`${styles.options} ${isOptionsOpen ? styles.show : ''}`}
        >
          {optionsList?.map(
            (option, index: number): ReactNode => (
              <li
                key={index}
                tabIndex={0}
                role="option"
                aria-selected={selectedOption === index}
                onClick={() => {
                  setSelectedOption(index)
                  setIsOptionsOpen(false)
                }}
              >
                {option}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}
