import { StatusBar } from 'expo-status-bar'
import { AuthContextProvider } from 'lib/AuthContext'
import { backgroundColor } from 'lib/types'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import Notification from 'components/Notification'
import tailwind from 'tailwind'
import Home from 'screens'

const queryClient = new QueryClient()

export default function App() {
  return (
    <SafeAreaView
      style={{
        backgroundColor,
        ...tailwind('h-full w-full'),
      }}>
      <Notification />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Home />
        </AuthContextProvider>
      </QueryClientProvider>
    </SafeAreaView>
  )
}
