import { findLength } from '../../../utils/findLength'

describe('find next order Lesson Array', () => {
  test('valid data', () => {
    expect(
      findLength(1, [
        {
          section_name: 'name',
          section: 1,
          lessons: [
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
          ],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 2',
          section: 2,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 3',
          section: 3,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
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
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
          ],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 2',
          section: 2,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 3',
          section: 3,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
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
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
            { id: 1, name: 'string', order: 1, type: 'string', viewed: true, completed: false, active: false },
          ],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 2',
          section: 2,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
        {
          section_name: 'name 3',
          section: 3,
          lessons: [],
          group_settings: {
            strict_task_order: true,
            task_submission_lock: true,
          },
        },
      ]),
    ).not.toBe(2)
  })
})
