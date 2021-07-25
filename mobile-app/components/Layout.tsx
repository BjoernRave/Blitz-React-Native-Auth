import { backgroundColor, primaryColor } from 'lib/types'
import React, { FC, ReactNode } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import tailwind from 'tailwind'

const Layout: FC<Props> = ({ children, style, action, title }) => {
  return (
    <View
      style={{
        ...tailwind(`h-full ${title ? 'p-4' : ''}`),
        backgroundColor: backgroundColor,
        ...style,
      }}>
      {title && (
        <View style={tailwind('justify-between items-center mt-2 flex-row')}>
          <Text
            style={{
              ...tailwind('font-bold text-4xl'),
              color: primaryColor,
            }}>
            {title}
          </Text>
          {action}
        </View>
      )}

      {children}
    </View>
  )
}

export default Layout

interface Props {
  style?: ViewStyle
  title?: string
  action?: ReactNode
}
