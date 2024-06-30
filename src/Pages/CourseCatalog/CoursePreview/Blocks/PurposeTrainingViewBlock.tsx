import React from 'react';
import styles from "./styles/purposeTrainingViewBlock.module.scss"
import {useAppSelector} from "store/hooks";
import {PurposeTrainingViewBlockCard} from "./components/PurposeTrainingViewBlockCard";


export const PurposeTrainingViewBlock = () => {
  const landing = useAppSelector(state => state.landing.blocks)

  const getChips = () => {
    return landing.trainingPurpose.chips;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        Чему Вы научитесь?
      </h2>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.trainingPurpose.description}
        </div>
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={index}>
            <div className={styles.wrapper_cardContainer_chip}>
              <PurposeTrainingViewBlockCard position={card.position}/>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
