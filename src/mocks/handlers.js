import { rest } from 'msw'
import MockUsers_10 from '../mock_data/users_10.json'
import MockUsers_15 from '../mock_data/users_10.json'
import SearchAPI_10 from '../mock_data/search_api_10.json'
import SearchAPI_15 from '../mock_data/search_api_10.json'
const users_data = [MockUsers_10, MockUsers_15]
const search_data = [SearchAPI_10, SearchAPI_15]

export const handlers = [
  rest.get('https://api.github.com/search/users', async (req, res, ctx) => {
    // const originalResponse = await ctx.fetch(req)
    // const originalResponseData = await originalResponse.json()
    // console.log(originalResponseData.items)
    window.localStorage.setItem('req', req)
    const query = req.url.searchParams
    // console.log('query', query)
    // console.log('rest req', req)
    // console.log('rest req.params', req.params)
    console.log('rest req.url.searchParams', req.url.searchParams)
    const users = search_data[0]
    // console.log('users', users)
    return res(ctx.json(users))
  }),

  rest.get(`https://api.github.com/users/:user`, async (req, res, ctx) => {
    console.log('rest req.params.user', req.params.user)
    return res(
      ctx.json(
        users_data[0].users.find((user) => user.login === req.params.user)
      )
    )
  }),
]
