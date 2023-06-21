import { RoleE } from 'enum/roleE'

export const headerUserRoleName: { [key: string]: string } = {
  [RoleE.Admin]: 'Администратор',
  [RoleE.Student]: 'Ученик',
  [RoleE.Teacher]: 'Преподаватель',
}
