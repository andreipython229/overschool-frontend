import React, { FC, ReactNode } from 'react'
import { LandingBlockT } from './types/LandingT'
import { useAppSelector } from 'store/hooks'
import { blocksNamesE } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/enum/blocksNamesE'
import { StatsBlock } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/StatsBlock'
import { TrainingProgram } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/TrainingProgram'
import styles from './styles/landingBlocks.module.scss'
import style1 from './styles/coursePreview.module.scss'
import { HeaderViewBlock } from './Blocks/HeaderViewBlock'
import { AudienceViewBlock } from './Blocks/AudienceViewBlock'
import { PurposeTrainingViewBlock } from './Blocks/PurposeTrainingViewBlock'
import { backArr } from 'components/Previous/config/svgIconPath'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import {LinkViewBlock} from "./Blocks/LinkViewBlock";
import { AdvantageViewBlock } from './Blocks/AdvantageViewBlock'

export const LandingBlocks: FC<LandingBlockT> = ({ openModal }) => {
  const landing = useAppSelector(state => state.landing.blocks)
  const navigate = useNavigate()

  const getBlock = (name: string): ReactNode => {
    switch (name) {
      case blocksNamesE.header:
        return <HeaderViewBlock openModal={openModal} />;
      case blocksNamesE.stats:
        return <StatsBlock />;
      case blocksNamesE.audience:
        return <AudienceViewBlock />;
      case blocksNamesE.advantage:
        return <AdvantageViewBlock />
      case blocksNamesE.trainingProgram:
        return <TrainingProgram />;
      case blocksNamesE.trainingPurpose:
        return <PurposeTrainingViewBlock />;
      // case blocksNamesE.linkButton:
      //   return <LinkViewBlock />;
      default:
        return null;
    }
  };

  // Формирование списка из блоков
  const getListedBlocks = () => {
    return Object.values(landing).sort((a, b) => a.id - b.id)
  }

  return (
    <div className={styles.blocksController}>
      <div className={style1.previous}>
        <div onClick={() => navigate(Path.Catalog)} className={style1.back_all_course}>
          <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
          <span>Назад в каталог</span>
        </div>
      </div>
      {getListedBlocks().map(
        block =>
          block.visible && (
            <div key={block.id} className={styles.blocksController_wrapper}>
              <div className={styles.blocksController_wrapper_block}>{getBlock(block.content)}</div>
            </div>
          ),
      )}
    </div>
  )
}
