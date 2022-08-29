import React, { useState} from 'react';
import { MyEditor } from 'components/MyEditor/MyEditor';
import { AddVideo } from 'components/AddVideo/AddVideo';
import { AddAudio } from 'components/AddAudio/AddAudio';
import { AddTextarea } from 'components/AddTextarea/AddTextarea';
import { ContentBtn } from 'Pages/Courses/Navigations/CoursesCreating/RedactorCourse/ContentBtn/ContentBtn';

import styles from './addPost.module.scss';

import Text from '../.././assets/img/createCourse/text.svg';
import Video from '../.././assets/img/createCourse/video.svg';
import Audio from '../.././assets/img/createCourse/audio.svg';
import Code from '../.././assets/img/createCourse/code.svg';

export const AddPost = () => {

    const [MyEditorShow, setMyEditorShow] = useState<boolean>(false);
    const [AddVideoShow, setAddVideo] = useState<boolean>(false);
    const [AddAudioShow, setAddAudio] = useState<boolean>(false);
    const [AddTextareaShow, setAddTextarea] = useState<boolean>(false);
    

    return (
    <>
        {MyEditorShow ? <MyEditor /> : null}
        {AddVideoShow ? <AddVideo setShow={setAddVideo} /> : null}
        {AddAudioShow ? <AddAudio setShow={setAddAudio} /> : null}
        {AddTextareaShow ? <AddTextarea setShow={setAddTextarea} /> : null}

        <section className={styles.redactorCourse_rightSide_functional_creating}>
          <div className={styles.redactorCourse_rightSide_functional_creating_title}>Добавить контент</div>
          <div className={styles.redactorCourse_rightSide_functional_creating_function}>
            <ContentBtn func={() => {setMyEditorShow(true)}} text={'Текс'} alt={'Add text for lesson'} src={Text} />
            <ContentBtn func={() => {setAddVideo(true)}} text={'Видео'} alt={'Add video for lesson'} src={Video} />
            <ContentBtn func={() => {setAddAudio(true)}} text={'Аудио'} alt={'Add audio for lesson'} src={Audio} />
            <ContentBtn func={() => {setAddTextarea(true)}} text={'Код'} alt={'Add code for lesson'} src={Code} />
          </div>
        </section>
    </>

    )
}