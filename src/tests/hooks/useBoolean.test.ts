import { renderHook, act } from '@testing-library/react'

import { useBoolean } from 'customHooks/index'

describe('useBoolean hook', () => {
  test('check onToggle function', () => {
    const { result, unmount } = renderHook(() => useBoolean())

    expect(result.current[0]).toBe(false)
    expect(result.current[1].on).toBeInstanceOf(Function)

    act(() => result.current[1].on())

    expect(result.current[0]).toBe(false)

    unmount()
  })

  test('check ofToggle function ', () => {
    const { result, unmount } = renderHook(() => useBoolean(false))

    expect(result.current[0]).toBe(false)
    expect(result.current[1].off).toBeInstanceOf(Function)

    act(() => result.current[1].off())

    expect(result.current[0]).toBe(true)

    unmount()
  })

  test('check toggle function', () => {
    const { result, unmount } = renderHook(() => useBoolean(false))

    expect(result.current[0]).toBe(false)
    expect(result.current[1].onToggle).toBeInstanceOf(Function)

    act(() => result.current[1].onToggle())

    expect(result.current[0]).toBe(true)

    act(() => result.current[1].onToggle())

    expect(result.current[0]).toBe(false)

    unmount()
  })
})
