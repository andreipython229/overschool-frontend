import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

import { AddEmployeeModalPropsT } from '../ModalTypes'
import { AdminModal } from './AdminModal'

import { SuperAdminModal } from './SuperAdminModal'
import { useRegistrationMutation } from '../../../api/userRegisterService'

export const AddEmployeeModal: FC<AddEmployeeModalPropsT> = ({ setShowModal }) => {
  const { permission } = useAppSelector(selectUser)
  const [emailUser, setEmailUser] = useState<string>('')
  const [addRole, setAddRole] = useState<string>('')

  const [registrationAdmin, { isSuccess }] = useRegistrationMutation()

  const handleCreatEmployee = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newUser = {
      username: emailUser,
      email: emailUser,
      password1: 'Alpha1234',
      password2: 'Alpha1234',
      group_name: addRole,
    }
    await registrationAdmin(newUser)
  }
  useEffect(() => {
    if (isSuccess) {
      setShowModal()
    }
  }, [isSuccess])

  return (
    <>
      {permission === RoleE.Admin ? (
        <AdminModal
          handleCreatEmployee={handleCreatEmployee}
          setEmailUser={setEmailUser}
          setAddRole={setAddRole}
          addRole={addRole}
          emailUser={emailUser}
          setShowModal={setShowModal}
        />
      ) : (
        <SuperAdminModal
          handleCreatEmployee={handleCreatEmployee}
          setEmailUser={setEmailUser}
          setAddRole={setAddRole}
          addRole={addRole}
          emailUser={emailUser}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}
