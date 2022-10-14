import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as services from '../../api/index'
import { authReduce, sectionsReduce } from './index'

const rootReducer = combineReducers({
  [services.userCountByMonthService.reducerPath]: services.userCountByMonthService.reducer,
  [services.userLoginService.reducerPath]: services.userLoginService.reducer,
  [services.coursesServices.reducerPath]: services.coursesServices.reducer,
  [services.modulesServices.reducerPath]: services.modulesServices.reducer,
  [services.schoolHeaderService.reducerPath]: services.schoolHeaderService.reducer,
  [services.profileService.reducerPath]: services.profileService.reducer,
  [services.studentsGroupService.reducerPath]: services.studentsGroupService.reducer,
  [services.courseStatService.reducerPath]: services.courseStatService.reducer,
  [services.homeworksStatsService.reducerPath]: services.homeworksStatsService.reducer,
  [services.userHomeworkService.reducerPath]: services.userHomeworkService.reducer,
  [services.userHomeworkService.reducerPath]: services.userHomeworkService.reducer,
  [services.userRegisterService.reducerPath]: services.userRegisterService.reducer,
  user: authReduce,
  sections: sectionsReduce,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'sections'],
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
        services.userCountByMonthService.middleware,
        services.studentsGroupService.middleware,
        services.courseStatService.middleware,
        services.homeworksStatsService.middleware,
        services.userHomeworkService.middleware,
        services.userRegisterService.middleware,
      ),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
