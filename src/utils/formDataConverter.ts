export const formDataConverter = (data: object) => {
  const formdata = new FormData()
  const arrKeys: string[] = Object.keys(data)
  const arrValues: string[] = Object.values(data)
  arrKeys.forEach((item, index: number) => formdata.append(item, arrValues[index]))
  return formdata
}
