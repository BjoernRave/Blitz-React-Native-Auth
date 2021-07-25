import { parse, splitCookiesString } from 'set-cookie-parser'
import { Cookie } from './types'
import { DependencyList, useEffect } from 'react'

export const API_URL = __DEV__ ? 'http://localhost:3000' : 'https://<YOUR_API>'

export default function useEffectAsync(effect: any, inputs: DependencyList) {
  useEffect(() => {
    effect()
  }, inputs)
}

export const toQueryString = (params: object) => {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  )
}

export const createCookieString = (cookies: Cookie[]) => {
  return cookies
    .filter((c) => Boolean(c.name) && Boolean(c.value))
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')
}

export const extractCookiesFromResponse = (response: Response) => {
  const combinedCookieHeader = response.headers.get('Set-Cookie')
  const splitCookieHeaders = splitCookiesString(combinedCookieHeader)
  const cookies = parse(splitCookieHeaders)

  return cookies
}
