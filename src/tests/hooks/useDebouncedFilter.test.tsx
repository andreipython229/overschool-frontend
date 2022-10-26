import { renderHook, fireEvent } from '@testing-library/react'

import { renderWithProvider } from 'store/helpers/rednderWithProvider'
import { useDebouncedFilter } from 'customHooks/index'
import { CoursePage } from 'Pages/School/Navigations/CoursesCreating/CoursePage'
import { act } from 'react-dom/test-utils'

const dataToFilter = [
  { name: 'JS', id: 1, published: false },
  { name: 'Python', id: 1, published: false },
  { name: 'Java', id: 1, published: false },
  { name: 'c++', id: 1, published: false },
]

describe('useDebouncedFilter hook', () => {
  test('check onChange func', () => {
    const { getByRole } = renderWithProvider(<CoursePage />)

    const { result, unmount } = renderHook(() => useDebouncedFilter(dataToFilter, 'name', ''))

    const [term, _, onChange] = result.current

    expect(term).toBe('')
    expect(onChange).toBeInstanceOf(Function)

    act(() => onChange({ target: { value: 'hello' } }))

    expect(term).toBe('hello')
  })
})
