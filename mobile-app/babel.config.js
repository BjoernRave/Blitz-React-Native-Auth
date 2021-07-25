module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            tailwind: './lib/tailwind',
            components: './components',
            lib: './lib',
            screens: './screens',
          },
        },
      ],
    ],
  }
}
