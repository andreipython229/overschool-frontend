import { formDataConverter } from '../../../utils/formDataConverter'

describe('formDataConverter test function', () => {
  test('valid data', () => {
    expect(formDataConverter({ key: 'data', value: 'value' })).toMatchObject({})
  })
  test('valid data parse return', () => {
    const formdata = formDataConverter({ key: 'data', value: 'value' })

    expect(Object.fromEntries(formdata.entries())).toStrictEqual({ key: 'data', value: 'value' })
  })
})
