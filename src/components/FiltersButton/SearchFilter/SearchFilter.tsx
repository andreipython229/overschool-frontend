import { ChangeEvent, FC, memo, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { searchIconPath } from '../config/svgIconsPath'
import { SearchFilterT } from '../../componentsTypes'

import style from './search_filter.module.scss'

export const SearchFilter: FC<SearchFilterT> = memo(({ name, header, data }) => {
  const [value, setValue] = useState<string>('')
  const [visibleData, setVisibleData] = useState<string[]>([])

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value)
    setVisibleData([])
  }

  return (
    <div className={style.container}>
      <p className={style.title}>{header}</p>
      <Input name={name} type={'search'} value={value} onChange={handleClick} placeholder="Начните вводить название">
        <IconSvg width={30} height={30} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={style.wrapper}>
        {data?.map((item: any) => (
          <p className={style.category_filter_item} key={item.name}>
            {item.name}
          </p>
        ))}
        {visibleData}
      </div>
      <Button text={'Применить'} variant={'primary'} />
    </div>
  )
})
