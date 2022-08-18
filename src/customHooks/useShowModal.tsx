import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { modalSelector } from '../selectors'

interface ISetShowModal {
  setShowModal: (arg: boolean) => void
}

export const useShowModal = ({ setShowModal }: ISetShowModal) => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(modalSelector)

  const clickMouseHandler = (event: MouseEvent) => {
    const target = event?.target as HTMLHeadingElement
    if (target.className.includes('Modal')) {
      setShowModal(false)
      dispatch(showModal(false))
    }
  }
  const keydownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      setShowModal(false)
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
