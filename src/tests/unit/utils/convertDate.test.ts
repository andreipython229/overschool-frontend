import { convertDate } from '../../../utils/convertDate'

describe('convert date test function', () => {
  test('valid data', () => {
    expect(convertDate(new Date('2022-10-21T11:02:15.750052Z'))).toStrictEqual({
      hoursAndMinutes: '14:02',
      mmddyyyy: '21.10.2022',
      reversedmmddyyyy: '2022.10.21',
    })
  })
  test('not valid data', () => {
    expect(convertDate(new Date('2022-10-21T11:02:15'))).not.toStrictEqual({
      hoursAndMinutes: '14:02',
      mmddyyyy: '21.10.2022',
      reversedmmddyyyy: '2022.10.21',
    })
  })
})
