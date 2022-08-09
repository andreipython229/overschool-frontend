import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../redux/store'

export const useAppDispatch = () => useDispatch<any>()
export const useAppSelector: TypedUseSelectorHook<any> = useSelector
