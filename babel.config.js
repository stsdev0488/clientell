module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "Redux": "./App/Redux",
          "Sagas": "./App/Sagas",
          "Screens": "./App/Screens",
          "Themes": "./App/Themes",
          "Components": "./App/Components",
          "Containers": "./App/Containers",
          "Services": "./App/Services",
          "Transforms": "./App/Transforms",
          "Lib": "./App/Lib",
          "Images": "./App/Images",
          "Config": "./App/Config",
          "Navigation": "./App/Navigation",
          "Modals": "./App/Modals",
          "Hooks": "./App/Hooks"
        },
        "extensions": [".js", ".ios.js", ".android.js"]
      }
    ]
  ],
  env: {
    "production": {
      "plugins": ["ignite-ignore-reactotron"]
    }
  }
};
