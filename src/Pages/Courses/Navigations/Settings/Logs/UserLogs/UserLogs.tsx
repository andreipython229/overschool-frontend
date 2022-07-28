import React, { FC, memo } from "react";
import styles from "./userLogs.module.scss";

type UserLogsPropsT = {
  contacts: string;
  whatDoing: string;
  time: string;
};

export const UserLogs: FC<UserLogsPropsT> = memo(({ contacts, whatDoing, time }) => {
  return (
    <div className={styles.logs_user}>
      <div>{contacts}</div>
      <div>{whatDoing}</div>
      <div>{time}</div>
    </div>
  );
});
