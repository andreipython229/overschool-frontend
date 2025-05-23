declare global {
  interface Window {
    school?: string
  }
}

export enum Path {
  ChooseSchool = '/chooseSchool/',
  InitialPage = '/',
  School = '/school/:school_name/',
  DefaultSchool = '/school/Coursehub/',
  Courses = 'courses/',
  Group = 'group/:group_id',
  Profile = 'profile/',
  Settings = 'settings/',
  CreateCourse = 'create-course/:course_id/',
  CourseStats = 'courses-stats/',
  HomeWork = 'home-work/',
  CheckHomeWork = ':lesson_id/:studentHomeworkId/:courseId/',
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
  HelpWorkQuide = ':work-quide',
  HelpSchoolSettings = ':school-settings',
  HelpOverAI = 'overai',
  HelpStudents = 'students',
  HelpGroupSettings = 'groups',
  HelpCheckHW = 'check-hw',
  HelpDomainLink = 'domain',
  ResetPassword = '/token-validate/:userId/:token/',
  HelpChat = 'chat/',
  Appeals = 'school-appeals/',
  Meetings = 'meetings/',
  Materials = 'materials/',
  CourseMaterials = 'create-course/:course_id/materials/',
  Rating = 'rating/',
  Bonus = 'bonus/',
  HelpGidStart = 'help-gid-start/',
  HelpPlatformSettings = 'help-platform-settings/',
  SocialAuth = '/social-auth-complete/',
}

export enum SettingsPath {
  Banner = 'banner/',
  Main = 'main/',
  Employees = 'employees/',
  Logs = 'logs/',
  Decoration = 'decoration/',
  SchoolPassport = 'passport/',
  PaymentMethods = 'payment-methods/',
  DomainSettings = 'domain/',
  PromotionSettings = 'promo/',
  EmailNewsLetter = 'email-newsletter/',
  Bonuses = 'bonuses/',
  Referal = 'invites/',
}

export enum CreateCoursePath {
  Banner = 'banner',
  Constructor = 'constructor',
  Student = 'student',
  Settings = 'settings',
  Page = 'page',
  Comments = 'comments',
  Materials = 'materials',
  Certificates = 'certificates',
}

export enum Student {
  Courses = 'student-courses/',
  Course = 'student-course/:course_id/',
  Lesson = 'module/:section_id/:lesson_type/:lesson_id/',
}

export enum FooterPath {
  TariffPlans = 'tariff-plans/',
  PersonalDataTreatmentPolicy = 'personalDataTreatmentPolicy',
  CookiePolicy = 'cookiePolicy',
  CookiePolicyDisclaimer = 'cookiePolicyDisclaimer',
  PersonalDataProcessing = 'personalDataProcessing',
  PublicOfferAgreement = 'publicOfferAgreement',
  PWA = 'PWA',
  Agreement = 'agreement/',
  HelpPage = '/help/',
}
