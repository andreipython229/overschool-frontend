import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as services from '../../api/index'
import { authReduce, modalReduce, platformReduce, sectionsReduce } from './index'

const rootReducer = combineReducers({
  [services.userLoginService.reducerPath]: services.userLoginService.reducer,
  [services.coursesServices.reducerPath]: services.coursesServices.reducer,
  [services.modulesServices.reducerPath]: services.modulesServices.reducer,
  [services.schoolHeaderService.reducerPath]: services.schoolHeaderService.reducer,
  [services.lessonsServices.reducerPath]: services.lessonsServices.reducer,
  [services.profileService.reducerPath]: services.profileService.reducer,
  [services.studentsGroupService.reducerPath]: services.studentsGroupService.reducer,
  [services.courseStatService.reducerPath]: services.courseStatService.reducer,
  user: authReduce,
  modal: modalReduce,
  sections: sectionsReduce,
  platform: platformReduce,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'modal', 'createCourse', 'allCourses', 'platform'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        services.coursesServices.middleware,
        services.userLoginService.middleware,
        services.modulesServices.middleware,
        services.schoolHeaderService.middleware,
        services.profileService.middleware,
        services.lessonsServices.middleware,
        services.studentsGroupService.middleware,
        services.courseStatService.middleware,
      ),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
