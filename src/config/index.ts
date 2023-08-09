export { lessonSvgMapper } from './LessonsMaper'
export { navByRolesConfig } from './navByRolesConfig'
export { headerUserRoleName } from './headerUserRoleName'
import config from './imagePath'
import youtubeKey from "./youtube_api";

declare global {
  interface Window {
    appConfig: typeof config;
    youTubeAPIKey: typeof youtubeKey;
  }
}

window.appConfig = config;
window.youTubeAPIKey = youtubeKey;
