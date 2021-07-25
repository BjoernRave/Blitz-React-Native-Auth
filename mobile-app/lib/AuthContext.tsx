import AsyncStorage from '@react-native-async-storage/async-storage'
import NetworkError from 'components/NetworkError'
import { makeRedirectUri, startAsync } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { toast } from 'react-hot-toast/src/core/toast'
import { ActivityIndicator, View } from 'react-native'
import LoginScreen from 'screens/loginScreen'
import { parse, splitCookiesString } from 'set-cookie-parser'
import tailwind from 'tailwind'
import { Cookie, User } from './types'
import useEffectAsync, {
  API_URL,
  createCookieString,
  extractCookiesFromResponse,
} from './utils'

const redirectUrl = makeRedirectUri({ native: 'exampleapp://auth' })

export const COOKIE_KEY = 'cookies'

const initialValues: {
  cookies: Cookie[]
  logout: () => void
  setCookies: Dispatch<SetStateAction<Cookie[]>>
  user: User
} = {
  cookies: null,
  logout: null,
  user: null,
  setCookies: null,
}

const AuthContext = createContext(initialValues)

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [networkFail, setNetworkFail] = useState(false)
  const [cookies, setCookies] = useState(null)
  const [user, setUser] = useState(null)

  const logout = async () => {
    setCookies([])
    setUser(undefined)
    SecureStore.deleteItemAsync(COOKIE_KEY)
    AsyncStorage.removeItem('user')
  }

  const getUser = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/users/queries/getCurrentUser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...(cookies?.length > 0 && {
              Cookie: createCookieString(cookies),
            }),
            params: {},
            version: 1,
          }),
        }
      )

      const res = await response.json()

      if (res.error) {
        setUser(undefined)
        return
      }

      if (response.headers.get('set-cookie')) {
        setCookies(extractCookiesFromResponse(response))
      }

      if (res.result) {
        setUser(res.result)
        AsyncStorage.setItem('user', JSON.stringify(res.result))
      } else {
        setUser(undefined)
      }
    } catch (error) {
      console.log('error thrown', error.message)
      if (error.message.indexOf('Network request failed') !== -1) {
        const savedUser = await AsyncStorage.getItem('user')
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        } else {
          setNetworkFail(true)
        }
      }
    }
  }

  useEffectAsync(async () => {
    if (cookies !== null && !user) {
      if (cookies?.length === 0) {
        setUser(undefined)
        return
      }

      await getUser()
    }
  }, [cookies])

  useEffectAsync(async () => {
    const storedCookies = await SecureStore.getItemAsync(COOKIE_KEY)

    if (storedCookies && storedCookies !== null && storedCookies !== 'null') {
      setCookies(JSON.parse(storedCookies))
    } else {
      setCookies([])
    }
  }, [])

  useEffectAsync(async () => {
    if (cookies !== null) {
      await SecureStore.setItemAsync(COOKIE_KEY, JSON.stringify(cookies))
    }
  }, [cookies])

  const handleLogin = async (params: any) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/mutations/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...(cookies?.length > 0 && { cookie: createCookieString(cookies) }),
          params,
          version: 1,
        }),
      })

      if (response.headers.get('set-cookie')) {
        setCookies(extractCookiesFromResponse(response))
      } else {
        toast.error('There was a problem logging you in')
      }

      const res = await response.json()

      if (res.error) {
        if (res.error.statusCode === 401) {
          toast.error('The password you entered was wrong')
        } else {
          toast.error('There was a problem logging you in')
        }
      }
    } catch (error) {
      console.log('error', error)
      toast.error('There was a problem logging you in')
    }
  }

  const handleSignup = async (params: any) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/mutations/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'anti-csrf': cookies.find(
            (c) => c.name.indexOf('sAntiCsrfToken') !== -1
          )?.value,
        },
        body: JSON.stringify({
          ...(cookies?.length > 0 && { cookie: createCookieString(cookies) }),
          params,
          version: 1,
        }),
      })

      if (response.headers.get('set-cookie')) {
        setCookies(extractCookiesFromResponse(response))
      } else {
        toast.error('There was a problem signing you up')
      }

      const res = await response.json()

      if (res.error) {
        if (
          res.error.message.indexOf(
            'Unique constraint failed on the fields: (`email`)'
          ) !== -1
        ) {
          toast.error('This email is already in use')
        } else if (res.error.statusCode === 401) {
          toast.error('The password you entered was wrong')
        } else {
          toast.error('There was a problem signing you up')
        }
      }
    } catch (error) {
      console.log('error', error)
      toast.error('There was a problem signing you up')
    }
  }

  const handleSocialLogin = async (type: 'google' | 'twitter') => {
    const authUrl = `${API_URL}/api/auth/${type}?redirectUrl=${encodeURIComponent(
      `${API_URL}/api/callback?redirectUrl=${redirectUrl}`
    )}`

    const response = await startAsync({ authUrl, returnUrl: redirectUrl })

    if (response.type !== 'success' || response.errorCode) {
      toast.error(
        'There was a problem during authentication, please try again.'
      )
      return
    }

    const cookiesArray = splitCookiesString(response.params.cookies)

    const parsedCookies = parse(cookiesArray)

    setCookies(parsedCookies)
  }

  const handleAuth = async (
    type: 'login' | 'signup' | 'google' | 'twitter',
    params?: any
  ) => {
    if (type === 'login') {
      await handleLogin(params)
      return
    }

    if (type === 'signup') {
      await handleSignup(params)
      return
    }

    await handleSocialLogin(type)
  }

  if (networkFail) {
    return (
      <NetworkError
        onRetry={async () => {
          setNetworkFail(false)
          await getUser()
        }}
      />
    )
  }

  if (user === null)
    return (
      <View style={tailwind('mt-8')}>
        <ActivityIndicator animating size='large' />
      </View>
    )

  if (user === undefined) {
    return (
      <AuthContext.Provider value={{ setCookies, cookies, logout, user }}>
        <LoginScreen onAuth={handleAuth} />
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{ setCookies, cookies, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
