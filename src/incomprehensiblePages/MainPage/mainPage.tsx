import { Header } from 'incomprehensiblePages/Header/Header'
import { Quality } from 'incomprehensiblePages/Quality/Quality'
import { Benefits } from 'incomprehensiblePages/Benefits/Benefits'
import { Create } from 'incomprehensiblePages/Create/Create'
import { Аvailable } from 'incomprehensiblePages/Аvailable/Аvailable'
import { CreateProject } from 'incomprehensiblePages/CreateProject/CreateProject'
import { GetStart } from 'incomprehensiblePages/GetStart/GetStart'
import { Review } from 'incomprehensiblePages/Review/Review'

import styles from './mainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <Quality />
      <Benefits />
      <Create />
      <Аvailable />
      <CreateProject />
      <GetStart />
      <Review />
    </div>
  )
}
