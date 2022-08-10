import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage'

import { getAllCoursesService, setUserService, userLoginService } from '../../api'
import { authReduce, courseReduce, coursesReduce } from './index'

const rootReducer = combineReducers({
  [setUserService.reducerPath]: setUserService.reducer,
  [userLoginService.reducerPath]: userLoginService.reducer,
  [getAllCoursesService.reducerPath]: getAllCoursesService.reducer,
  user: authReduce,
  allCourses: coursesReduce,
  createCourse: courseReduce,
})

const authBlackListedFields = createBlacklistFilter('allCourses', ['courses'])
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["auth"],
  transforms: [authBlackListedFields],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        userLoginService.middleware,
        getAllCoursesService.middleware,
      ),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
