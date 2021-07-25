import { useMutation as useReactMutation } from 'react-query'
import { useAuth } from 'lib/AuthContext'
import {
  API_URL,
  createCookieString,
  extractCookiesFromResponse,
} from 'lib/utils'

const useMutation = ({ route }: { route: string }) => {
  const { cookies, setCookies } = useAuth()

  const res = useReactMutation(async (params: any) => {
    const response = await fetch(`${API_URL}${route}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...(cookies?.length > 0 && { Cookie: createCookieString(cookies) }),
        params,
        version: 1,
      }),
    })

    if (response.headers.get('set-cookie')) {
      setCookies(extractCookiesFromResponse(response))
    }

    const res = await response.json()

    return res
  })

  return res
}

export default useMutation
