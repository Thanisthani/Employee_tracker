import React from 'react';
import { Provider } from 'react-redux';
import AuthNavigation from './Navigation/AuthNavigation';
import {store } from './features/store'

function Index() {
  return (
      <>
          <Provider store={store}>
              <AuthNavigation />
          </Provider>
      </>
  )
}

export default Index