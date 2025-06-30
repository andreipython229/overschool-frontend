import React from 'react';
import styles from "./AdvantageViewBlockCard.module.scss"
import {useAppSelector} from "store/hooks";
import {AdvantageCardViewPropT} from "../../types/LandingT";

export const AdvantageViewBlockCard: React.FC<AdvantageCardViewPropT> = ({position}) => {
  const landing = useAppSelector(state => state.landing.blocks)

  return (
    <div className={styles.wrapper}>
        <div className={styles.wrapper_imageBox}>
            <img
                src={landing.advantage.chips[position].photo}
                alt={landing.advantage.chips[position].photo}
                width={100}
                height={100}
            />
        </div>
        <div>
            <div className={styles.wrapper_title}>
                <div className={styles.wrapper_title_text}>
                    {landing.advantage.chips[position].title}
                </div>
            </div>
            <div className={styles.wrapper_description}>
                <div className={styles.wrapper_description_text}>
                    {landing.advantage.chips[position].description}
                </div>
            </div>
        </div>
    </div>
  );
};
