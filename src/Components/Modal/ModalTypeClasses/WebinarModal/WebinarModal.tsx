import React, {ChangeEvent, FC, useState} from 'react';
import styles from '../../Modal.module.scss'
import {Input} from "../../../common/Input/Input/Input";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {SelectInput} from "../../../common/SelectInput/SelectInput";
import {arrNumber, arrTime} from '../../../../utils';
import {Button} from "../../../common/Button/Button";

type WebinarModalPropsT = {
    goToBack: () => void
    addCourse: (name: string, type: string) => void
    closedAll: () => void
}

export const WebinarModal: FC<WebinarModalPropsT> = ({goToBack, addCourse, closedAll}) => {
    const [settingsActive, setSettingsActive] = useState<number>(0)
    const [nameClasses, setNameClasses] = useState<string>('')
    const [reminderForStudent, setReminderForStudent] = useState<boolean>(false)
    const [reminderForEmployees, setReminderForEmployees] = useState<boolean>(false)

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameClasses(event.currentTarget.value)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.classesContainer}>
                <div onClick={closedAll} className={styles.classesContainer_closed}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.3125 12.6875L12.6875 1.3125M12.6875 12.6875L1.3125 1.3125" stroke="#E0DCED"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className={styles.webinar}>
                    <svg width="53" height="55" viewBox="0 0 53 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.3534 22.8704C28.3425 22.8704 33.235 17.9778 33.235 11.9887C33.235 5.99571 28.3386 1.16846 22.3534 1.16846C16.3681 1.16846 11.4717 5.99571 11.4717 11.9887C11.4717 17.9778 16.3642 22.8704 22.3534 22.8704ZM22.3534 4.01136C26.7506 4.01136 30.3921 7.60084 30.3921 11.9887C30.3921 16.3836 26.805 20.0275 22.3534 20.0275C17.9017 20.0275 14.3146 16.3836 14.3146 11.9887C14.3146 7.59851 17.897 4.01136 22.3534 4.01136Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M41.9669 17.2599L41.967 17.2599L41.9624 17.2561C41.1362 16.5677 40.0844 16.206 39.0126 16.3439C37.961 16.4184 36.9807 16.9122 36.2824 17.7501C34.8813 19.4314 35.0853 22.0187 36.774 23.4282C36.7748 23.4288 36.7756 23.4295 36.7764 23.4302L39.2905 25.5764L39.2904 25.5765L39.2985 25.5831C40.0521 26.1997 40.9601 26.5561 41.888 26.5561C42.51 26.5561 43.1395 26.4183 43.6997 26.1349L45.1967 27.7285V40.7293H40.9561C40.4541 31.0422 32.4138 23.3447 22.6604 23.3447C12.8494 23.3447 4.80537 31.0396 4.36172 40.7293H2.57282C1.80523 40.7293 1.15137 41.3832 1.15137 42.1508V52.2253C1.15137 52.9929 1.80523 53.6468 2.57282 53.6468H50.3654C51.1329 53.6468 51.7868 52.9929 51.7868 52.2253V42.1508C51.7868 42.1301 51.7855 42.1094 51.783 42.0888C51.6948 41.3832 51.0823 40.7293 50.3039 40.7293H48.0396V27.1004C48.0396 26.8288 47.9809 26.3851 47.6279 26.1109L45.615 23.9348C46.2524 22.3704 45.7936 20.5218 44.4848 19.4093L41.9669 17.2599ZM38.5883 21.2529L38.5883 21.2529L38.5837 21.2491C38.0726 20.8231 38.0142 20.0967 38.4635 19.5575C38.6746 19.3041 38.9151 19.1737 39.2793 19.1231H39.2796H39.28H39.2803H39.2807H39.281H39.2814H39.2817H39.2821H39.2824H39.2828H39.2831H39.2835H39.2838H39.2841H39.2845H39.2848H39.2852H39.2855H39.2859H39.2862H39.2865H39.2869H39.2872H39.2876H39.2879H39.2883H39.2886H39.2889H39.2893H39.2896H39.29H39.2903H39.2906H39.291H39.2913H39.2916H39.292H39.2923H39.2927H39.293H39.2933H39.2937H39.294H39.2943H39.2947H39.295H39.2953H39.2957H39.296H39.2963H39.2967H39.297H39.2973H39.2977H39.298H39.2983H39.2986H39.299H39.2993H39.2996H39.3H39.3003H39.3006H39.3009H39.3013H39.3016H39.3019H39.3022H39.3026H39.3029H39.3032H39.3035H39.3039H39.3042H39.3045H39.3048H39.3052H39.3055H39.3058H39.3061H39.3064H39.3067H39.3071H39.3074H39.3077H39.308H39.3083H39.3087H39.309H39.3093H39.3096H39.3099H39.3102H39.3105H39.3108H39.3112H39.3115H39.3118H39.3121H39.3124H39.3127H39.313H39.3133H39.3136H39.3139H39.3142H39.3146H39.3149H39.3152H39.3155H39.3158H39.3161H39.3164H39.3167H39.317H39.3173H39.3176H39.3179H39.3182H39.3185H39.3188H39.3191H39.3194H39.3197H39.32H39.3203H39.3205H39.3208H39.3211H39.3214H39.3217H39.322H39.3223H39.3226H39.3229H39.3232H39.3235H39.3237H39.324H39.3243H39.3246H39.3249H39.3252H39.3255H39.3257H39.326H39.3263H39.3266H39.3269H39.3271H39.3274H39.3277H39.328H39.3283H39.3285H39.3288H39.3291H39.3294H39.3296H39.3299H39.3302H39.3305H39.3307H39.331H39.3313H39.3315H39.3318H39.3321H39.3323H39.3326H39.3329H39.3331H39.3334H39.3337H39.3339H39.3342H39.3344H39.3347H39.335H39.3352H39.3355H39.3357H39.336H39.3363H39.3365H39.3368H39.337H39.3373H39.3375H39.3378H39.338H39.3383H39.3385H39.3388H39.339H39.3393H39.3395H39.3397H39.34H39.3402H39.3405H39.3407H39.341H39.3412H39.3414H39.3417H39.3419H39.3422H39.3424H39.3426H39.3429H39.3431H39.3433H39.3436H39.3438H39.344H39.3442H39.3445H39.3447H39.3449H39.3452H39.3454H39.3456H39.3458H39.3461H39.3463H39.3465H39.3467H39.3469H39.3471H39.3474H39.3476H39.3478H39.348H39.3482H39.3484H39.3487H39.3489H39.3491H39.3493H39.3495H39.3497H39.3499H39.3501H39.3503H39.3505H39.3507H39.3509H39.3511H39.3513H39.3515H39.3517H39.3519H39.3521H39.3523H39.3525H39.3527H39.3529H39.3531H39.3533H39.3535H39.3536H39.3538H39.354H39.3542H39.3544H39.3546H39.3548H39.3549H39.3551H39.3553H39.3555H39.3557H39.3558H39.356H39.3562H39.3563H39.3565H39.3567H39.3569H39.357H39.3572H39.3574H39.3575H39.3577H39.3579H39.358H39.3582H39.3584H39.3585H39.3587H39.3588H39.359H39.3591H39.3593H39.3595H39.3596H39.3598H39.3599H39.3601H39.3602H39.3604H39.3605H39.3606H39.3608H39.3609H39.3611H39.3612H39.3614H39.3615H39.3616H39.3618H39.3619H39.362H39.3622H39.3623H39.3624H39.3626H39.3627H39.3628H39.3629H39.3631H39.3632H39.3633H39.3634H39.3636H39.3637H39.3638H39.3639H39.364H39.3641H39.3643H39.3644H39.3645H39.3646H39.3647H39.3648H39.3649H39.365H39.3651H39.3652H39.3653H39.3654H39.3655H39.3656H39.3657H39.3658H39.3659H39.366H39.3661H39.3662H39.3663H39.3664H39.3665H39.3665H39.3666H39.3667H39.3668H39.3669H39.367H39.367H39.3671H39.3672H39.3673H39.3673H39.3674H39.3675H39.3676H39.3676H39.3677H39.3678H39.3678H39.3679H39.3679H39.368H39.3681H39.3681H39.3682H39.3682H39.3683H39.3683H39.3684H39.3685H39.3685H39.3685H39.3686H39.3686H39.3687H39.3687H39.3688H39.3688H39.3688H39.3689H39.3689H39.369H39.369H39.369H39.3691H39.3691H39.3691H39.3692H39.3692H39.3693H39.3693H39.3693H39.3694C39.6413 19.1231 39.9309 19.216 40.1216 19.4067C40.1309 19.416 40.1405 19.4249 40.1505 19.4334L42.6691 21.5835L42.6691 21.5835L42.6737 21.5873C43.1822 22.011 43.2426 22.7322 42.8008 23.2705C42.354 23.7541 41.6191 23.8278 41.1045 23.4009C41.1038 23.4003 41.1031 23.3997 41.1024 23.3991L38.5883 21.2529ZM22.599 26.1261C30.819 26.1261 37.6085 32.5795 38.0515 40.6679H7.15016C7.64852 32.5755 14.3832 26.1261 22.599 26.1261ZM48.8825 50.8039H3.93284V43.5722H48.8825V50.8039Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.classesContainer_title}>Настройте вебинар</span>
                </div>

                <div className={styles.navBtn}>
                    <span onClick={() => setSettingsActive(0)}
                          className={settingsActive === 0
                              ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}>
                        Основные</span>
                    <span onClick={() => setSettingsActive(1)}
                          className={settingsActive === 1
                              ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}>
                        Баллы за прохождение</span>
                </div>

                {settingsActive === 0
                    ? <>
                        <div style={{marginTop: '15px'}} className={styles.usually_input}>
                            <span className={styles.usually_title}>Название вебинара:</span>
                            <Input placeholder={'Основы языка HTML'} name={'name classes'}
                                   onChange={(e) => changeName(e)} type={'text'}
                                   value={nameClasses}/>
                        </div>
                        <div className={styles.webinar_checkboxPack}>
                            <div className={styles.webinar_checkbox}>
                                <Checkbox id={'reminderS'} name={'Reminder for student'} checked={reminderForStudent}
                                          onChange={() => setReminderForStudent(!reminderForStudent)}/>
                                <div className={styles.webinar_checkbox_text}>
                                    <span className={styles.webinar_checkbox_text_for}>Напоминание для учеников</span>
                                    <span className={styles.webinar_checkbox_text_desc}>Ученикам будет приходить напоминание о начале вебинара по email</span>
                                </div>
                            </div>
                            <div className={styles.tasks_credit}>
                                <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                                <div className={styles.tasks_credit_select}>
                                    <SelectInput optionsList={arrNumber}/>
                                    <SelectInput optionsList={arrTime}/>
                                </div>
                                <span className={styles.tasks_credit_desc}>до начала</span>
                            </div>
                            <div className={styles.webinar_addReminder}>+ Добавить ещё одно напоминание</div>


                            <div className={styles.webinar_checkbox}>
                                <Checkbox id={'reminderE'} name={'Reminder for employees'}
                                          checked={reminderForEmployees}
                                          onChange={() => setReminderForEmployees(!reminderForEmployees)}/>
                                <div className={styles.webinar_checkbox_text}>
                        <span
                            className={styles.webinar_checkbox_text_for}>Напоминание для ответственных сотрудников</span>
                                    <span className={styles.webinar_checkbox_text_desc}>Им будут приходить напоминания о начале вебинара по email</span>
                                </div>
                            </div>
                            <div className={styles.tasks_credit}>
                                <span className={styles.tasks_credit_desc}>Напомнить о вебинаре за</span>
                                <div className={styles.tasks_credit_select}>
                                    <SelectInput optionsList={arrNumber}/>
                                    <SelectInput optionsList={arrTime}/>
                                </div>
                                <span className={styles.tasks_credit_desc}>до начала</span>
                            </div>
                            <div className={styles.webinar_addReminder}>+ Добавить ещё одно напоминание</div>
                        </div>
                        <div style={{marginTop: '15px'}} className={styles.usually_input}>
                            <span className={styles.usually_title}>Ответственные сотрудники:</span>
                            <Input placeholder={'Основы языка HTML'} name={'name classes'}
                                   onChange={(e) => changeName(e)} type={'text'}
                                   value={nameClasses}/>
                        </div>
                    </>
                    : <div>
                        <span className={styles.usually_title}>Сколько баллов будет выдано ученику по завершению занятия:</span>
                        <div className={styles.usually_grade}>
                            <input type={'number'} placeholder={'0'} className={styles.usually_grade_points}/>
                            <span>баллов</span>
                        </div>
                    </div>}


                <div className={styles.btnBlock}>
                    <Button onClick={goToBack} text={'Назад'}/>
                    <Button onClick={() => addCourse(nameClasses, 'webinar')} text={'Добавить занятие'}
                            variant={'primary'}/>
                </div>
            </div>

        </div>
    );
};

