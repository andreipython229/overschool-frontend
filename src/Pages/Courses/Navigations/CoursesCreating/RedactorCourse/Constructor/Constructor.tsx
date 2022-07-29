import React, { useState } from 'react';
import {
  ModalTypeClasses,
  SettingClassesUsually,
  TasksModal,
  TestModal,
  WebinarModal,
} from 'components/Modal';

import { useAppDispatch } from 'store/redux/store';
import { addClasses } from 'store/redux/course/slice';
import { ClassesSettings } from './ClassesSettings/ClassesSettings';
import { LessonAddBlock } from 'Pages/Courses/Navigations/CoursesCreating/RedactorCourse/Constructor/LessonAddBlock/LessonAddBlock';

import styles from './constructor.module.scss';
import { AddModuleModal } from 'components/Modal/CoursesModal/AddModuleModal';
import { SettingsClassesModal } from 'components/Modal/CoursesModal/SettingsClassesModal';

export const Constructor = () => {
  const dispatch = useAppDispatch();
  const [typeClassesModal, setTypeClassesModal] = useState<boolean>(false);
  const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null);
  const [showModalModule, setShowModalModule] = useState<boolean>(false);
  const [settingClassesModal, setSettingClassesModal] = useState<boolean>(false);

  const showSettingsClasses = () => {
    setSettingClassesModal(!settingClassesModal);
  };

  const toggleModalModule = () => {
    setShowModalModule(!showModalModule);
  };

  const setModalTypeClasses = () => {
    setTypeClassesModal(!typeClassesModal);
  };

  const goToBack = () => {
    setModalTypeClasses();
    setActiveTypeClasses(null);
  };

  const closedAllModal = () => {
    setActiveTypeClasses(null);
  };

  const setTypeModal = (id: number) => {
    setActiveTypeClasses(id);
    setModalTypeClasses();
  };

  const addCourse = (name: string, type: string) => {
    setActiveTypeClasses(null);
    dispatch(addClasses({ name, type }));
  };

  return (
    <div className={styles.redactorCourse}>
      {typeClassesModal && (
        <ModalTypeClasses changeClasses={setTypeModal} closeModal={setModalTypeClasses} />
      )}
      {activeTypeClasses === 0 && (
        <SettingClassesUsually
          closedAll={closedAllModal}
          addCourse={addCourse}
          goToBack={goToBack}
        />
      )}
      {activeTypeClasses === 1 && (
        <TasksModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />
      )}
      {activeTypeClasses === 2 && (
        <TestModal closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse} />
      )}
      {activeTypeClasses === 3 && (
        <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack} />
      )}

      {showModalModule && <AddModuleModal toggleModal={toggleModalModule} />}
      {settingClassesModal && <SettingsClassesModal closeModal={showSettingsClasses} />}

      <LessonAddBlock
        setModalTypeClasses={setModalTypeClasses}
        toggleModalModule={toggleModalModule}
      />
      <ClassesSettings showSettingsClassesModal={showSettingsClasses} />
    </div>
  );
};
