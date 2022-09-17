import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { modalSelector } from '../selectors'

interface ISetShowModal {
  setShowModal: (arg: boolean) => void
}

interface ICloseAll {
  closedAll: () => void
}

type funcT = ISetShowModal | ICloseAll

export const useShowModal = ({ ...func }: funcT) => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(modalSelector)

  const clickMouseHandler = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement

    if (target?.tagName === 'svg' || target?.tagName === 'path') {
      if ('setShowModal' in func) {
        func?.setShowModal(true)
        return
      } else {
        return
      }
    }
    if ((target.tagName === 'DIV' && target.className.includes('Modal_wrapper')) || target.className.includes('studentsLog_wrapper')) {
      if ('setShowModal' in func) {
        func?.setShowModal(false)
      } else {
        func?.closedAll()
      }
      dispatch(showModal(false))
    }
  }
  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      if ('setShowModal' in func) {
        func?.setShowModal(false)
      } else {
        func?.closedAll()
      }
      dispatch(showModal(false))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('click', clickMouseHandler)
    if (modal) {
      document.body.classList.add('no_scroll')
    }
    return () => {
      document.removeEventListener('click', clickMouseHandler)
      document.removeEventListener('keydown', keydownHandler)
      document.body.classList.remove('no_scroll')
    }
  }, [])
}
