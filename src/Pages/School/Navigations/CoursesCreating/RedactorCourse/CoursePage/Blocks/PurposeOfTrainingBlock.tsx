import React, {useEffect, useState } from 'react';
import styles from "./styles/purposeOfTrainingBlock.module.scss";
import { CardDataT } from "./types/audienceBlockT";
import { PurposeOfTrainingBlockCard } from "./components/PurposeOfTrainingBlockCard";
import { Add } from "@mui/icons-material";
import { TextareaAutosize, useMediaQuery } from '@mui/material';
import {useAppDispatch, useAppSelector,} from "store/hooks";
import {changeBlocks, changeKeys, changeKeysAfterDel, removeFile} from 'store/redux/landing/constructorSlice';
import arrowImage from '../../../../../../../assets/img/common/arrow.png'
import arrowImageMobile from '../../../../../../../assets/img/common/arrowMobile.png'

export const PurposeOfTrainingBlock = () => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)

  // изменение этой переменной тригерит перерендеринг списка карточек
  const [key, setKey] = useState<number>(0)

  const isMobile = useMediaQuery('(max-width: 767px)');

  const setDescription = (val: string) => {
    const lndng = {
      ...landing,
      trainingPurpose: {
        ...landing.trainingPurpose,
        description: val
      }
    }

    dispatch(changeBlocks(lndng));
  }

  // принудительно перерендерить всё, где ключ привязан к состоянию key
  useEffect(() => {
    setKey(Date.now())
  }, [landing.trainingPurpose.chips.length,])

  // добавить карточку по указанному index
  const addCardAtIndex = (index: number) => {
    const chips = landing.trainingPurpose.chips

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

    const lndng = {
      ...landing,
      trainingPurpose: {
        ...landing.trainingPurpose,
        chips: updatedCards
      }
    }

    dispatch(changeBlocks(lndng));
  };

  // удалить карточку с указанным id
  const deleteCard = (position: number) => {
    // меняем индексы в именах файлов из редакса
    dispatch(changeKeysAfterDel({index: position}))
    // удаляем файл из редакса
    dispatch(removeFile({key: `photo_trainingPurpose_${position}`}))

    const newChips = landing.trainingPurpose.chips
      .filter(card => card.position !== position)
      .map((card, i) => {
        return {
        ...card,
          position: i,
        }
      });

    const lndng = {
      ...landing,
      trainingPurpose: {
        ...landing.trainingPurpose,
        chips: newChips
      }
    }

    dispatch(changeBlocks(lndng));
  };

  // отображать ли кнопку добавления после карточки
  const canAddButtonAfterCard = (position: number) => {
    // после каждого 3-го элемента или последнего
    return ((position + 1) === landing.trainingPurpose.chips.length) || ((position + 1) % 3 === 0);
  };

  const getChips = () => {
    return landing.trainingPurpose.chips;
  }
  console.log(landing.trainingPurpose.chips, 'chips');
  
  return (
    <div className={styles.wrapper}>
      <h2>
        Твой результа после курса
      </h2>
      {/* <div className={styles.wrapper_description}>
        <TextareaAutosize
          placeholder="Добавьте описание, если необходимо..."
          minRows={1}
          value={landing.trainingPurpose.description}
          onChange={event => setDescription(event.target.value)}
        />
      </div> */}
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={key - card.position}>
            <div 
              className={`
                ${styles.wrapper_cardContainer_chip}
                ${card.position % 2 === 0 ? styles.wrapper_cardContainer_chip_leftChip : styles.wrapper_cardContainer_chip_rightChip}
              `}
              
            >
              <button
                className={styles.wrapper_cardContainer_chip_addButtonBefor}
                onClick={() => addCardAtIndex(card.position)}
              >
                <Add fontSize="large"/>
              </button>
              <PurposeOfTrainingBlockCard
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
      {landing.trainingPurpose.chips.length === 8 && (
        <div className={styles.wrapper_arrow}>
          <img 
            src={isMobile ? arrowImageMobile : arrowImage} 
            alt="arrowImage" 
          />
        </div>
      )}
    </div>
  );
};

export default PurposeOfTrainingBlock;