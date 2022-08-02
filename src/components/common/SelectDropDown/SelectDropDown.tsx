import React, { useEffect, useState } from "react";
import { IconSvg } from "../IconSvg/IconSvg";
import { initialDropDownList } from "../../../constants/dropDownList";
import { arrowIcon, triangleDownDownIcon } from "../../../constants/iconSvgConstants";
import styles from "./select_drop_down.module.scss";

type dropDownItem = {
  id: number | string;
  icon: {
    width: number;
    height: number;
    fill: string;
    d: string;
  };
  title: string;
  bg: any;
};

const selectTheJobStatus = "ВЫБЕРИТЕ СТАТУС РАБОТЫ";

export const SelectDropDown = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [headerDropDown, setHeaderDropDown] = useState<dropDownItem>(initialDropDownList[0]);
  const [dropDownList, setDropDownList] = useState<dropDownItem[]>([]);

  const handleDropDown = () => {
    setToggleDropDown(!toggleDropDown);
  };

  const handleChangeStatus =
    ({ title }: any) =>
    () => {
      const changeFilterStatusList = initialDropDownList.find(
        (item: dropDownItem): boolean => item.title === title,
      );
      setHeaderDropDown(changeFilterStatusList || initialDropDownList[0]);
      const changeDropDownList = initialDropDownList.filter(
        (item: dropDownItem) => item.title !== title,
      );
      setDropDownList(changeDropDownList);
      setToggleDropDown(false);
    };

  useEffect(() => {
    const defaultDropDownHeader = initialDropDownList.find(
      (item: dropDownItem) => item.title === "Все статусы",
    );
    setHeaderDropDown(defaultDropDownHeader || initialDropDownList[0]);
    const defaultDropDownList = initialDropDownList.filter(
      (item: dropDownItem) => item.title !== "Все статусы",
    );
    setDropDownList(defaultDropDownList);
  }, []);

  return (
    <>
      <p
        onClick={handleDropDown}
        className={`${styles[headerDropDown.bg]} ${styles.header_dropdown_menu}`}
      >
        <IconSvg
          width={headerDropDown.icon.width}
          height={headerDropDown.icon?.height}
          fill={headerDropDown.icon?.fill}
          d={headerDropDown.icon?.d}
        />
        {headerDropDown?.title}
        <span className={toggleDropDown ? styles.rotate_arrow : ""}>
          <IconSvg width={25} height={25} fill="#9A9A9A" d={arrowIcon} />
        </span>
      </p>
      {toggleDropDown && (
        <div className={styles.drop_down_item_container}>
          <div className={styles.triangle}>
            <IconSvg width={30} height={30} fill="#FFFFFF" d={triangleDownDownIcon} />
          </div>
          <p>{selectTheJobStatus}</p>
          {dropDownList.map(({ id, icon, title }) => (
            <div onClick={handleChangeStatus({ title })} className={styles.drop_down_item} key={id}>
              <IconSvg width={icon.width} height={icon.height} d={icon.d} fill={icon.fill} />
              <span>{title}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
