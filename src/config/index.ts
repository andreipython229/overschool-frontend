export { lessonSvgMapper } from './LessonsMaper'
export { navByRolesConfig } from './navByRolesConfig'
export { headerUserRoleName } from './headerUserRoleName'
import config from './imagePath'

declare global {
  interface Window {
    appConfig: typeof config;
  }
}

window.appConfig = config;
