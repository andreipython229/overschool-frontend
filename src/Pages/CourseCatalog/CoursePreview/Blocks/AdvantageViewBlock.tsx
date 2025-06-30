import React from 'react';
import styles from "./styles/AdvantageViewBlock.module.scss";
import {useAppSelector} from "store/hooks";
import {TextareaAutosize} from "@mui/material";
import { AdvantageViewBlockCard } from './components/AdvantageViewBlockCard';


export const AdvantageViewBlock = () => {
  const landing = useAppSelector(state => state.landing.blocks)

  const getChips = () => {
    return landing.advantage.chips;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        Почему стоит выбрать сферу IT
      </h2>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.advantage.description}
        </div>
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={index}>
            <div className={styles.wrapper_cardContainer_chip}>
              <AdvantageViewBlockCard
                position={card.position}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
