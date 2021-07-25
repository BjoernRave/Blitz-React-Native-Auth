import Input from 'components/Input'
import React, { FC, useRef, useState } from 'react'
import { View } from 'react-native'
import tailwind from 'tailwind'
import Button from './Button'

const LoginForm: FC<Props> = ({ onAuth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    await onAuth('login', { email, password })
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
      <Button
        disabled={!Boolean(email) || !Boolean(password)}
        isLoading={isLoading}
        style={tailwind('my-4 py-2')}
        onPress={handleSubmit}>
        Login
      </Button>
    </View>
  )
}

export default LoginForm

interface Props {
  onAuth: (type: 'login', params: any) => Promise<void>
}
