import React, {ChangeEvent, useState, useEffect} from 'react';
import {CardPropsT} from "../types/audienceBlockT";
import styles from "./audienceBlockCard.module.scss"
import { TextareaAutosize, Avatar } from '@mui/material';
import { DeleteForever } from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "store/hooks";
import { changeBlocks, addFile } from 'store/redux/landing/constructorSlice';
import {useSendLandingImagesMutation} from "api/courseLandingServices";
import {useParams} from "react-router-dom";

export const AudienceBlockCard: React.FC<CardPropsT> = ({ position, onDelete }) => {
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)
  const params = useParams()

  const [titleValue, setTitleValue] = useState<string>(landing.audience.chips[position].title);
  const [descriptionValue, setDescriptionValue] = useState<string>(landing.audience.chips[position].description);

  // const [avatarFile, setAvatarFile] = useState<File | Blob>()
  // const [avatarUrl, setAvatarUrl] = useState<string>(landing.audience.chips[position].photo)
  // const [avatarError, setAvatarError] = useState<string>('')

  const [cardImage, setCardImage] = useState<string>(landing.audience.chips[position].photo)
  // const [sendImage, {data: f_landing, isLoading}] = useSendLandingImagesMutation()
  const [imgError, setImgError] = useState<string>('')
  const schoolName = window.location.href.split('/')[4]

  // useEffect(() => {
  //   if (f_landing) {
  //     setCardImage(String(f_landing.audience.chips[position].photo))
  //     dispatch(changeBlocks(f_landing))
  //   }
  // }, [f_landing,])

  const handleImageChange = () => {
    setImgError('')
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = event => {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        if (files[0].size <= 7 * 1024 * 1024) {
          // const formData = new FormData()
          // formData.append(`photo_audience_${position}`, files[0])
          // formData.append('formdata', JSON.stringify(landing));
          // sendImage({arg: {formdata: formData, id: Number(params.course_id)}, schoolName})
          const url = URL.createObjectURL(files[0])
          setCardImage(url)
          // сохраняем файл в redux для последующей отправки в составе формы
          dispatch(addFile({
            key:`photo_audience_${position}`,
            file: files[0]
          }))

          // сохраняем временнную ссылку на файл в redux
          const chips = landing.audience.chips.map( item => {
          if (item.position === position) {
              return { ...item, photo: url };
            }
            return item;
          })

          // формируем новый объект Лендинга
          const lndng = {
            ...landing,
            audience: {
              ...landing.audience,
              chips: chips
            }
          }
          dispatch(changeBlocks(lndng));
        } else {
          setImgError('Размер файла не должен превышать 7 МБ')
        }
      }
    }
    fileInput.click()
  }

  // const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAvatarError('')
  //   if (e.target.files && e.target.files[0]) {
  //     if (e.target.files[0].size <= 7 * 1024 * 1024) {
  //       const url = URL.createObjectURL(e.target.files[0])
  //       setAvatarUrl(url)
  //       setAvatarFile(e.target.files[0])
  //
  //       const chips = landing.audience.chips.map( item => {
  //         if (item.position === position) {
  //           return { ...item, photo: url };
  //         }
  //         return item;
  //       })
  //
  //       const lndng = {
  //         ...landing,
  //         audience: {
  //           ...landing.audience,
  //           chips: chips
  //         }
  //       }
  //
  //       dispatch(changeBlocks(lndng));
  //     } else {
  //       setAvatarError('Допустимый размер файла не должен превышать 7 МБ')
  //     }
  //   }
  // }

  const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(event.target.value)

    const chips = landing.audience.chips.map( item => {
      if (item.position === position) {
        return { ...item, title: event.target.value};
      }
      return item;
    })

    const lndng = {
      ...landing,
      audience: {
        ...landing.audience,
        chips: chips
      }
    }

    dispatch(changeBlocks(lndng));
  };

  // const handleMouseLeave = () => {
  //   const chips = landing.audience.chips.map( item => {
  //     if (item.position === position) {
  //       return { ...item, title: titleValue, description: descriptionValue };
  //     }
  //     return item;
  //   })
  //
  //   const lndng = {
  //     ...landing,
  //     audience: {
  //       ...landing.audience,
  //       chips: chips
  //     }
  //   }
  //
  //   dispatch(changeBlocks(lndng));
  // };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value)

    const chips = landing.audience.chips.map( item => {
      if (item.position === position) {
        return { ...item, description: event.target.value};
      }
      return item;
    })

    const lndng = {
      ...landing,
      audience: {
        ...landing.audience,
        chips: chips
      }
    }

    dispatch(changeBlocks(lndng));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_imageBox} onClick={handleImageChange}>
        {/*<img alt=" " src={avatarUrl}/>*/}
        <Avatar
          alt="Overschool"
          // src="/static/images/avatar/1.jpg"
          src={cardImage}
          sx={{width: 125, height: 125}}
        />
        {/*<input className={styles.wrapper_imageBox_imageInput} value={''} name={'avatar'} type={'file'}*/}
        {/*       onChange={onChangeAvatar}/>*/}
      </div>
      <div className={styles.wrapper_title}>
        <TextareaAutosize
          value={titleValue}
          onChange={handleChangeTitle}
          // onBlur={handleSaveTitle}
          placeholder="Заголовок карточки"
          maxRows={2}
          maxLength={35}
        />
      </div>
      <div className={styles.wrapper_description}>
        <TextareaAutosize
          value={descriptionValue}
          onChange={handleChangeDescription}
          // onBlur={handleSaveDescription}
          placeholder="Добавьте описание, если необходимо..."
          maxRows={3}
          maxLength={85}
        />
      </div>
      <button onClick={onDelete}>
        <DeleteForever fontSize="medium"/>
      </button>
    </div>
  );
};
