import { backgroundColor, primaryColor, secondaryColor } from 'lib/types'
import React, { FC } from 'react'
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from 'react-native'
import tailwind from 'tailwind'

const Button: FC<PressableProps & Props> = ({
  children,
  isLoading,
  inverted,
  disabled,
  fontSize = 24,
  ...props
}) => {
  return (
    <Pressable
      android_ripple={{ color: secondaryColor }}
      disabled={disabled || isLoading}
      {...props}
      style={{
        ...tailwind('rounded-xl px-8 py-2'),
        backgroundColor: disabled
          ? 'gray'
          : inverted
          ? secondaryColor
          : primaryColor,
        ...(props.style as any),
      }}>
      {isLoading ? (
        <ActivityIndicator size={30} animating color={backgroundColor} />
      ) : (
        <Text
          style={{
            fontSize,
            color: inverted ? primaryColor : backgroundColor,
            textAlign: 'center',
          }}>
          {children}
        </Text>
      )}
    </Pressable>
  )
}

export default Button

interface Props {
  isLoading?: boolean
  inverted?: boolean
  fontSize?: number
}
