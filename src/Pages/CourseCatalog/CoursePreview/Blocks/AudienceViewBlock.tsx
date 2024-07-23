import React from 'react';
import styles from "./styles/audienceVievBlock.module.scss";
import {AudiencViewBlockCard} from "./components/AudiencViewBlockCard"
import {useAppSelector} from "store/hooks";
import {TextareaAutosize} from "@mui/material";

export const AudienceViewBlock = () => {
  const landing = useAppSelector(state => state.landing.blocks)

  const getChips = () => {
    return landing.audience.chips;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        Кому подойдет этот курс?
      </h2>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.audience.description}
        </div>
      </div>
      <div className={styles.wrapper_cardContainer}>
        {getChips().map((card, index) => (
          <React.Fragment key={index}>
            <div className={styles.wrapper_cardContainer_chip}>
              <AudiencViewBlockCard
                position={card.position}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
