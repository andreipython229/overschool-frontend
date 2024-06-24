import React, {useEffect, useState } from 'react';
import styles from "./styles/audienceBlock.module.scss";
import { CardDataT } from "./types/audienceBlockT";
import { AudienceBlockCard } from "./components/AudienceBlockCard";
import { Add } from "@mui/icons-material";
import { TextareaAutosize } from '@mui/material';
import {useAppDispatch, useAppSelector,} from "store/hooks";
import {changeBlocks, changeKeys, changeKeysAfterDel, removeFile} from 'store/redux/landing/constructorSlice';

export const AudienceBlock = () => {
  // const [value, setValue] = useState<string>('');
  // const [isHovered, setIsHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)
  // const audience = useAppSelector(state => state.landing.blocks.audience)

  // const [cards, setCards] = useState<CardDataT[]>([
  //   { id: 0, title: 'Начинающим изучение темы', description: '' },
  //   { id: 1, title: 'Профессионалам в данной теме', description: '' },
  //   { id: 2, title: 'Специалистам в данной теме', description: '' },
  // ]);

  // изменение этой переменной тригерит перерендеринг списка карточек
  const [key, setKey] = useState<number>(0)

  const setDescription = (val: string) => {
    const lndng = {
      ...landing,
      audience: {
        ...landing.audience,
        description: val
      }
    }

    dispatch(changeBlocks(lndng));
  }

  // принудительно перерендерить всё, где ключ привязан к состоянию key
  useEffect(() => {
    setKey(Date.now())
  }, [landing.audience.chips.length,])

  // добавить карточку по указанному index
  const addCardAtIndex = (index: number) => {
    // const newCard: CardDataT = {
    //   id: cards.length, // Обеспечиваем уникальный id для новой карточки
    //   title: 'Заголовок карточки',
    //   description: ''
    // };
    //
    // // Копируем текущие карточки и добавляем новую на нужный индекс
    // const newCards = [...cards];
    // newCards.splice(index, 0, newCard);
    //
    // // Перенумеровываем все карточки
    // const updatedCards = newCards.map((card, i) => ({
    //   ...card,
    //   id: i,
    // }));
    //
    // setCards(updatedCards);

    const chips = landing.audience.chips

    const newCard: CardDataT = {
      id: -1,
      position: chips.length, // Обеспечиваем уникальный id для новой карточки
      photo: '',
      title: 'Заголовок карточки',
      description: ''
    };

    // Копируем текущие карточки и добавляем новую на нужный индекс
    const newCards = [...chips];
    newCards.splice(index, 0, newCard);

    // меняем индексы в именах файлов из редакса
    dispatch(changeKeys({index: index}))

    // Перенумеровываем все карточки
    const updatedCards = newCards.map((card, i) => ({
      ...card,
      position: i,
    }));

    // const lndng = Object.assign({}, landing);
    const lndng = {
      ...landing,
      audience: {
        ...landing.audience,
        chips: updatedCards
      }
    }
    // lndng.audience.block.chips = updatedCards

    dispatch(changeBlocks(lndng));
  };

  // удалить карточку с указанным id
  const deleteCard = (position: number) => {
    // const newCards = cards
    //   .filter(card => card.id !== id)
    //   .map((card, i) => ({
    //     ...card,
    //     id: i,
    //   }));
    //
    // setCards(newCards);

    // меняем индексы в именах файлов из редакса
    dispatch(changeKeysAfterDel({index: position}))
    // удаляем файл из редакса
    dispatch(removeFile({key: `photo_audience_${position}`}))

    const newChips = landing.audience.chips
      .filter(card => card.position !== position)
      .map((card, i) => {
        return {
        ...card,
          position: i,
        }
      });

    const lndng = {
      ...landing,
      audience: {
        ...landing.audience,
        chips: newChips
      }
    }

    dispatch(changeBlocks(lndng));
  };

  // отображать ли кнопку добавления после карточки
  const canAddButtonAfterCard = (position: number) => {
    // после каждого 3-го элемента или последнего
    return ((position + 1) === landing.audience.chips.length) || ((position + 1) % 3 === 0);
  };

  const getChips = () => {
    return landing.audience.chips;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        Кому подойдет этот курс?
      </h2>
      <div className={styles.wrapper_description}>
        <TextareaAutosize
          placeholder="Добавьте описание, если необходимо..."
          minRows={1}
          value={landing.audience.description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={key - card.position}>
          {/*<React.Fragment key={card.id}>*/}
            <div className={styles.wrapper_cardContainer_chip}>
              <button
                className={styles.wrapper_cardContainer_chip_addButtonBefor}
                onClick={() => addCardAtIndex(card.position)}
              >
                <Add fontSize="large"/>
              </button>
              <AudienceBlockCard
                position={card.position}
                onDelete={() => deleteCard(card.position)}
              />
              {canAddButtonAfterCard(card.position) && (
                <button
                  className={styles.wrapper_cardContainer_chip_addButtonAfter}
                  onClick={() => addCardAtIndex(card.position + 1)}
                >
                  <Add fontSize="large"/>
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
        {getChips().length === 0 && (
          <button
            className={styles.wrapper_cardContainer_addButton}
            onClick={() => addCardAtIndex(0)}
          >
            <Add fontSize="large"/>
          </button>
        )}
      </div>
    </div>
  );
};
