import { View, Text } from 'react-native'
import React from 'react'
import NetworkInfoProvider from './src/components/NetworkInfoProvider'
import Navigator from './src/navigations/Navigator'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import Login from './src/screens/auth/Login'

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NetworkInfoProvider />
        <Navigator />
      </View>
    </Provider>
  )
}

export default App