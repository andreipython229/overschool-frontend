import { ResetPassword } from 'Pages/ResetPassword'
import { boolean } from 'yup/lib/locale'

declare global {
  interface Window {
    school?: string
  }
}

export enum Path {
  ChooseSchool = '/chooseSchool/',
  InitialPage = '/',
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
  TariffPlansInfo = '/tariff-plans-info',
  SignUp = '/signup',
  CourseStudent = 'courses-stats/:course_id/students',
  CreateSchool = '/create-school/',
  Chat = '',
  Certificate = '/certificate/:certLink',
  Catalog = '/course-catalog/',
  CatalogCourse = ':courseId/',
  LoginPage = '/login/',
  HelpPage = '/help/',
  Help = ':school/',
  HelpUserAccount = ':user-account',
  HelpSchoolSettings = ':school-settings',
  HelpOverAI = 'overai',
  HelpCheckHW = 'check-hw',
  ResetPassword = '/token-validate/:userId/:token/',
  Appeals = 'school-appeals/',
}

export enum SettingsPath {
  Main = 'main/',
  Employees = 'employees/',
  Logs = 'logs/',
  Decoration = 'decoration/',
  SchoolPassport = 'passport/',
  PaymentMethods = 'payment-methods/',
}

export enum CreateCoursePath {
  Constructor = 'constructor',
  Student = 'student',
  Settings = 'settings',
  Comments = 'comments',
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
