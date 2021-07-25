import { primaryColor } from 'lib/types'
import React, { FC, forwardRef } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import tailwind from 'tailwind'

const Input: FC<Props & TextInputProps> = forwardRef(
  ({ value, onChange, label, placeholder, ...props }, ref) => {
    return (
      <View style={tailwind('w-full p-2')}>
        {label && (
          <Text style={{ color: primaryColor, ...tailwind('pb-2') }}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref as any}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder={placeholder}
          style={tailwind('bg-white rounded border border-gray-200 p-4')}
          value={value}
          onChangeText={onChange}
          {...props}
        />
      </View>
    )
  }
)

export default Input

interface Props {
  value: string
  onChange: (text: string) => void
  label?: string
  placeholder?: string
  ref?: any
}
