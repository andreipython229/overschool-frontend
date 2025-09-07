import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const RouteHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isInitialLoad = useRef(true)

  useEffect(() => {
    const isInitialLoad = sessionStorage.getItem('isInitialLoad') === null

    if (isInitialLoad) {
      const savedPath = localStorage.getItem('savedPath')
      if (savedPath && savedPath !== location.pathname) {
        navigate(savedPath, { replace: true })
      }
      sessionStorage.setItem('isInitialLoad', 'false')
    }
  }, [navigate, location.pathname])

  useEffect(() => {
    // Сохранение текущего пути перед закрытием окна
    const handleBeforeUnload = () => {
      localStorage.setItem('savedPath', location.pathname)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [location.pathname])

  return null
}

export default RouteHandler
