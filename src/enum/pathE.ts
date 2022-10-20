export enum Path {
  InitialPage = '/login/',
  Courses = 'courses/',
  Group = 'group/:group_id',
  Profile = 'profile/',
  Settings = 'settings/',
  CreateCourse = 'create-course/:course_id/',
  CourseStats = 'courses-stats/',
  HomeWork = 'home-work',
  HelpCenter = 'help-center',
  TariffPlans = 'tariff-plans',
  SignUp = '/signup',
}

export enum SettingsPath {
  Main = 'main/',
  Employees = 'employees/',
  Logs = 'logs/',
  Decoration = 'decoration/',
}

export enum CreateCoursePath {
  Constructor = 'constructor',
  Student = 'student',
  Settings = 'settings',
}

export enum StudentLogs {
  GroupSettings = 'group-settings',
}

export enum Student {
  Courses = 'student-courses/',
  Course = 'student-course/:course_id/',
  Lesson = 'module/:section_id/:lesson_type/:lesson_id/',
  // Course = 'course/:course_id',
  Chats = 'chats/*',
  Class = 'class',
}

export enum FooterPath {
  TariffPlans = 'tariff-plans/',
}