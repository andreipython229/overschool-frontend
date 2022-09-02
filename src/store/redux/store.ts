import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { coursesServices, modulesServices, userLoginService, schoolHeaderService } from '../../api'
import { authReduce, courseReduce, coursesReduce, modalReduce } from './index'

const rootReducer = combineReducers({
  [userLoginService.reducerPath]: userLoginService.reducer,
  [coursesServices.reducerPath]: coursesServices.reducer,
  [modulesServices.reducerPath]: modulesServices.reducer,
  [schoolHeaderService.reducerPath]: schoolHeaderService.reducer,
  user: authReduce,
  allCourses: coursesReduce,
  createCourse: courseReduce,
  modal: modalReduce,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'modal', 'createCourse', 'allCourses'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(userLoginService.middleware, coursesServices.middleware, modulesServices.middleware),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
