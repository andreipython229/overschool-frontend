import { ChangeEvent, FC, memo } from 'react';
import { IconSvg } from '../../../../components/common/IconSvg/IconSvg';
import { addFileSvg } from './config/svgIconPath'

import styles from './logoAddBlock.module.scss'

type LogoAddBlockPropsT = {
  title: string
  logotype: string
  logoDesc: string
  aboutRequirements: string
  requirementsArr: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LogoAddBlock: FC<LogoAddBlockPropsT> = memo(
  ({ logotype, logoDesc, aboutRequirements, requirementsArr, title, onChange }) => {
    return (
      <section className={styles.logoBlock}>
        <span className={styles.logoBlock_title}>{title}</span>
        <span className={styles.logoBlock_desc}>{logoDesc}</span>
        <div className={styles.logoBlock_information}>
          <label className={styles.logoBlock_information_label}>
            <input
              onChange={onChange}
              className={styles.logoBlock_information_label_fileInput}
              type="file"
              title="adasafafasf"
            />
            <IconSvg width={18} height={23} viewBoxSize="0 0 18 23" path={addFileSvg} />
            </label>
          <div className={styles.logoBlock_information_requirements}>
            <div className={styles.logoBlock_information_requirements_title}>
              {aboutRequirements}
            </div>
            {requirementsArr.map((el, id) => {
              return (
                <p key={id}>
                  {id + 1}. {el}
                </p>
              )
            })}
          </div>
        </div>
      </section>
    )
  },
)
