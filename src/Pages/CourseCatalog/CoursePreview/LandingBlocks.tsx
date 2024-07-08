import React, {FC, ReactNode} from 'react';
import {LandingBlockT} from "./types/LandingT";
import {useAppSelector} from "store/hooks";
import {blocksNamesE} from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/enum/blocksNamesE";
import {StatsBlock} from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/StatsBlock";
import {TrainingProgram} from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/TrainingProgram";
import styles from "./styles/landingBlocks.module.scss";
import {HeaderViewBlock} from "./Blocks/HeaderViewBlock";
import {AudienceViewBlock} from "./Blocks/AudienceViewBlock";
import {PurposeTrainingViewBlock} from "./Blocks/PurposeTrainingViewBlock";

export const LandingBlocks: FC<LandingBlockT> = ({openModal}) => {
  const landing = useAppSelector(state => state.landing.blocks)

  const getBlock = (name: string): ReactNode => {
    switch (name) {
      case blocksNamesE.header:
        return <HeaderViewBlock openModal={openModal} />
      case blocksNamesE.stats:
        return <StatsBlock />
      case blocksNamesE.audience:
        return <AudienceViewBlock />
      case blocksNamesE.trainingProgram:
        return <TrainingProgram />
      case blocksNamesE.trainingPurpose:
        return <PurposeTrainingViewBlock />
      default:
        return null
    }
  }

  // Формирование списка из блоков
  const getListedBlocks = () => {
    return Object.values(landing).sort((a, b) => a.id - b.id)
  }

  return (
    <div className={styles.blocksController}>
      {getListedBlocks().map((block) =>
        block.visible && (
          <div key={block.id}
               className={styles.blocksController_wrapper}
          >
            <div className={styles.blocksController_wrapper_block}>
              {getBlock(block.content)}
            </div>
          </div>
        ))
      }
    </div>
  );
};