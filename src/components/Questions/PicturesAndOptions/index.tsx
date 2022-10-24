import styles from './picturesAndOptions.module.scss';
import { Question } from '../Question';
import { AnswerOption } from '../AnswerOption';
import { QuestionHeader } from '../QuestionHeader';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { addPictureIconPath} from '../config/svgIconPath';
import { InputBlock } from 'components/common/Input/InputBlock';

export const PicturesAndOptions = () => {

  return (
    <div className={styles.wrapper}>
        <QuestionHeader>
            <div className={styles.wrapper_header_iconWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconColumn}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper}>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                <div className={styles.wrapper_header_iconWrapper_iconRowWrapper_iconRow}>
                    <span/>
                </div>
                </div>
            </div>
        </QuestionHeader>
        <div className={styles.wrapper_optionsContent}>
            <Question />
            <div className={styles.wrapper_optionsContent_addPicture}>
                <p className={styles.wrapper_optionsContent_addPicture_text}>Добавить изображение</p>
                <div className={styles.wrapper_optionsContent_addPicture_iconWrapper}>
                <InputBlock name={''} type={'file'} value={''}/>
                    <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath}/>
                </div>
            </div>
            <AnswerOption />
        </div>
    </div>
  )
}
