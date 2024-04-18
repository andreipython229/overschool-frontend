import { RoleE } from 'enum/roleE'

export const headerUserRoleName: { [key: string]: string } = {
  [RoleE.Admin]: 'Администратор',
  [RoleE.Student]: 'Пользователь',
  [RoleE.Teacher]: 'Помощник',
}

