import { ChangeEvent, FC, useEffect, useState } from 'react'
import boxesImage from '../../Bonuses/assets/iconsPng/boxes.png'
import prizeImage from '../../Bonuses/assets/image.png'
import boxImage from '../../Bonuses/assets/box.png'
import styles from './bonuses.module.scss'
import {
  useCreateSchoolBoxMutation,
  useCreateSchoolPrizeMutation,
  useFetchSchoolBoxesQuery,
  useFetchSchoolPrizesQuery,
  useGetAllSchoolPrizeWinnersQuery,
  useUpdateSchoolBoxMutation,
  useUpdateSchoolPrizeMutation,
} from 'api/schoolBonusService'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { SettingsIcon } from 'assets/Icons/svgIcons'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { getNounDeclension } from 'utils/getNounDeclension'
import { Button } from 'components/common/Button/Button'
import { PrizeWinner } from 'Pages/Bonuses/components/PrizeWinner'
import { useBoolean } from 'customHooks'
import { AnimatedModal } from 'components/Modal/AnimatedModal'
import { Input } from 'components/common/Input/Input/Input'
import { DownloadIconPath } from 'assets/Icons/svgIconPath'
import { IPrize, ISchoolBoxes } from 'api/apiTypes'

export const BonusesSettings: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const { data: schoolBoxes, isFetching: fetchingBoxes, refetch } = useFetchSchoolBoxesQuery(schoolName)
  const { data: schoolWinners } = useGetAllSchoolPrizeWinnersQuery(schoolName)
  const [boxes, setBoxes] = useState<ISchoolBoxes[] | undefined>()
  const { data: schoolPrizes, isFetching: fetchingPrizes, refetch: refetchPrizes } = useFetchSchoolPrizesQuery(schoolName)
  const [createBox, { data: boxCreated, isLoading, isSuccess }] = useCreateSchoolBoxMutation()
  const [createPrize, { data: prizeCreated, isLoading: loadingPrize }] = useCreateSchoolPrizeMutation()
  const [updateBox] = useUpdateSchoolBoxMutation()
  const [updatePrize] = useUpdateSchoolPrizeMutation()

  const [isShowAddBox, { off: showAddBox, on: closeAddBox }] = useBoolean(false)
  const [newBoxName, setNewBoxName] = useState<string>('')
  const [newBoxCount, setNewBoxCount] = useState<number>(0)
  const [newBoxPrice, setNewBoxPrice] = useState<string>('')
  const [newBoxBonus, setNewBoxBonus] = useState<number>(0)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [uploadFile, setUploadFile] = useState<string>('')

  const [isShowAddPrize, { off: showAddPrize, on: closeAddPrize }] = useBoolean(false)
  const [newPrizeName, setNewPrizeName] = useState<string>('')
  const [newPrizeDrop, setNewPrizeDrop] = useState<number>(0)
  const [newPrizeGuarantee, setNewPrizeGuarantee] = useState<string>('')

  useEffect(() => {
    if (boxCreated) {
      closeAddBox()
      refetch()
    }
  }, [boxCreated])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = URL.createObjectURL(event.target.files[0])
      setUploadFile(url)
      setSelectedFile(event.target.files[0])
    }
  }

  const changePrizeGuarantee = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPrizeGuarantee(event.target.value)
  }

  const changePrizeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPrizeName(event.target.value)
  }

  const changePrizeDrop = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPrizeDrop(Number(event.target.value))
  }

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoxName(event.target.value)
  }

  const changeCount = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoxCount(Number(event.target.value))
  }

  const changeBonus = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoxBonus(Number(event.target.value))
  }

  const changePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBoxPrice(event.target.value)
  }

  const updateSchoolBox = (box: ISchoolBoxes) => {
    const form = new FormData()
    form.append('name', box.name)
    form.append('price', box.price)
    form.append('quantity', String(box.quantity))
    form.append('is_active', String(!box.is_active))
    if (form) {
      updateBox({ schoolName: schoolName, id: box.id, data: form })
        .unwrap()
        .then(() => refetch())
    }
  }

  const updateSchoolPrize = (prize: IPrize) => {
    const form = new FormData()
    form.append('name', prize.name)
    form.append('drop_chance', String(prize.drop_chance))
    form.append('is_active', String(!prize.is_active))
    if (form) {
      updatePrize({ schoolName: schoolName, id: prize.id, data: form })
        .unwrap()
        .then(() => refetchPrizes())
    }
  }

  const createNewBox = () => {
    const form = new FormData()
    form.append('name', newBoxName)
    form.append('price', newBoxPrice)
    form.append('quantity', String(newBoxCount))
    form.append('bonus_quantity', String(newBoxBonus))
    if (selectedFile) {
      form.append('icon', selectedFile)
    }
    form.append('is_active', 'true')

    if (form) {
      createBox({ data: form, schoolName })
        .unwrap()
        .then(() => {
          setUploadFile('')
          setSelectedFile(undefined)
          setNewBoxBonus(0)
          setNewBoxCount(0)
          setNewBoxName('')
          setNewBoxPrice('')
        })
    }
  }

  const createNewPrize = () => {
    const form = new FormData()
    form.append('name', newPrizeName)
    form.append('drop_chance', String(newPrizeDrop))
    form.append('guaranteed_box_count', newPrizeGuarantee)
    if (selectedFile) {
      form.append('icon', selectedFile)
    }
    form.append('is_active', 'true')

    if (form) {
      createPrize({ data: form, schoolName })
        .unwrap()
        .then(() => {
          setUploadFile('')
          setSelectedFile(undefined)
          setNewPrizeDrop(0)
          setNewPrizeName('')
          setNewPrizeGuarantee('')
          closeAddPrize()
          refetchPrizes()
        })
    }
  }

  if (!schoolBoxes || !schoolPrizes) {
    return <LoaderLayout />
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.wrapper_title}>Коробки с призами</h3>
      <div className={styles.wrapper_tips}>
        <div className={styles.wrapper_tips_tip}>
          <img src={prizeImage} className={styles.wrapper_tips_tip_image} alt="" />
          <p className={styles.wrapper_tips_tip_text}>
            Призы внутри коробки выбираются случайным образом, но с определёнными шансами на выпадение редких и эпических призов.
          </p>
        </div>
        <div className={styles.wrapper_tips_tip}>
          <p className={styles.wrapper_tips_tip_text}>Для открытия коробок нужны ключи, которые можно получить за выполнение заданий или купить.</p>
          <img src={boxesImage} className={styles.wrapper_tips_tip_image} alt="" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            <th className={styles.table_header_item}>Иконка</th>
            <th className={styles.table_header_item}>Настройка стоимости коробок</th>
            <th className={styles.table_header_item}>
              <div className={styles.table_body_row_price}>
                <div className={styles.table_body_row_price_item1} style={{ background: 'transparent', textAlign: 'center' }}>
                  <p>BYN</p>
                </div>
                <div
                  className={styles.table_body_row_price_item2}
                  style={{
                    gap: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  <p>Баллы</p>
                  <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={settingsIconPath} />
                </div>
              </div>
            </th>
            <th className={styles.table_header_item}>Бонус: количество коробок в подарок</th>
            <th className={styles.table_header_item}>Срок истекает</th>
            <th className={styles.table_header_item}>Статус</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {schoolBoxes.length > 0 ? (
            schoolBoxes.map(box => (
              <tr className={styles.table_body_row} key={box.id}>
                <td>
                  <div className={styles.table_body_row_icon}>
                    <img src={box.icon || boxImage} alt="box" />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_count}>
                    <Checkbox />
                    <p>{`${box.quantity} ${getNounDeclension(box.quantity, ['коробка', 'коробки', 'коробок'])}`}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_price}>
                    <input type="number" value={box.price} className={styles.table_body_row_price_item1} />
                    <input type="number" placeholder="Бонусы" className={styles.table_body_row_price_item2} />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_bonus}>
                    <input type="number" value={box.bonus_quantity} />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_expires}>
                    <p>{box.auto_deactivation_time ? new Date(box.auto_deactivation_time).toLocaleString() : 'Не ограничен'}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_status}>
                    <div className={styles.table_body_row_status_button} onClick={() => updateSchoolBox(box)}>
                      <span className={box.is_active ? styles.table_body_row_status_button_active : styles.table_body_row_status_button_inactive} />
                      <p>{box.is_active ? 'Активирован' : 'Не активирован'}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr style={{ width: '100%' }}>
              <td colSpan={6} className={styles.table_body_row} style={{ height: '200px', textAlign: 'center' }}>
                Наборов не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button text={'Добавить'} variant="newPrimary" onClick={showAddBox} />
        <Button text={'Сохранить'} variant="newPrimary" />
        <Button text={'Отмена'} variant="newSecondary" />
      </div>

      <h3 className={styles.wrapper_title}>Настойка отображения частоты появления сообщений о победителях</h3>
      <div className={styles.winner}>
        <PrizeWinner />
      </div>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            <th className={styles.table_header_item}>Данные пользователя</th>
            <th className={styles.table_header_item}>Выигрыш</th>
            <th className={styles.table_header_item}>Частота появления сообщений в 1 час времени</th>
            <th className={styles.table_header_item}>Статус</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          <tr style={{ width: '100%' }}>
            <td colSpan={4} className={styles.table_body_row} style={{ height: '200px', textAlign: 'center' }}>
              Данных нет
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button text={'Сохранить'} variant="newPrimary" />
        <Button text={'Отмена'} variant="newSecondary" />
      </div>

      <div className={styles.wrapper_prizesTextBlock}>
        <h3 className={styles.wrapper_title}>Настройка шансов выпадения призов</h3>
        <p className={styles.wrapper_prizesTextBlock_description}>Загрузите свою картинку или выберите из предложенных</p>
        <div className={styles.wrapper_prizesTextBlock_images}>
          <span className={styles.wrapper_prizesTextBlock_images}>
            <img src={boxImage} alt="box" />
            <p>Выбрать иконки из предложенных</p>
          </span>
          <span className={styles.wrapper_prizesTextBlock_images}>
            <img src={boxImage} alt="box" />
            <p>Добавьте файл PNG без фона</p>
          </span>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            <th className={styles.table_header_item}>Иконка</th>
            <th className={styles.table_header_item}>Название</th>
            <th className={styles.table_header_item}>Шанс выпадения подарка</th>
            <th className={styles.table_header_item}>Гарантированный приз</th>
            <th className={styles.table_header_item}>Статус</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {schoolPrizes.length > 0 ? (
            schoolPrizes.map(prize => (
              <tr className={styles.table_body_row} key={prize.id}>
                <td>
                  <div className={styles.table_body_row_icon}>
                    <img src={prize.icon || boxImage} alt="box" />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_count}>
                    <p>{prize.name}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_bonus}>
                    <input type="number" value={prize.drop_chance} />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_bonus}>
                    <Checkbox />
                    <input type="number" value={prize.guaranteed_box_count} />
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_status}>
                    <div className={styles.table_body_row_status_button} onClick={() => updateSchoolPrize(prize)}>
                      <span className={prize.is_active ? styles.table_body_row_status_button_active : styles.table_body_row_status_button_inactive} />
                      <p>{prize.is_active ? 'Активирован' : 'Не активирован'}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr style={{ width: '100%' }}>
              <td colSpan={5} className={styles.table_body_row} style={{ height: '200px', textAlign: 'center' }}>
                Призов не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button text={'Добавить'} variant="newPrimary" onClick={showAddPrize} />
        <Button text={'Сохранить'} variant="newPrimary" />
        <Button text={'Отмена'} variant="newSecondary" />
      </div>

      <div className={styles.wrapper_prizesTextBlock}>
        <h3 className={styles.wrapper_title}>История выпадения призов</h3>
        <p className={styles.wrapper_prizesTextBlock_description}>Здесь отображаются все недавно полученные призы учениками</p>
      </div>
      {schoolWinners && (
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.table_header_item}>Иконка</th>
              <th className={styles.table_header_item}>Email пользователя</th>
              <th className={styles.table_header_item}>Выигрыш</th>
              <th className={styles.table_header_item}>Дата выигрыша</th>
              <th className={styles.table_header_item}>Статус</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {schoolWinners.length > 0 ? (
              [...schoolWinners].reverse().map((prize, index) => (
                <tr className={styles.table_body_row} key={index}>
                  <td>
                    <div className={styles.table_body_row_icon}>
                      <img src={prize.prize.icon || boxImage} alt="box" />
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_body_row_count} style={{ justifyContent: 'center' }}>
                      <p>{prize.user_email}</p>
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_body_row_count} style={{ justifyContent: 'center' }}>
                      <p>{prize.prize.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_body_row_count}>
                      <p>{new Date(prize.received_at).toLocaleString()}</p>
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_body_row_status}>
                      <div className={styles.table_body_row_status_button}>
                        <span className={prize.is_used ? styles.table_body_row_status_button_active : styles.table_body_row_status_button_inactive} />
                        <p>{prize.is_used ? 'Активирован' : 'Не активирован'}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ width: '100%' }}>
                <td colSpan={5} className={styles.table_body_row} style={{ height: '200px', textAlign: 'center' }}>
                  Призов не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <AnimatedModal handleClose={closeAddBox} show={isShowAddBox}>
        <div className={styles.addBoxModal}>
          <h3 className={styles.addBoxModal_title}>Добавление нового набора</h3>
          <div className={styles.addBoxModal_data}>
            {uploadFile ? (
              <div className={styles.addBoxModal_data_el}>
                <p>Выберите иконку набора:</p>
                <label htmlFor="icon-input">
                  <img src={uploadFile} alt="newIcon" style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'transparent' }} />
                </label>
                <input onChange={handleChange} className={styles.addBoxModal_data_el_fileInput} type="file" id="icon-input" title="box-icon" />
              </div>
            ) : (
              <div className={styles.addBoxModal_data_el}>
                <p>Выберите иконку набора:</p>
                <label htmlFor="icon-input">
                  <IconSvg styles={{ cursor: 'pointer' }} width={50} height={50} viewBoxSize="0 0 23 23" path={DownloadIconPath} />
                </label>
                <input onChange={handleChange} className={styles.addBoxModal_data_el_fileInput} type="file" id="icon-input" title="box-icon" />
              </div>
            )}
            <div className={styles.addBoxModal_data_el}>
              <p>Название набора:</p>
              <Input id="boxName" type="text" name="boxName" value={newBoxName} onChange={changeName} />
            </div>
            <div className={styles.addBoxModal_data_el}>
              <p>Введите количество коробок в наборе:</p>
              <Input id="boxCount" type="number" name="boxCount" value={String(newBoxCount)} onChange={changeCount} />
            </div>
            <div className={styles.addBoxModal_data_el}>
              <p>Введите стоимость в BYN:</p>
              <Input id="boxPrice" type="text" name="boxPrice" value={newBoxPrice} onChange={changePrice} />
            </div>
            <div className={styles.addBoxModal_data_el}>
              <p>Количество бонусных коробок:</p>
              <Input id="boxBonus" type="number" name="boxBonus" value={String(newBoxBonus)} onChange={changeBonus} />
            </div>
          </div>
          <Button variant="newPrimary" text={'Добавить'} onClick={createNewBox} />
        </div>
      </AnimatedModal>
      <AnimatedModal handleClose={closeAddPrize} show={isShowAddPrize}>
        <div className={styles.addBoxModal}>
          <h3 className={styles.addBoxModal_title}>Добавление нового подарка</h3>
          <div className={styles.addBoxModal_data}>
            {uploadFile ? (
              <div className={styles.addBoxModal_data_el}>
                <p>Выберите иконку подарка:</p>
                <label htmlFor="icon-input">
                  <img src={uploadFile} alt="newIcon" style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'transparent' }} />
                </label>
                <input onChange={handleChange} className={styles.addBoxModal_data_el_fileInput} type="file" id="icon-input" title="box-icon" />
              </div>
            ) : (
              <div className={styles.addBoxModal_data_el}>
                <p>Выберите иконку подарка:</p>
                <label htmlFor="icon-input">
                  <IconSvg styles={{ cursor: 'pointer' }} width={50} height={50} viewBoxSize="0 0 23 23" path={DownloadIconPath} />
                </label>
                <input onChange={handleChange} className={styles.addBoxModal_data_el_fileInput} type="file" id="icon-input" title="box-icon" />
              </div>
            )}
            <div className={styles.addBoxModal_data_el}>
              <p>Название подарка:</p>
              <Input id="boxName" type="text" name="boxName" value={newPrizeName} onChange={changePrizeName} />
            </div>
            <div className={styles.addBoxModal_data_el}>
              <p>Введите шанс выпадения:</p>
              <Input id="boxCount" type="text" name="boxCount" value={String(newPrizeDrop)} onChange={changePrizeDrop} />
            </div>
            <div className={styles.addBoxModal_data_el}>
              <p>Гарантированный приз:</p>
              <Input id="boxPrice" type="text" name="prizeGarant" value={newPrizeGuarantee} onChange={changePrizeGuarantee} />
            </div>
          </div>
          <Button variant="newPrimary" text={'Добавить'} onClick={createNewPrize} />
        </div>
      </AnimatedModal>
    </div>
  )
}
