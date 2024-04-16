import { FC, PointerEvent } from 'react'
import styles from './addPicture.module.scss'
import { AddPostT } from 'types/componentsTypes'
import { useDeleteBlockMutation, useUpdatePictureBlockDataMutation } from 'api/blocksService'
import { Reorder, useDragControls } from 'framer-motion'
import { deletePath } from 'config/commonSvgIconsPath'
import { doBlockIconPath } from 'components/Modal/SettingStudentTable/config/svgIconsPath'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import Picture from '../.././assets/img/createCourse/picture.svg'

export const AddPicture: FC<AddPostT> = ({ block, setLessonBlocks, lessonBlocks, pictureUrl }) => {
  const schoolName = window.location.href.split('/')[4]
  const [deleteBlock, { isLoading }] = useDeleteBlockMutation()
  const [saveChanges, { isLoading: isSaving }] = useUpdatePictureBlockDataMutation()
  const controls = useDragControls()

  const handleDeletePicture = () => {
    if (lessonBlocks && setLessonBlocks && block) {
      deleteBlock({ id: block.id, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.filter(item => item.id !== block.id)
          setLessonBlocks(updatedArray)
        })
    }
  }

  const handlePictureUpload = (blockId: number, picture: File) => {
    if (picture && blockId && block && lessonBlocks && setLessonBlocks) {
      const dataJson = {
        picture: picture,
        id: blockId,
        type: block.type,
        order: block.order,
        picture_url: '',
      }
      const dataToSend = new FormData()
      dataToSend.append('picture', picture)
      dataToSend.append('id', String(blockId))
      dataToSend.append('type', block.type)
      dataToSend.append('order', String(block.order))
      saveChanges({ blockId: blockId, data: dataToSend, schoolName })
        .unwrap()
        .then(data => {
          const updatedArray = lessonBlocks.map(item => {
            if (item.id === block.id) {
              dataJson.picture_url = data.picture_url
              return dataJson
            }
            return item
          })
          setLessonBlocks(updatedArray)
        })
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    controls.start(event)
  }

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.1,
        borderRadius: '7px',
      }}
      key={block && block.id}
    >
      <div className={styles.redactorCourse_wrapper}>
        <div className={styles.videoHandlerWrapper}>
          <div className={styles.redactorCourse_rightSide_functional_addContent}>
            {pictureUrl ? (
              <img width={'100%'} src={pictureUrl} alt={'Lesson picture'} />
            ) : (
              <>
                <input
                  disabled={isSaving || isLoading}
                  className={styles.redactorCourse_rightSide_functional_addContent_input}
                  onChange={e => handlePictureUpload(Number(block?.id), e.target.files![0])}
                  type="file"
                  multiple
                />
                {isSaving ? (
                  <SimpleLoader style={{ height: '3rem', width: '3rem' }} />
                ) : (
                  <img style={{ width: '4rem', height: '4rem', color: '#8a49b5', marginBottom: '0.5rem' }} src={Picture} />
                )}
                <span>Загрузите новое изображение с вашего устройства</span>
                <Button type={'button'} disabled={isSaving} variant={'primary'} text={'Выбрать файл'} />
              </>
            )}
          </div>
        </div>
        <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock}>
          <span className={styles.redactorCourse_rightSide_functional_addContent_navBlock_grabBtn} onPointerDown={onPointerDown}>
            <IconSvg width={11} height={15} className="zIndex: 20" viewBoxSize="0 0 12 18" path={doBlockIconPath} />
          </span>
          <div className={styles.redactorCourse_rightSide_functional_addContent_navBlock_delete} onClick={handleDeletePicture}>
            {isLoading ? <SimpleLoader /> : <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deletePath} />}
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
