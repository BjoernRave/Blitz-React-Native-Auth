import Button from 'components/Button'
import React, { FC, useState } from 'react'
import { Image, Text, View } from 'react-native'
import tailwind from 'tailwind'
import { primaryColor } from '../lib/types'

const NetworkError: FC<Props> = ({ onRetry }) => {
  const [isLoading, setisLoading] = useState(false)

  return (
    <View style={tailwind('mt-8 w-full')}>
      <View style={tailwind('flex mb-6 flex-col items-center w-full')}>
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
      <Text style={tailwind('text-xl text-center mb-6')}>
        There was a problem reaching the server, please try again.
      </Text>
      <Button
        isLoading={isLoading}
        onPress={async () => {
          setisLoading(true)
          await onRetry()
          setisLoading(false)
        }}>
        Try again
      </Button>
    </View>
  )
}

export default NetworkError

interface Props {
  onRetry: () => Promise<void>
}
