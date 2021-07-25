import { MaterialIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { useToaster } from 'react-hot-toast/src/core/use-toaster'
import { Animated, Text, View } from 'react-native'

const Toast = ({ t, updateHeight, offset }) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current // Initial value for opacity: 0
  const posAnim = useRef(new Animated.Value(-80)).current // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: t.visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, t.visible])

  React.useEffect(() => {
    Animated.spring(posAnim, {
      toValue: t.visible ? offset : -80,
      useNativeDriver: true,
    }).start()
  }, [posAnim, offset, t.visible])

  return (
    <Animated.View
      pointerEvents='none'
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
        opacity: fadeAnim,
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}>
      <View
        onLayout={(event) =>
          updateHeight(t.id, event.nativeEvent.layout.height)
        }
        style={{
          marginTop: 50,
          backgroundColor: t.type === 'success' ? '#4caf50' : '#f44336',
          maxWidth: '80%',
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        key={t.id}>
        <MaterialIcons
          name={t.type === 'success' ? 'check-circle-outline' : 'error-outline'}
          size={24}
          color='white'
        />
        <Text
          style={{
            color: '#fff',
            padding: 4,
            flex: 1,
            textAlign: 'center',
          }}>
          {t.message}
        </Text>
      </View>
    </Animated.View>
  )
}

const Notification = () => {
  const { toasts, handlers } = useToaster()

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          t={t}
          updateHeight={handlers.updateHeight}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
        />
      ))}
    </View>
  )
}

export default Notification
