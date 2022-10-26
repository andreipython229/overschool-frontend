import { formDataConverter } from '../../../utils/formDataConverter'

describe('formDataConverter test function', () => {
  test('valid data', () => {
    expect(formDataConverter({ key: 'data', value: 'value' })).toStrictEqual({})
  })
})
