import { act, renderHook } from '@testing-library/react'

import { useDebouncedFilter } from 'customHooks/index'

describe('useDebouncedFilter hook', () => {
  const dataToFilter = [
    { name: 'JS', id: 1, published: false },
    { name: 'Python', id: 2, published: false },
    { name: 'Java', id: 3, published: false },
    { name: 'c++', id: 4, published: false },
  ]

  test('check return hook', () => {
    const { result } = renderHook(() => useDebouncedFilter(dataToFilter, 'name', ''))
    const [term, filteredData, onChange] = result.current
    expect(term).toBe('')
    expect(filteredData).toStrictEqual(dataToFilter)
    expect(onChange).toBeInstanceOf(Function)
  })
})
