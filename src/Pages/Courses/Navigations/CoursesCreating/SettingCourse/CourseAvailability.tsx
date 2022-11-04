import { memo } from 'react'
import { Radio } from 'components/common/Radio/Radio'

export const CourseAvailability = memo(() => {
  return (
    <form>
      <h4>Доступность курса</h4>
      <legend>Отображать курс на странице школы:</legend>
      <Radio id="1" name={'visibilityCourse'} title="Всем посетителям" />
      <Radio id="2" name={'visibilityCourse'} title="Только учащимся на курсе" />
      <Radio id="3" name={'visibilityCourse'} title="Никому" />
    </form>
  )
})
