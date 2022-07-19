import React, {FC, memo} from 'react';
import styles from './logoAddBlock.module.scss'

type LogoAddBlockPropsT = {
    title: string
    logotype: string
    logoDesc: string
    aboutRequirements: string
    requirementsArr: string[]
}

export const LogoAddBlock: FC<LogoAddBlockPropsT> = memo(({
                                                              logotype,
                                                              logoDesc,
                                                              aboutRequirements,
                                                              requirementsArr,
                                                              title
                                                          }) => {
        return (
            <section className={styles.logoBlock}>
                <span className={styles.logoBlock_title}>{title}</span>
                <span className={styles.logoBlock_desc}>{logoDesc}</span>
                <div className={styles.logoBlock_information}>
                    <img src={logotype} alt="Logotype from course"/>
                    <div className={styles.logoBlock_information_requirements}>
                        <div className={styles.logoBlock_information_requirements_title}>{aboutRequirements}</div>
                        {requirementsArr.map((el, id) => {
                            return <p key={id}>{id + 1}. {el}</p>
                        })}
                    </div>
                </div>

            </section>
        );
    }
)