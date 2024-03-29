import { FC, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './portal.module.scss'

type PortalT = {
  children: ReactNode
  closeModal: () => void
}

export const Portal: FC<PortalT> = ({ closeModal, children}) => {
  const createOverlay = () => {
    const div = document.createElement('div')
    div.setAttribute('class', styles.wrapper)
    return div
  }

  const [container] = useState(() => createOverlay())

  const clickMouseHandler = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement
    if (target.className.includes('portal_wrapper')) {
      closeModal()
    }
  }
  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      closeModal()
    }
  }


  const handleClick = (event:MouseEvent) => {
    const target = event?.target as HTMLHeadingElement
    if (target.className.includes('portal_wrapper')) {
      closeModal()
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.appendChild(container)
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('dblclick', clickMouseHandler)
    document.body.setAttribute('class', styles.open_modal)
    document.addEventListener("click", handleClick);
    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeChild(container)
      document.removeEventListener('dblclick', clickMouseHandler)
      document.removeEventListener('keydown', keydownHandler)
      document.body.removeAttribute('class')
      document.removeEventListener("click", handleClick);
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}
