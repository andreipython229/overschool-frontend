import { FC } from 'react'

import { programLanguage } from 'constants/other'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrUpPath, arrDownPath, deletePath } from '../../config/commonSvgIconsPath'

import styles from './addPost.module.scss'

type setShowType = {
  setShow: (value: boolean) => void
}

export const AddTextarea: FC<setShowType> = ({ setShow }) => {
  const stylesOnDrop = styles.redactorCourse_rightSide_functional_addContent + ' ' + styles.redactorCourse_rightSide_functional_addDragContent
  const stylesNoDrop = styles.redactorCourse_rightSide_functional_addContent

  return (
    <div className={styles.redactorCourse_rightSide_functional_blackBlock}>
      <div className={styles.redactorCourse_rightSide_functional_blackBlock_select}>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
            <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrUpPath} />
          </div>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_div}>
            <IconSvg width={11} height={15} viewBoxSize="0 0 11 15" path={arrDownPath} />
          </div>
          <div
            className={styles.redactorCourse_rightSide_header_btnBlock_delete}
            onClick={() => {
              setShow(false)
            }}
          >
            <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />
          </div>
        </div>
        <SelectInput optionsList={programLanguage} />
      </div>
    </div>
  )
}
