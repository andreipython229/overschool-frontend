import { findLength } from '../../../utils/findLength'

describe('find next order Lesson Array', () => {
  test('valid data', () => {
    expect(
      findLength(1, [
        {
          section_name: 'name',
          section: 1,
          lessons: [
            { id: 1, name: 'string', order: 1, type: 'string' },
            { id: 1, name: 'string', order: 1, type: 'string' },
          ],
        },
        { section_name: 'name 2', section: 2, lessons: [] },
        { section_name: 'name 3', section: 3, lessons: [] },
      ]),
    ).toBe(3)
  })
  test('valid data', () => {
    expect(
      findLength(2, [
        {
          section_name: 'name',
          section: 1,
          lessons: [
            { id: 1, name: 'string', order: 1, type: 'string' },
            { id: 1, name: 'string', order: 1, type: 'string' },
          ],
        },
        { section_name: 'name 2', section: 2, lessons: [] },
        { section_name: 'name 3', section: 3, lessons: [] },
      ]),
    ).toBe(1)
  })
  test('not valid data', () => {
    expect(
      findLength(1, [
        {
          section_name: 'name',
          section: 1,
          lessons: [
            { id: 1, name: 'string', order: 1, type: 'string' },
            { id: 1, name: 'string', order: 1, type: 'string' },
          ],
        },
        { section_name: 'name 2', section: 2, lessons: [] },
        { section_name: 'name 3', section: 3, lessons: [] },
      ]),
    ).not.toBe(2)
  })
})
