export const patchData = (lesson: any, key: string, value: string | Blob | File, funcUpdate: (arg: any) => void) => {
  const id = lesson?.lesson_id
  const formdata = new FormData()
  formdata.append(key, value)
  funcUpdate({ formdata, id })
}
