declare global {
  interface Window {
    school?: string;
  }
}

export enum Path {
  ChooseSchool = '/chooseSchool/',
  InitialPage = '/login/',
  School = '/school/:school_name/',
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
  CourseStudent = 'courses-stats/:course_id/students',
  CreateSchool = '/create-school/',
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

export enum Student {
  Courses = 'student-courses/',
  Course = 'student-course/:course_id/',
  Lesson = 'module/:section_id/:lesson_type/:lesson_id/',
}

export enum FooterPath {
  TariffPlans = 'tariff-plans/',
  PersonalDataTreatmentPolicy = 'personalDataTreatmentPolicy',
  PWA = 'PWA',
  Agreement = 'agreement/',
}
