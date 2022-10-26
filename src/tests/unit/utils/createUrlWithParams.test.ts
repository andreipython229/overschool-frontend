import { createUrlWithParams } from '../../../utils/createUrlWithParams'

describe('createUrlWithParams test function', () => {
  test('valid data Принято', () => {
    expect(createUrlWithParams(`/homeworks_stats/?`, { status: 'Принято' })).toBe('/homeworks_stats/?&status=Принято')
  })
  test('valid data Принято + выбор курса', () => {
    expect(createUrlWithParams(`/homeworks_stats/?`, { status: 'Принято', course_name: 'Java' })).toBe(
      '/homeworks_stats/?&status=Принято&course_name=Java',
    )
  })
  test('valid data Принято + выбор курса + Домашнее задание', () => {
    expect(createUrlWithParams(`/homeworks_stats/?`, { status: 'Принято', course_name: 'Java', homework_name: 'Домашнее задание' })).toBe(
      '/homeworks_stats/?&status=Принято&course_name=Java&homework_name=Домашнее задание',
    )
  })
  test('valid data not filters', () => {
    expect(createUrlWithParams(`/homeworks_stats/?`, {})).toBe('/homeworks_stats/?')
  })
  test('valid data all params', () => {
    expect(
      createUrlWithParams(`/homeworks_stats/?`, {
        status: 'Принято',
        course_name: 'Java',
        homework_name: 'Домашнее задание',
        start_mark: '1',
        end_mark: '2',
        start_date: '2022-10-12',
        end_date: '2022-10-13',
      }),
    ).toBe(
      '/homeworks_stats/?&status=Принято&course_name=Java&homework_name=Домашнее задание&start_mark=1&end_mark=2&start_date=2022-10-12&end_date=2022-10-13',
    )
  })

  test('not valid', () => {
    expect(createUrlWithParams(`/homeworks_stats/`, {})).not.toBe('/homeworks_stats/?')
  })
})
