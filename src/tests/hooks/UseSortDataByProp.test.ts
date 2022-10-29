import { renderHook } from '@testing-library/react'

import { useSortDataByProp } from 'customHooks/index'

describe('userSortByProp hook', () => {
  test('check sorting by prop', () => {
    const dataToSort = [
      { name: 'Vika', age: 17, email: 'vika@gmail.com' },
      { name: 'John', age: 23, email: 'john@gmail.com' },
    ]
    const { result } = renderHook(() => useSortDataByProp(dataToSort, 'name', true))

    const sortedDataByName = [
      { name: 'John', age: 23, email: 'john@gmail.com' },
      { name: 'Vika', age: 17, email: 'vika@gmail.com' },
    ]

    expect(result.current).toStrictEqual(sortedDataByName)
  })

  test('check sorting for an empty arr', () => {
    const dataToSort: [] = []

    const { result } = renderHook(() => useSortDataByProp(dataToSort, 'name', true))

    const sortedDataByName: [] = []

    expect(result.current).toStrictEqual(sortedDataByName)
  })

  test('check sorting by equal values', () => {
    const dataToSort = [
      { name: 'Vika', age: 17, email: 'vika@gmail.com' },
      { name: 'John', age: 23, email: 'vika@gmail.com' },
    ]

    const { result } = renderHook(() => useSortDataByProp(dataToSort, 'email', true))

    const sortedDataByName = [
      { name: 'Vika', age: 17, email: 'vika@gmail.com' },
      { name: 'John', age: 23, email: 'vika@gmail.com' },
    ]

    expect(result.current).toStrictEqual(sortedDataByName)
  })
})
