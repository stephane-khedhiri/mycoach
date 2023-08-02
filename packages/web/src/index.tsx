import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppRoutes} from '@routing/index'
import '@ui/assets/css/style.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>,
)
