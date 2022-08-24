import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage'

import { coursesServices, userLoginService } from '../../api'
import { authReduce, courseReduce, coursesReduce, modalReduce } from './index'

const rootReducer = combineReducers({
  [userLoginService.reducerPath]: userLoginService.reducer,
  [coursesServices.reducerPath]: coursesServices.reducer,
  user: authReduce,
  allCourses: coursesReduce,
  createCourse: courseReduce,
  modal: modalReduce,
})

const allCoursesBlackListed = createBlacklistFilter('allCourses', ['courses'])
const persistConfig = {
  key: 'root',
  storage,
  transforms: [allCoursesBlackListed],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        userLoginService.middleware,
        coursesServices.middleware,
      ),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
