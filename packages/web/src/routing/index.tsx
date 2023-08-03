import {FunctionComponent, useEffect} from 'react'
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'
import {PageDashboard} from './../pages/home'
import {AuthRouting} from './../modules/auth/auth.routing'
import {useAuth} from './../modules/auth/auth.provider'


export const Redirect: FunctionComponent<{ to: string }> = ({to}) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to)
    })
    return null
}
export const AppRoutes: FunctionComponent = () => {
    const {IsAuth} = useAuth()
    return (
        <BrowserRouter>
            <Routes>
                {IsAuth() ? (
                    <>
                        <Route path="/home" element={<PageDashboard/>}/>
                        <Route path="/*" element={<Navigate to="/home"/>}/>
                    </>
                ) :(
                    <>
                        <Route path="/auth/*" element={<AuthRouting />} />
                    </>
                )
                }
            </Routes>
        </BrowserRouter>
    )
}