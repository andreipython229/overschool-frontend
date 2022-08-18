import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { showModal } from 'store/redux/modal/slice'
import { modalSelector } from '../selectors'

export const useShowModal = ({ setShowModal }: any) => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(modalSelector)
  const clickMouseHandler = (event: any): void => {
    if (event?.target?.className?.includes('Modal')) {
      setShowModal(false)
      dispatch(showModal(false))
    }
  }
  const keydownHandler = ({ key }: any) => {
    if (key === 'Escape') {
      setShowModal(false)
      dispatch(showModal(false))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('click', clickMouseHandler)
    modal && document.body.classList.add('no_scroll')
    return () => {
      document.removeEventListener('click', clickMouseHandler)
      document.removeEventListener('keydown', keydownHandler)
      document.body.classList.remove('no_scroll')
    }
  }, [])
}
