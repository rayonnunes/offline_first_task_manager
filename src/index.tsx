import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Home from './views/Home'

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
