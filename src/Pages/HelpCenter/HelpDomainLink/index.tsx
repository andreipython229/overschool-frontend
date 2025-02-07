import { generatePath, useNavigate } from "react-router-dom";
import { FC, memo, useState } from "react";
import { Path } from "../../../enum/pathE";
import styles from "../HelpPage.module.scss";
import localStyles from "./HelpDomainLink.module.scss";
import { logo } from "../../../assets/img/common";
import { Button } from "../../../components/common/Button/Button";
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { InitPageHeader } from "../../Initial/newInitialPageHeader";

export const HelpDomainLink = () => {
    const navigate = useNavigate()
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegistrationOpen, setRegistrationOpen] = useState(false);

    const handleHelpPage = () => {
        navigate(generatePath(Path.HelpPage))
    }

    const handleLoginPage = () => {
        navigate(generatePath(Path.LoginPage))
    }

    const handleRegistrationUser = () => {
        navigate(generatePath(Path.CreateSchool))
    }
    return (
        <div className={`${styles.helpPage} ${localStyles.helpPage}`}>
            <div className={styles.bg}>
                <div className={styles.bg_wrap1}></div>
                <div className={styles.bg_wrap2}></div>
                <div className={styles.bg_wrap3}></div>
                <div className={styles.bg_wrap4}></div>
            </div>
            <InitPageHeader setLoginShow={setLoginOpen} setRegistrationShow={setRegistrationOpen} />
            <div className={styles.sections}>
                <div className={`${localStyles.section}`}>
                    <div className={localStyles.help_title_container}></div>
                </div>
            </div>
        </div>
    )
}