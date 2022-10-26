import { getNounDeclension } from '../../../utils/getNounDeclension'

describe('getNounDeclension test function', () => {
  test('valid data', () => {
    expect(getNounDeclension(2, ['ученик', 'ученика', 'учеников'])).toBe('ученика')
  })
  test('valid data 1', () => {
    expect(getNounDeclension(1, ['ученик', 'ученика', 'учеников'])).toBe('ученик')
  })
  test('valid data 5', () => {
    expect(getNounDeclension(5, ['ученик', 'ученика', 'учеников'])).toBe('учеников')
  })
  test('valid data randomNumber', () => {
    const randomNumber = Math.floor(Math.random() * 100)
    const string = getNounDeclension(randomNumber, ['Задание', 'Задания', 'Заданий'])
    expect(getNounDeclension(randomNumber, ['Задание', 'Задания', 'Заданий'])).toBe(string)
  })
})
