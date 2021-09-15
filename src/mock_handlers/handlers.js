import { rest } from 'msw'
import MockUsers_10 from '../mock_data/users_10.json'
import MockUsers_15 from '../mock_data/users_15.json'
import SearchAPI_10 from '../mock_data/search_api_10.json'
import SearchAPI_15 from '../mock_data/search_api_15.json'

const __users__ = { foobar: MockUsers_10, 'frontend masters': MockUsers_15 }
const __search__ = { foobar: SearchAPI_10, 'frontend masters': SearchAPI_15 }

const findUser = (usersArray) => (userName) =>
  __users__[usersArray].users.find((user) => user.login === userName)

const findFoobarUser = findUser('foobar')
const findFrontendMastersUser = findUser('frontend masters')

export const handlers = [
  rest.get('https://api.github.com/search/users', async (req, res, ctx) => {
    // const originalResponse = await ctx.fetch(req)
    // const originalResponseData = await originalResponse.json()
    // console.log(originalResponseData.items)

    const query = req.url.searchParams
    const users_q = __search__[query.get('q')]
    if (users_q === undefined)
      return res(ctx.status(404), ctx.json({ total_count: 0, items: [] })) // No users found
    return res(ctx.status(200), ctx.json(users_q))
  }),

  rest.get(`https://api.github.com/users/:user`, async (req, res, ctx) => {
    const foobarUser = findFoobarUser(req.params.user)
    const user = foobarUser
      ? foobarUser
      : findFrontendMastersUser(req.params.user)

    return res(ctx.status(200), ctx.json(user))
  }),
]
