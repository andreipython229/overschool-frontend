import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import styles from "./button.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsT = DefaultButtonPropsType & {
  text: string;
  variant?: "default" | "primary" | "disabled" | "registrationDisabled";
};

export const Button: FC<SuperButtonPropsT> = ({ text, variant = "default", ...restProps }) => {
  let propsStyle = styles.btn_default;

  if (variant === "primary") {
    propsStyle += " " + styles.primary;
  } else if (variant === "disabled") {
    propsStyle += " " + styles.disabled;
  } else if (variant === "registrationDisabled") {
    propsStyle += " " + styles.registartionDisabled;
  } else {
    propsStyle = styles.btn_default;
  }

  return (
    <div>
      <button {...restProps} className={restProps.className || propsStyle}>
        {text}
      </button>
    </div>
  );
};
