import React, {FC, memo} from 'react';
import styles from './previou.module.scss'

type PreviousPropsT = {
    avatar: string
    description?: string
    name: string
    about?: string
}

export const Previous: FC<PreviousPropsT> = memo(({avatar, name, about, description}) => {
    return (
        <div className={styles.previous}>
            <div className={styles.previous_infoBlock}>
                <img className={styles.previous_infoBlock_avatar}
                     src={avatar} alt="Background Cover"/>
                <div className={styles.previous_infoBlock_title}>
                    <p className={styles.previous_infoBlock_title_description}>{description}</p>
                    <span className={styles.previous_infoBlock_title_name}>{name}</span>
                    <p className={styles.previous_infoBlock_title_about}>{about}</p>
                </div>
            </div>
        </div>
    );
});

