import { renderHook, act } from '@testing-library/react'

import { useBoolean } from 'customHooks/index'

describe('useBoolean hook', () => {
  test('check onToggle function', () => {
    const { result, unmount } = renderHook(() => useBoolean(false))

    const [toggle, { on }] = result.current

    expect(toggle).toBe(false)
    expect(on).toBeInstanceOf(Function)

    act(() => on())

    expect(toggle).toBe(false)
  })

  test('check ofToggle function', () => {
    const { result, rerender, unmount } = renderHook(() => useBoolean(false))

    const [toggle, { off }] = result.current

    expect(toggle).toBe(false)
    expect(off).toBeInstanceOf(Function)

    act(() => {
      off()
    })

    expect(toggle).toBe(true)
  })

  test('check toggle function', () => {
    const { result, rerender, unmount } = renderHook(() => useBoolean(false))

    const [toggle, { onToggle }] = result.current

    expect(toggle).toBe(false)
    expect(onToggle).toBeInstanceOf(Function)

    act(() => onToggle())

    expect(toggle).toBe(true)

    act(() => onToggle())

    expect(toggle).toBe(false)
  })
})
