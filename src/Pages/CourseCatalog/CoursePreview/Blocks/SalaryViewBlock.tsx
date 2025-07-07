import React from 'react';
import styles from "./styles/SalaryViewBlock.module.scss";
import {useAppSelector} from "store/hooks";
import { SalaryViewBlockCard } from './components/SalaryViewBlockCard';


export const SalaryViewBlock = () => {
  const landing = useAppSelector(state => state.landing.blocks)

  const getChips = () => {
    return landing.income.chips;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        Сколько можно зарабатывать
      </h2>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.income.description}
        </div>
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={index}>
            <div className={styles.wrapper_cardContainer_chip}>
              <SalaryViewBlockCard
                position={card.position}
                isFirst = {card.position === 0}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
