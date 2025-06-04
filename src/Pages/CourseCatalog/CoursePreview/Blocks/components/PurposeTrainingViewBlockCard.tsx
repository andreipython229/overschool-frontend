import React from 'react';
import styles from "./purposeTrainingViewBlockCard.module.scss"
import {Avatar} from '@mui/material';
import {useAppSelector} from "store/hooks";
import {AudienceCardViewPropT} from "../../types/LandingT";

export const PurposeTrainingViewBlockCard: React.FC<AudienceCardViewPropT> = ({position}) => {
  const landing = useAppSelector(state => state.landing.blocks)

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_imageBox}>
        {/* <Avatar
          alt="Overschool"
          src={landing.trainingPurpose.chips[position].photo}
          sx={{width: 125, height: 125}}
        /> */}
        <img 
          src={landing.trainingPurpose.chips[position].photo}
          alt={landing.trainingPurpose.chips[position].photo}
          width={100}
          height={100}
        />
      </div>
      {/* <div className={styles.wrapper_title}>
        <div className={styles.wrapper_title_text}>
          {landing.trainingPurpose.chips[position].title}
        </div>
      </div> */}
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.trainingPurpose.chips[position].description}
        </div>
      </div>
    </div>
  );
};