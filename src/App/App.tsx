import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'Background/store'

import { Primary } from './Layouts'
import { Landing } from './Screens/Landing'
import { EmailVerify } from './Screens/EmailVerify'
import { Dashboard } from './Screens/Dashboard'

import AuthProvider, { RequireAuth } from './Components/AuthProvider'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="email-verify" element={<EmailVerify />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Primary header />
                  </RequireAuth>
                }
              >
                <Route index element={<Landing />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
