import React, {FC, memo} from 'react';
import styles from './infoAboutPlatform.module.scss'

type InfoAboutPlatformPropsT = {
    children: any
}

export const InfoAboutPlatform: FC<InfoAboutPlatformPropsT> = memo(({children}) => {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        );
    })
;


