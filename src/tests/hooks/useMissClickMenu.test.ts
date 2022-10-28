import { renderHook, act, fireEvent } from '@testing-library/react'
import { useMissClickMenu } from '../../customHooks/useMissClickMenu'

describe('useMissClickMenu hook', () => {
  test('check return hook', () => {
    const { result } = renderHook(() => useMissClickMenu())
    expect(result.current.menuRef).toStrictEqual({ current: null })
    expect(result.current.isOpen).toBe(false)
    expect(result.current.onToggle).toBeInstanceOf(Function)
  })

  test('check onToggle', () => {
    const { result } = renderHook(() => useMissClickMenu())

    act(() => {
      result.current.onToggle()
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.onToggle()
    })
    expect(result.current.isOpen).toBe(false)
  })
  test('check ESCAPE', () => {
    const { result } = renderHook(() => useMissClickMenu())
    act(() => {
      result.current.onToggle()
    })
    expect(result.current.isOpen).toBe(true)

    fireEvent.keyDown(document, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })

    expect(result.current.isOpen).toBe(false)
  })
})
