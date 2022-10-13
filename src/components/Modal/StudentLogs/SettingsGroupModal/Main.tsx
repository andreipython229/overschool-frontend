import { FC } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'

type MainSettingsGroupPropsT = {
  strongSubsequence: boolean
  blockHomework: boolean
  title: string
  handlerHomeworkCheck: () => void
  handlerSubsequence: () => void
  deleteGroup: () => void
}
export const MainSettingsGroup: FC<MainSettingsGroupPropsT> = ({
  strongSubsequence,
  blockHomework,
  title,
  handlerHomeworkCheck,
  handlerSubsequence,
  deleteGroup,
}) => {
  return (
    <>
      <div className={styles.groupSetting_input}>
        <Input name={'groupName'} value={title} type={'text'} label={'Название группы:'} />
      </div>
      <div className={styles.groupSetting_checkboxBlock}>
        <div className={styles.groupSetting_checkboxBlock_checkbox}>
          <Checkbox id={'homework'} name={'homework'} checked={blockHomework} onChange={handlerHomeworkCheck} />
          <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
            <span>Блокировать возможность отправки домашних заданий</span>
            <span>Ученики будут видеть домашние задания, смогут их выполнять, но не смогут отправлять их вам на проверку</span>
          </div>
        </div>
        <div className={styles.groupSetting_checkboxBlock_checkbox}>
          <Checkbox id={'strongSubsequence'} name={'strongSubsequence'} checked={strongSubsequence} onChange={handlerSubsequence} />
          <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
            <span>Строгая последовательность занятий</span>
            <span>Ученик сможет приступить к следующему занятию только после прохождения предыдущего</span>
          </div>
        </div>
      </div>
      {strongSubsequence && (
        <div className={styles.groupSetting_selectBlock}>
          <div className={styles.groupSetting_selectBlock_select}>
            <span>Домашние задания</span>
            <SelectInput optionsList={['Необходимо получить зачёт', 'Необходимо отправить решение', ' Можно пропустить']} />
          </div>
          <div className={styles.groupSetting_selectBlock_select}>
            <span>Тесты</span>
            <SelectInput optionsList={['Можно пропустить', 'Необходимо пройти', 'Необходимо успешно пройти']} />
          </div>
        </div>
      )}
      <div className={styles.groupSetting_btn}>
        <Button variant={'delete'} text={'Удалить группу'} onClick={deleteGroup} />
      </div>
    </>
  )
}
