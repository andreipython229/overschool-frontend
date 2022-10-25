import { useBoolean } from './useBoolean'
import { useEffect, useRef } from 'react'

export const useMissClickMenu = () => {
  const [isOpen, { onToggle, on }] = useBoolean()

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (target?.tagName === 'svg' || target?.tagName === 'path') {
      on()
      return
    }

    if (!menuRef.current?.contains(target) && !target?.className?.includes('filter')) {
      on()
    }
  }

  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      on()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  return { menuRef, isOpen, onToggle }
}
