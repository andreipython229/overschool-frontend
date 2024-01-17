import { NewTextEditor } from 'components/AddTextEditor/NewTextEditor'
import { FC, useEffect, useState } from 'react'
import { IBlockDesc, IHomework, ILesson } from 'types/sectionT'

type DescLessonBlockT = {
  lesson: ILesson | IHomework
  block: IBlockDesc
}

export const DescriptionLessonBlock: FC<DescLessonBlockT> = ({ lesson, block }) => {
  const [lessonDescription, setLessonDescription] = useState<string>('')

  useEffect(() => {
    if ('description' in block && block.description) {
      setLessonDescription(block.description)
    } else {
      setLessonDescription('')
    }
  }, [block])

  return (
    <>
      {/* {'description' in block && block.description ? (
        <NewTextEditor text={block.description} setLessonDescription={setLessonDescription} />
      ) : (
        <NewTextEditor text={lessonDescription} setLessonDescription={setLessonDescription} />
      )} */}
    </>
  )
}
