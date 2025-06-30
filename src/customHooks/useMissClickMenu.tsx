import { useBoolean } from './useBoolean'
import { useEffect, useRef } from 'react'

export const useMissClickMenu = () => {
  const [isOpen, { onToggle, on: close }] = useBoolean()

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target && menuRef.current) {
      if (!menuRef.current.contains(target) && target.className && !target.className.includes('filter')) {
        close()
      }
    }
  }

  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      close()
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
