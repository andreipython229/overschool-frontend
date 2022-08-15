import { FC, useState } from 'react'
import style from './filter.module.scss';
import { Input } from 'components/common/Input/Input/Input';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { Button } from 'components/common/Button/Button';

type Filter = {
  name: string
  header: any,
  data: any
}

export const Filter:FC<Filter> = ({ name,  header, data}: any) => {
  const [value, setValue] = useState('');
  const [visibleData, setVisibleData] = useState([]);
  const [active, setActive] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlerSearch(data, event.target.value);
    setValue(event.target.value);
  }

  const handlerSearch = (items: any, term: any) => {
    if (term.length === 0) {
        setVisibleData([]) 
        return;
    }
    const newData = items.filter((item:any) => {
        return item.toLowerCase().indexOf(term.toLowerCase()) > -1
    }).map((item: string) => {
      return (
        <div onClick={handleClick} className={style.element} key={item}>{item}</div>
      )
    })
    setVisibleData(newData)   
}

  const handleClick = (e: any) => {
    setValue(e.target.textContent);
    setVisibleData([]) 
  }

  return (
    <div className={style.container}>
       <p className={style.title}>{header}</p>
       <Input name={name} type={"text"} value={value} onChange={(e) => handleChange(e)} placeholder="Начните вводить название">
       <IconSvg width={20} height={20} fill={'#D1D5DB'} d={'M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z'}/>
       </Input>
       <div className={style.wrapper}>
        {visibleData}
       </div>
       <Button text={'Применить'} variant={'primary'}/>
    </div>
  )
}