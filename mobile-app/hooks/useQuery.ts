import { useQuery as useReactQuery } from 'react-query'
import { useAuth } from 'lib/AuthContext'
import {
  API_URL,
  createCookieString,
  extractCookiesFromResponse,
} from 'lib/utils'

const useQuery = ({
  name,
  route,
  params,
}: {
  name: string
  route: string
  params?: any
}) => {
  const { cookies, setCookies } = useAuth()

  const queryResult = useReactQuery(
    params ? [name, params] : name,
    async () => {
      const response = await fetch(`${API_URL}${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...(cookies?.length > 0 && { Cookie: createCookieString(cookies) }),
          ...(params ? { params } : { params: {} }),
          version: 1,
        }),
      })

      if (response.headers.get('set-cookie')) {
        setCookies(extractCookiesFromResponse(response))
      }

      const res = await response.json()

      return res
    },
    { refetchOnWindowFocus: false }
  )

  return queryResult
}

export default useQuery
