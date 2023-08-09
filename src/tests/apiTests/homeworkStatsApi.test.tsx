import { rest } from 'msw'
import { screen, waitFor } from '@testing-library/react'

import { HomeworksStatsTable } from 'components/HomeworksStatsTable/index'
import { renderWithProvider } from 'store/helpers/rednderWithProvider'
import { server } from './mock/server'

test('render homewrok stast table after fetching data', async () => {
  server.use(
    rest.get(`/api/https://api.itdev.by/api/homework_stats/`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'data received' }))
    }),
  )

  renderWithProvider(<HomeworksStatsTable isLoading={false} />)

  await waitFor(() => {
    expect(screen).toBeInTheDocument()
  })
})
