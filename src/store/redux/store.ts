import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as services from '../../api/index'
import { authReduce, sectionsReduce, filtersReducer } from './index'

const rootReducer = combineReducers({
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
  [services.questionsAndAnswersService.reducerPath]: services.questionsAndAnswersService.reducer,
  user: authReduce,
  sections: sectionsReduce,
  filters: filtersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'sections', 'filters'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(
        services.coursesServices.middleware,
        services.userLoginService.middleware,
        services.modulesServices.middleware,
        services.schoolHeaderService.middleware,
        services.profileService.middleware,
        services.studentsGroupService.middleware,
        services.courseStatService.middleware,
        services.homeworksStatsService.middleware,
        services.userHomeworkService.middleware,
        services.userRegisterService.middleware,
        services.questionsAndAnswersService.middleware,
      ),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
