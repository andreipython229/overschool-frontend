import React, { ChangeEvent, FC, memo, useState } from 'react'
import { Input } from 'components/common/Input/Input/Input'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { Button } from 'components/common/Button/Button'
import { searchSvgIcon } from '../../../constants/iconSvgConstants'
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
        <IconSvg
          width={20}
          height={20}
          viewBoxSize="0 0 20 20"
          d={searchSvgIcon}
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
