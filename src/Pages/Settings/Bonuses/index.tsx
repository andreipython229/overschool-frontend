import { FC } from 'react'
import boxesImage from '../../Bonuses/assets/iconsPng/boxes.png'
import prizeImage from '../../Bonuses/assets/image.png'
import boxImage from '../../Bonuses/assets/box.png'
import styles from './bonuses.module.scss'
import { useFetchSchoolBoxesQuery, useFetchSchoolPrizesQuery } from 'api/schoolBonusService'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { SettingsIcon } from 'assets/Icons/svgIcons'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'
import { getNounDeclension } from 'utils/getNounDeclension'
import { Button } from 'components/common/Button/Button'
import { PrizeWinner } from 'Pages/Bonuses/components/PrizeWinner'

export const BonusesSettings: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const { data: schoolBoxes, isFetching: fetchingBoxes } = useFetchSchoolBoxesQuery(schoolName)
  const { data: schoolPrizes, isFetching: fetchingPrizes } = useFetchSchoolPrizesQuery(schoolName)

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
                  <p>USD</p>
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
                    <p>{new Date(box.auto_deactivation_time).toLocaleString()}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.table_body_row_status}>
                    <div className={styles.table_body_row_status_button}>
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
                Коробок не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.buttons}>
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
                    <div className={styles.table_body_row_status_button}>
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
        <Button text={'Сохранить'} variant="newPrimary" />
        <Button text={'Отмена'} variant="newSecondary" />
      </div>
    </div>
  )
}
