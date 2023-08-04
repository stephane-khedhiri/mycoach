import ReactDOM from 'react-dom/client'
import {AppRoutes} from './routing/index'
import './ui/layout/assets/css/style.css'
import {AuthProvider} from "./modules/auth/auth.provider";
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
)

