import { Path } from '../enum/pathE'

type PATH = {
  path: Path.CreateCourse
  params: { course_id: string }
}
type TArgsWithParams = Extract<PATH, { path: any; params: any }>

export const createPath = (args: any) => {
  if (!Object.prototype.hasOwnProperty.call(args, 'params')) {
    return args.path
  }
  return Object.entries((args as TArgsWithParams).params).reduce(
    (previousValue: string, [param, value]) => previousValue.replace(`:${param}`, '' + value),
    args.path,
  )
}
