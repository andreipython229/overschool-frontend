import React from 'react'
import { Radio } from '../../../../../../components/common/Radio/Radio'

export const CourseAvailability = () => {
  return (
    <div>
      <form>
        <h4>Доступность курса</h4>
        <legend>Отображать курс на странице школы:</legend>
        <Radio id="1" title="Всем посетителям" />
        <Radio id="2" title="Только учащимя на курсе" />
        <Radio id="3" title="Никому" />
      </form>
    </div>
  )
}
