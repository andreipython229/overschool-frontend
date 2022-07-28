import React, { FC } from "react";

import styles from "./checkbox.module.scss";

type CheckboxPropsT = {
  id: string;
  name: string;
  checked: boolean;
  onChange: (value: any) => void;
};

export const Checkbox: FC<CheckboxPropsT> = ({ id, name, checked, onChange }) => {
  return (
    <>
      <input
        className={styles.custom_checkbox}
        type="checkbox"
        onChange={onChange}
        name={name}
        id={id}
        checked={checked}
      />
      <label htmlFor={id} />
    </>
  );
};
