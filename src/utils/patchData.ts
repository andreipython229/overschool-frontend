export const patchData = (objectData: any, innerKey: string, key: string, value: string | Blob | File, funcUpdate: (arg: any) => void) => {
  const id = objectData[innerKey]
  const formdata = new FormData()
  formdata.append(key, value)
  funcUpdate({ formdata, id })
}
