import React, { FC } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'

const SocialLogin: FC<Props> = ({ onAuth }) => {
  return (
    <>
      <TouchableOpacity
        style={{
          ...tailwind(
            'my-2 px-4 border bg-white py-2 rounded-lg flex-row items-center'
          ),
          borderColor: 'rgb(194, 200, 208)',
        }}
        onPress={async () => await onAuth('twitter')}>
        <Image
          style={{ height: 30, width: 35, marginRight: 10 }}
          source={require('../assets/twitterLogo.png')}
        />
        <Text style={tailwind('text-lg')}>Continue with Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...tailwind(
            'my-2 px-4 border bg-white py-2 rounded-lg flex-row items-center'
          ),
          borderColor: 'rgb(194, 200, 208)',
        }}
        onPress={async () => await onAuth('google')}>
        <Image
          style={{ height: 35, width: 35, marginRight: 10 }}
          source={require('../assets/googleLogo.png')}
        />
        <Text style={tailwind('text-lg')}>Continue with Google</Text>
      </TouchableOpacity>
    </>
  )
}

export default SocialLogin

interface Props {
  onAuth: (type: 'google' | 'twitter', params?: any) => Promise<void>
}
