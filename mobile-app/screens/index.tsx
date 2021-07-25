import Button from 'components/Button'
import { useAuth } from 'lib/AuthContext'
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind'

const Home: FC<Props> = ({}) => {
  const { logout } = useAuth()
  return (
    <View style={tailwind('flex flex-col items-center')}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button style={tailwind('mt-6')} onPress={logout}>
        Logout
      </Button>
    </View>
  )
}

export default Home

interface Props {}
