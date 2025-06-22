import React from 'react';
import styles from "./audiencViewBlockCard.module.scss"
import {Avatar} from '@mui/material';
import {useAppSelector} from "store/hooks";
import {AudienceCardViewPropT} from "../../types/LandingT";

export const AudiencViewBlockCard: React.FC<AudienceCardViewPropT> = ({position}) => {
  const landing = useAppSelector(state => state.landing.blocks)

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_imageBox}>
        {/* <Avatar
          alt="Overschool"
          src={landing.audience.chips[position].photo}
          sx={{width: 125, height: 125}}
        /> */}
        <img
          src={landing.audience.chips[position].photo}
          alt={landing.audience.chips[position].photo}
          width={170}
          height={170}
        />
      </div>
      <div className={styles.wrapper_title}>
        <div className={styles.wrapper_title_text}>
          {landing.audience.chips[position].title}
        </div>
      </div>
      <div className={styles.wrapper_description}>
        <div className={styles.wrapper_description_text}>
          {landing.audience.chips[position].description}
        </div>
      </div>
    </div>
  );
};
