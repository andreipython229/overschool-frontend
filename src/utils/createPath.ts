import { Path } from '../enum/pathE'

type PATH = {
  path: Path.CreateCourse
  params?: { course_id: string }
}

interface IParams {
  params?: string[]
}

type TArgsWithParams = Extract<PATH, { path: string; params?: IParams }>

export const createPath = (args: PATH) => {
  if (!Object.prototype.hasOwnProperty.call(args, 'params')) {
    return args.path
  }
  return Object.entries((args as TArgsWithParams)['params']).reduce(
    (previousValue: string, [param, value]) => previousValue.replace(`:${param}`, '' + value),
    args.path,
  )
}
