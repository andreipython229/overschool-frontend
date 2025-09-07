import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { changeBlocks, changeKeys, changeKeysAfterDel, removeFile } from 'store/redux/landing/constructorSlice'
import { CardDataT } from './types/audienceBlockT'
import styles from './styles/SalaryBlock.module.scss'
import { Add } from '@mui/icons-material'
import { SalaryBlockCard } from './components/SalaryBlockCard'

export const SalaryBlock = () => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  const [key, setKey] = useState<number>(0)

  const setDescription = (val: string) => {
    const lndng = {
      ...landing,
      income: {
        ...landing.income,
        description: val,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  // принудительно перерендерить всё, где ключ привязан к состоянию key
  useEffect(() => {
    setKey(Date.now())
  }, [landing.income.chips.length])

  // добавить карточку по указанному index
  const addCardAtIndex = (index: number) => {
    const chips = landing.income.chips

    const newCard: CardDataT = {
      id: -1,
      position: chips.length, // Обеспечиваем уникальный id для новой карточки
      photo: '',
      title: 'Заголовок карточки',
      description: '',
    }

    // Копируем текущие карточки и добавляем новую на нужный индекс
    const newCards = [...chips]
    newCards.splice(index, 0, newCard)

    // меняем индексы в именах файлов из редакса
    dispatch(changeKeys({ index: index }))

    // Перенумеровываем все карточки
    const updatedCards = newCards.map((card, i) => ({
      ...card,
      position: i,
    }))

    const lndng = {
      ...landing,
      income: {
        ...landing.income,
        chips: updatedCards,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  // удалить карточку с указанным id
  const deleteCard = (position: number) => {
    // меняем индексы в именах файлов из редакса
    dispatch(changeKeysAfterDel({ index: position }))
    // удаляем файл из редакса
    dispatch(removeFile({ key: `photo_income_${position}` }))

    const newChips = landing.income.chips
      .filter(card => card.position !== position)
      .map((card, i) => {
        return {
          ...card,
          position: i,
        }
      })

    const lndng = {
      ...landing,
      income: {
        ...landing.income,
        chips: newChips,
      },
    }

    dispatch(changeBlocks(lndng))
  }

  // отображать ли кнопку добавления после карточки
  const canAddButtonAfterCard = (position: number) => {
    // после каждого 3-го элемента или последнего
    return position + 1 === landing.income.chips.length || (position + 1) % 3 === 0
  }

  const getChips = () => {
    return landing.income.chips
  }

  return (
    <div className={styles.wrapper}>
      <h2>Сколько можно зарабатывать</h2>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={key - card.position}>
            <div className={styles.wrapper_cardContainer_chip}>
              <button className={styles.wrapper_cardContainer_chip_addButtonBefor} onClick={() => addCardAtIndex(card.position)}>
                <Add fontSize="large" />
              </button>
              <SalaryBlockCard position={card.position} onDelete={() => deleteCard(card.position)} isFirst={card.position === 0} />
              {canAddButtonAfterCard(card.position) && (
                <button className={styles.wrapper_cardContainer_chip_addButtonAfter} onClick={() => addCardAtIndex(card.position + 1)}>
                  <Add fontSize="large" />
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
        {getChips().length === 0 && (
          <button className={styles.wrapper_cardContainer_addButton} onClick={() => addCardAtIndex(0)}>
            <Add fontSize="large" />
          </button>
        )}
      </div>
    </div>
  )
}
