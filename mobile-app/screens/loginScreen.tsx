import Button from 'components/Button'
import Layout from 'components/Layout'
import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'
import SocialLogin from 'components/SocialLogin'
import { primaryColor } from 'lib/types'
import React, { FC, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import tailwind from 'tailwind'

const LoginScreen: FC<Props> = ({ onAuth }) => {
  const [isSigningUp, setIsSigningUp] = useState(false)

  return (
    <Layout
      style={{
        ...tailwind('items-center w-full'),
      }}>
      <View style={tailwind('flex m-8 flex-col items-center w-full mb-2')}>
        <Image
          source={require('../assets/icon_fitted.png')}
          style={{ width: '40%', height: 90 }}
        />
        <Text
          style={{
            ...tailwind('font-bold  text-2xl text-center mt-4'),
            color: primaryColor,
          }}>
          Example App
        </Text>
      </View>
      <ScrollView style={tailwind('w-full px-2')}>
        {isSigningUp ? (
          <SignupForm onAuth={onAuth} />
        ) : (
          <LoginForm onAuth={onAuth} />
        )}
        {
          <Button
            style={tailwind('my-2 py-2')}
            onPress={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? 'Back' : 'No Account yet? Sign up'}
          </Button>
        }
        <SocialLogin onAuth={onAuth} />
      </ScrollView>
    </Layout>
  )
}

export default LoginScreen

interface Props {
  onAuth: (
    type: 'login' | 'signup' | 'google' | 'twitter',
    params?: any
  ) => Promise<void>
}
