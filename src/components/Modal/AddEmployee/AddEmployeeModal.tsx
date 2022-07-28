import React, { FC, memo } from "react";
import styles from "../Modal.module.scss";
import { Button } from "components/common/Button/Button";
import { Radio } from "components/common/Radio/Radio";
import { useAppSelector } from "store/redux/store";
import { RoleE } from "enum/roleE";
import { Checkbox } from "../../common/Checkbox/Checkbox";

type AddEmployeeModalPropsT = {
  setModal: () => void;
};

export const AddEmployeeModal: FC<AddEmployeeModalPropsT> = memo(({ setModal }) => {
  const role = useAppSelector((state) => state.user.permission);
  if (role === RoleE.Admin) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main_employee}>
          <div className={styles.main_employee_container}>
            <div className={styles.main_employee_closedModal} onClick={setModal}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125"
                  stroke="#E0DCED"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
              <span className={styles.main_employee_subs}>
                Отправим приглашение на Email. <br /> Приняв его, сотрудник сможет настроить свой
                профиль
              </span>
            </div>
            <div className={styles.main_employee_invite}>
              <label htmlFor="email">Email нового сотрудника:</label>
              <br />
              <div className={styles.main_employee_invite_input}>
                <input type="text" placeholder={"example@mailbox.ru"} />
              </div>
            </div>
            <div className={styles.main_employee_role}>
              <div className={styles.main_employee_role_radio}>
                <Radio title={"Редактор"} id={"admin"} />
              </div>
              <div className={styles.main_employee_role_desc}>
                Может создавать и удалять курсы, добавлять сотрудников, производить операции со
                счетом и тарифами
              </div>
            </div>
            <div className={styles.main_employee_role}>
              <div className={styles.main_employee_role_radio}>
                <Radio title={"Преподаватель"} id={"admin"} />
              </div>
              <div className={styles.main_employee_role_desc}>
                Может создавать и удалять курсы, добавлять сотрудников, производить операции со
                счетом и тарифами
              </div>
            </div>
            <div className={styles.main_employee_role}>
              <div className={styles.main_employee_role_radio}>
                <Radio title={"Менеджер"} id={"teacher"} />
              </div>
              <div className={styles.main_employee_role_desc}>Может что-то делать</div>
            </div>
            <div className={styles.main_employee_course}>
              <span className={styles.main_employee_course_title}>Доступ к курсам</span>
              <div className={styles.main_employee_course_checkbox}>
                <Checkbox id={"Python"} name={"Python"} checked={false} onChange={() => {}} />
                <span>The Way Python</span>
              </div>
              <div className={styles.main_employee_course_checkbox}>
                <Checkbox id={"Java"} name={"Java"} checked={false} onChange={() => {}} />
                <span>The Way Java</span>
              </div>

              <div className={styles.main_employee_course_checkbox}>
                <Checkbox id={"Frontend"} name={"Frontend"} checked={false} onChange={() => {}} />
                <span>The Way Frontend</span>
              </div>
              <div className={styles.main_employee_course_checkbox}>
                <Checkbox id={"UI"} name={"UI"} checked={false} onChange={() => {}} />
                <span>The Way UX/UI design</span>
              </div>
              <div className={styles.main_employee_course_checkbox}>
                <Checkbox id={"English"} name={"English"} checked={false} onChange={() => {}} />
                <span>The Way English</span>
              </div>
              <div className={styles.main_employee_course_checkbox}>
                <Checkbox
                  id={"EnglishStart"}
                  name={"EnglishStart"}
                  checked={false}
                  onChange={() => {}}
                />
                <span>The Way English Start</span>
              </div>
            </div>
            <div className={styles.main_employee_btn}>
              <Button style={{ width: "220px" }} text={"Добавить"} variant={"primary"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_employee}>
        <div className={styles.main_employee_container}>
          <div className={styles.main_employee_closedModal} onClick={setModal}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125"
                stroke="#E0DCED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
            <span className={styles.main_employee_subs}>
              Отправим приглашение на Email. <br /> Приняв его, сотрудник сможет настроить свой
              профиль
            </span>
          </div>
          <div className={styles.main_employee_invite}>
            <label htmlFor="email">Email нового сотрудника:</label>
            <br />
            <div className={styles.main_employee_invite_input}>
              <input type="text" placeholder={"example@mailbox.ru"} />
            </div>
          </div>
          <div className={styles.main_employee_role}>
            <div className={styles.main_employee_role_radio}>
              <Radio title={"Администратор"} id={"admin"} />
            </div>
            <div className={styles.main_employee_role_desc}>
              Может создавать и удалять курсы, добавлять сотрудников, производить операции со счетом
              и тарифами
            </div>
          </div>
          <div className={styles.main_employee_btn}>
            <Button text={"Добавить"} variant={"primary"} />
          </div>
        </div>
      </div>
    </div>
  );
});
