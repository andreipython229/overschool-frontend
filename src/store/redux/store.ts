import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setUserService } from '../../api/setUserService'
import { userLoginService } from '../../api/userLoginService'
import { authReduce } from './users/slice'

const rootReducer = combineReducers({
  [setUserService.reducerPath]: setUserService.reducer,
  [userLoginService.reducerPath]: userLoginService.reducer,
  user: authReduce,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userLoginService.middleware),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
