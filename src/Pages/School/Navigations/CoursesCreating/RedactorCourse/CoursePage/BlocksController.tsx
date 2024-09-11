import React, {FC, ReactNode, useEffect } from 'react';
import { HeaderBlock } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/HeaderBlock'
import { StatsBlock } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/Blocks/StatsBlock'
import { BlocksControllerT } from "./types/blocksControllerT"
import { TrainingProgram } from "./Blocks/TrainingProgram";
import { AudienceBlock } from "./Blocks/AudienceBlock";
import { PurposeOfTrainingBlock } from "./Blocks/PurposeOfTrainingBlock"
import styles from "./styles/blocksController.module.scss"
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, VisibilityOff } from "@mui/icons-material";
import { blocksNamesE } from "./enum/blocksNamesE";
import {useAppDispatch, useAppSelector} from "store/hooks";
import { changeBlocks, rollBackBlocks, removeFiles } from 'store/redux/landing/constructorSlice';
import {Button} from "components/common/Button/Button";
import {useSendLandingImagesMutation} from 'api/courseLandingServices'
import {useParams} from "react-router-dom";
import {SimpleLoader} from "components/Loaders/SimpleLoader";
import {LinkBlock} from "./Blocks/LinkBlock";

export const BlocksController: FC<BlocksControllerT> = ({ openModal }) => {
  const params = useParams()
  // const [sendLanding, {data: f_landing, isLoading}] = useSendCourseLandingMutation()
  const [sendLanding, {data: f_landing, isLoading}] = useSendLandingImagesMutation()
  const dispatch = useAppDispatch()
  const landing = useAppSelector(state => state.landing.blocks)
  const files = useAppSelector(state => state.landing.files)


useEffect(() => {
  if (f_landing && !isLoading) {
    dispatch(changeBlocks(f_landing));
  }
}, [f_landing, isLoading]);

useEffect(() => {
  sessionStorage.setItem('landingState', JSON.stringify(landing));
}, [landing]);

  const getBlock = (name: string): ReactNode => {
    switch (name) {
      case blocksNamesE.header:
        return <HeaderBlock openModal={openModal} />
      case blocksNamesE.stats:
        return <StatsBlock />
      case blocksNamesE.audience:
        return <AudienceBlock />
      case blocksNamesE.trainingProgram:
        return <TrainingProgram />
      case blocksNamesE.trainingPurpose:
        return <PurposeOfTrainingBlock />
      case blocksNamesE.linkButton:
        return <LinkBlock />
      default:
        return null
    }
  }

  // Скрытие и отображение блока
  const setBlockVisibility = (id: number, isVisible: boolean) => {
    const newBlocks = {
      ...landing,
      ...Object.fromEntries(Object.entries(landing).map(([key, block]) =>
        block.id === id ? [key, {...block, visible: isVisible}] : [key, block]
      ))
    }

    dispatch(changeBlocks(newBlocks))
  };

  // Перемещение блока вверх
  const moveUp = (id: number) => {
    const blockEntries = Object.entries(landing);

    if (id > 0) {
      const [prevKey, prevBlock] = (blockEntries.filter(([key, value]) => value['id'] === id - 1))[0]
      const [currentKey, currentBlock] = (blockEntries.filter(([key, value]) => value['id'] === id))[0]
      if (prevBlock.id === id - 1 && prevBlock.canDown) {
        // Swap ids
        const newPrevBlock = {
          ...prevBlock,
          id: currentBlock.id,
          canUp: currentBlock.canUp,
          canDown: currentBlock.canDown,
        };
        const newCurrentBlock = {
          ...currentBlock,
          id: prevBlock.id,
          canUp: prevBlock.canUp,
          canDown: prevBlock.canDown,
        };

        dispatch(changeBlocks({
          ...landing,
          [prevKey]: newPrevBlock,
          [currentKey]: newCurrentBlock
        }))
      }
    }
  }

  // Перемещение блока вниз
  const moveDown = (id: number) => {
    const blockEntries = Object.entries(landing);

    if (id < blockEntries.length - 1) {
      const [currentKey, currentBlock] = (blockEntries.filter(([key, value]) => value['id'] === id))[0];
      const [nextKey, nextBlock] = (blockEntries.filter(([key, value]) => value['id'] === id + 1))[0];

      if (nextBlock.id === id + 1 && nextBlock.canUp) {
        // Swap ids
        const newNextBlock = {
          ...nextBlock,
          id: currentBlock.id,
          canUp: currentBlock.canUp,
          canDown: currentBlock.canDown,
        };
        const newCurrentBlock = {
          ...currentBlock,
          id: nextBlock.id,
          canUp: nextBlock.canUp,
          canDown: nextBlock.canDown,
        };

        dispatch(changeBlocks({
          ...landing,
          [nextKey]: newNextBlock,
          [currentKey]: newCurrentBlock
        }))
      }
    }
  };

  // Сброс состояния к исходному
  const resetBlocks = () => {
    dispatch(rollBackBlocks())
    dispatch(removeFiles())
  };

  if (isLoading) {
    return (
      <div className={styles.loaderBox}>
        <SimpleLoader style={{ height: '80px' }} />
      </div>
    )
  }

  // Формирование списка из блоков
  const getListedBlocks = () => {
    return Object.values(landing).sort((a, b) => a.id - b.id)
  }

  const sendlandingInfo = () => {
    if (params.school_name) {
      const formData = new FormData()
      for (const key in files) {
        if(files[key]) formData.append(key, files[key])
      }
      formData.append('formdata', JSON.stringify(landing))
      sendLanding({arg: {formdata: formData, id: Number(params.course_id)}, schoolName: params.school_name})
      dispatch(removeFiles())
      // sendLanding({schoolName: String(params.school_name), id: Number(params.course_id), data: landing})
    }
  }

  return (
    <div className={styles.blocksController}>
      <div className={styles.blocksController_controls}>
        <Button variant="secondary"
                onClick={resetBlocks}
                text="По умолчанию"/>
        <Button variant="primary"
                onClick={sendlandingInfo}
                text="Сохранить изменения"/>
      </div>
      {getListedBlocks().map((block) =>
        block.visible ? (
          <div key={block.id}
               className={styles.blocksController_wrapper}
          >
            <div className={styles.blocksController_wrapper_block}>
              {getBlock(block.content)}
              <div className={styles.blocksController_wrapper_block_buttonPanel}>
                {!block.onlyShow && <button onClick={() => setBlockVisibility(block.id, false)}>
                    <VisibilityOff fontSize="large"/>
                </button>}
                {block.canUp && <button onClick={() => moveUp(block.id)}>
                    <KeyboardArrowUp fontSize="large"/>
                </button>}
                {block.canDown && <button onClick={() => moveDown(block.id)}>
                    <KeyboardArrowDown fontSize="large"/>
                </button>}
              </div>
            </div>

          </div>
        ) : (
          <div key={block.id} className={styles.blocksController_emptySpace}>
            <button onClick={() => setBlockVisibility(block.id, true)}>
              <Visibility fontSize="large"/>
            </button>
          </div>
        )
      )}
    </div>
  );
};