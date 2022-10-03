import { CoursesT } from '../types/CoursesT'
import { ILesson } from '../Pages/School/Navigations/navigationTypes'

export interface IFuncUpdate {
  formdata: FormData
  id: string | number
}

type objectDataT = CoursesT | ILesson | any

export const patchData = async (
  objectData: objectDataT,
  innerKey: keyof objectDataT,
  key: string,
  value: string | Blob | File,
  funcUpdate: (arg: IFuncUpdate) => void,
) => {
  if (objectData && innerKey) {
    const id = objectData[innerKey]
    const formdata = new FormData()
    formdata.append(key, value)
    if (id) {
      await funcUpdate({ formdata, id })
    }
  }
}
