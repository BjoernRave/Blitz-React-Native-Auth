import Input from 'components/Input'
import React, { FC, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind'
import Button from './Button'

const SignupForm: FC<Props> = ({ onAuth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    await onAuth('signup', { email, password })
    setIsLoading(false)
  }

  return (
    <View style={tailwind('w-full')}>
      <Input
        keyboardType='email-address'
        onSubmitEditing={() => {
          ref.current.focus()
        }}
        value={email}
        onChange={(v) => setEmail(v)}
        label='E-mail'
      />
      <Input
        onSubmitEditing={handleSubmit}
        ref={ref}
        secureTextEntry
        value={password}
        onChange={(v) => setPassword(v)}
        label='Password'
      />
      <Text style={tailwind('my-2')}>
        The password must be at least 8 characters long and must contain at
        least one letter and character
      </Text>
      <Button
        disabled={
          !Boolean(email) ||
          !Boolean(password) ||
          password.length < 8 ||
          !/[0-9]/g.test(password) ||
          !/[a-zA-Z]/g.test(password)
        }
        isLoading={isLoading}
        style={tailwind('my-4 py-2')}
        onPress={handleSubmit}>
        Signup
      </Button>
    </View>
  )
}

export default SignupForm

interface Props {
  onAuth: (type: 'signup', params: any) => Promise<void>
}
