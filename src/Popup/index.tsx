import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '../App/App'
import PersistProvider from '../App/Components/PersistProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <PersistProvider>
      <App />
    </PersistProvider>
  </React.StrictMode>
)
