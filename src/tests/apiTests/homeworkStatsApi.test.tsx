import { rest } from 'msw'

import { HomeworksStatsTable } from 'components/HomeworksStatsTable/index'
import { renderWithProvider } from 'store/helpers/rednderWithProvider'
import { server } from './mock/server'

test('render homewrok stast table after fetching data', async () => {
  server.use(
    rest.get(`https://api.itdev.by/api/homeworks_stats/`, (req, res, ctx) => {
      return res(ctx.json({ message: 'data received' }))
    }),
  )

  renderWithProvider(<HomeworksStatsTable />)
})
