import { youtubeParser } from '../../../utils/youtubeParser'

describe('youtubeParser test function', () => {
  test('valid data', () => {
    const url = 'https://www.youtube.com/watch?v=H2GCkRF9eko'
    expect(youtubeParser(url)).toBe('H2GCkRF9eko')
  })
  test('valid data 2', () => {
    const url = 'https://www.youtube.com/watch?v=y2emL1fMRyY&t=5832s'
    expect(youtubeParser(url)).toBe('y2emL1fMRyY')
  })
})
