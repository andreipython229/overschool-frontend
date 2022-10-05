import { CoursesT } from '../types/CoursesT'
import { ILesson } from '../Pages/School/Navigations/navigationTypes'

export interface IFuncUpdate {
  formdata: FormData
  id: string | number
  type?: string
}

type objectDataT = CoursesT | ILesson | any

export const patchData = (
  objectData: objectDataT,
  innerKey: keyof objectDataT,
  key: string,
  value: string | Blob | File,
  funcUpdate: (arg: IFuncUpdate) => void,
  type?: string,
) => {
  if (objectData && innerKey) {
    const id = objectData[innerKey]
    const formdata = new FormData()
    formdata.append(key, value)
    if (type) {
      funcUpdate({ formdata, type, id })
    } else {
      funcUpdate({ formdata, id })
    }
  }
}
