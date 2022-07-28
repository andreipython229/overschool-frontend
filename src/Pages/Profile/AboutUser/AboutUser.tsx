import React, { ChangeEvent, FC, memo } from "react"
import styles from "../profile.module.scss"
import { Input } from "../../../components/common/Input/Input/Input"
import { Button } from "../../../components/common/Button/Button"
import { SelectInput } from "../../../components/common/SelectInput/SelectInput"

type AboutUserPropsT = {
  avatar: string | null
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  full_name: string
  email: string
  phone_number: string
  city: string
  aboutUser: string
  changeFullName: (e: ChangeEvent<HTMLInputElement>) => void
  changePhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void
  changeCity: (e: ChangeEvent<HTMLInputElement>) => void
  changeAboutMyself: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
const optionsList = ["Выберите пол", "Мужской", "Женский"]

export const AboutUser: FC<AboutUserPropsT> = memo(
  ({
    avatar,
    onChangeAvatar,
    full_name,
    email,
    phone_number,
    city,
    aboutUser,
    changeFullName,
    changePhoneNumber,
    changeCity,
    changeAboutMyself,
  }) => {
    return (
      <div
        style={{ width: "calc(100% * 0.6)", marginRight: "26px", marginBottom: "108px" }}
        className={styles.container}
      >
        <h3>Настройка профиля</h3>
        <div className={styles.profile_block}>
          <Input
            name={"Email"}
            type={"text"}
            label={"Email:"}
            onChange={() => alert("Hello")}
            value={email}
          />
        </div>
        <div className={styles.profile_block}>
          <div className={styles.profile_block_avatarBlock}>
            <span className={styles.profile_block_avatarBlock_title}>Аватар:</span>
            {avatar ? (
              <img
                className={styles.profile_block_avatarBlock_avatar}
                src={avatar}
                alt="User Avatar"
              />
            ) : (
              <div className={styles.profile_block_avatarBlock_avatar} />
            )}
            <input
              className={styles.profile_block_avatarBlock_input}
              name={"Avatar"}
              type={"file"}
              onChange={onChangeAvatar}
            />
          </div>
        </div>
        <div className={styles.profile_block}>
          <Input
            name={"Name"}
            type={"text"}
            label={"Имя и Фамилия:"}
            onChange={(e) => changeFullName(e)}
            value={full_name}
          />
        </div>
        <div className={styles.profile_block}>
          <Input
            name={"phone"}
            type={"text"}
            label={"Телефон:"}
            onChange={(e) => changePhoneNumber(e)}
            value={phone_number}
            placeholder={"Введите номер телефона"}
          />
        </div>
        <div className={styles.profile_block}>
          <Input
            name={"city"}
            type={"text"}
            label={"Город:"}
            onChange={(e) => changeCity(e)}
            value={city}
            placeholder={"Введите город"}
          />
        </div>
        <div className={styles.profile_block}>
          <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
          <textarea
            className={styles.profile_block_textArea}
            onChange={(e) => changeAboutMyself(e)}
            placeholder={
              aboutUser
                ? aboutUser
                : "Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем"
            }
          />
        </div>
        <div className={styles.profile_block}>
          <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
          <SelectInput optionsList={optionsList} />
        </div>
        <div>
          <Button text={"Сохранить"} variant={"primary"} disabled={true} />
        </div>
      </div>
    )
  },
)
