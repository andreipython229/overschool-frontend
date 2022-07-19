import React, {FC, useState} from 'react';
import styles from './selectInput.module.scss'

type SelectInputPropsT = {
    optionsList: string[]
}

export const SelectInput: FC<SelectInputPropsT> = ({optionsList}) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<number>(0)


    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <svg style={{transform: `${isOptionsOpen ? 'rotate(180deg)' : ''}`}} width="14" height="8"
                     viewBox="0 0 14 8"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.851982 0.518485C1.20996 0.160505 1.79036 0.160505 2.14834 0.518485L7.00016 5.3703L11.852 0.518485C12.21 0.160505 12.7904 0.160505 13.1483 0.518485C13.5063 0.876466 13.5063 1.45687 13.1483 1.81485L7.64834 7.31485C7.29036 7.67283 6.70996 7.67283 6.35198 7.31485L0.851982 1.81485C0.494001 1.45687 0.494001 0.876466 0.851982 0.518485Z"
                        fill="#A8ABAD"/>
                </svg>

                <button type={'button'}
                        onClick={toggleOptions} aria-haspopup={'listbox'} aria-expanded={isOptionsOpen}
                >
                    {optionsList[selectedOption]}
                </button>
                <ul tabIndex={-1} role={'listbox'} aria-activedescendant={optionsList[selectedOption]}
                    className={styles.options + ' ' + (isOptionsOpen ? styles.show : '')}>
                    {optionsList.map((option, index) => (
                        <li key={index} tabIndex={0}
                            role={'option'}
                            aria-selected={selectedOption == index}
                            onClick={() => {
                                setSelectedOption(index)
                                setIsOptionsOpen(false)
                            }}>
                            {option}
                        </li>))}
                </ul>
            </div>
        </div>
    );
};

