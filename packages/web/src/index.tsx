import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppRoutes} from './routing/index'
import './ui/layout/assets/css/style.css'
import {AuthProvider} from "./modules/auth/auth.provider";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    </React.StrictMode>,
)

