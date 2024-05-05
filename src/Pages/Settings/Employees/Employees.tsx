import React, { FC, useEffect, useState } from 'react'

import { Employee } from './Employee/Employee'
import { useBoolean } from 'customHooks/useBoolean'
import { avatar } from '../../../assets/img/common/index'
import { AddEmployeeModal } from 'components/Modal'
import { Portal } from 'components/Modal/Portal/index'
import { EmployeeT } from 'types/userT'
import { useFetchAllUsersQuery, useLazyFetchAllUsersQuery } from '../../../api/allUsersList'

import styles from '../superAdmin.module.scss'
import styles_load from 'components/Modal/Modal.module.scss'
import { SimpleLoader } from '../../../components/Loaders/SimpleLoader'
import {Pagination} from "../../../components/Pagination/Pagination";
import {usePagination} from "../../../customHooks";
import { getUserIdFromLocalStorage } from 'utils/getUserId';


export const Employees: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const userId = getUserIdFromLocalStorage();
  // const { data: allUsers, isSuccess, isFetching } = useFetchAllUsersQuery({schoolName: schoolName})
  const [fetchAllUsers, { data: allUsers, isSuccess, isFetching }] = useLazyFetchAllUsersQuery()
  const [employees, setEmployees] = useState<EmployeeT[]>([])
  const [isModalOpen, { off: openModal, on: closeModal }] = useBoolean()
  const [isRenameModalOpenState, setIsRenameModalOpenState] = useState<boolean>(false);

  const { page, onPageChange, paginationRange } = usePagination({ totalCount: allUsers?.count as number })

  const handleOpenRenameModal = () => {
    setIsRenameModalOpenState(true);
  }

  useEffect(() => {
    if (allUsers) {
      const filteredUsers = allUsers.results.filter((user: any) => user.role === 'Teacher' || user.role === 'Admin')
      setEmployees(filteredUsers)
    }
  }, [isRenameModalOpenState, isSuccess, allUsers])

  useEffect(() => {
    fetchAllUsers({schoolName: schoolName, page: page , role: "staff"})
    setIsRenameModalOpenState(false);
  }, [isRenameModalOpenState, page])

  return (
    <>
      {isFetching && (
        <div className={styles_load.loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      {isModalOpen && (
        <Portal closeModal={closeModal}>
          <AddEmployeeModal employees={employees} setEmployees={setEmployees} setShowModal={closeModal} />
        </Portal>
      )}
      <div className={styles.wrapper_actions}>
        <div className={styles.employees}>
          <div className={styles.employees_header}>
            <div className={styles.employees_header_title}>Сотрудники</div>
            <button onClick={openModal} className={styles.employees_header_btn}>
              + Сотрудник
            </button>
          </div>

          <div className={styles.employees_table}>
            {employees && employees?.length ? (
              <div className={styles.wrapper}>
                <div className={styles.employees_table_title}>
                  <div>Пользователь</div>
                  <div>Роль</div>
                </div>
                {employees?.map((employee: EmployeeT) => (
                  <Employee
                    key={employee.id}
                    avatar={employee.avatar || avatar}
                    name={(employee.pseudonym && employee.id !== userId)? `${employee.pseudonym}` : (employee.last_name || employee.first_name) ? `${employee.last_name}  ${employee.first_name}` : 'Нет имени'}
                    contact={employee.email}
                    role={employee.role}
                    id={employee.id}
                    employees={employees}
                    setEmployees={setEmployees}
                    isModalRenameOpen={handleOpenRenameModal}
                  />
                ))}
              </div>
            ) : (
              <p style={{ color: 'lightslategrey' }}>Пока что сотрудников на платформе нет</p>
            )}
          </div>
        </div>
        <Pagination
          className={styles.pagination}
          paginationRange={paginationRange}
          currentPage={page}
          onPageChange={onPageChange}
      />
      </div>
    </>
  )
}
