import { CoursesT } from '../types/CoursesT'
import { ILesson } from '../types/sectionT'

export interface IFuncUpdate {
  formdata: FormData
  id: number
  type?: string
}

type objectDataT = CoursesT | ILesson | any

export const patchData = (
  objectData: objectDataT,
  innerKey: keyof objectDataT,
  key: string,
  value: string | Blob | File,
  funcUpdate: (arg: any) => void,
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
