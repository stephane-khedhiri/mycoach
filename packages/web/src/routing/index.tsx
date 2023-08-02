import {FunctionComponent, useEffect} from 'react'
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'
import {PageDashboard} from './../pages/home'


export const Redirect: FunctionComponent<{ to: string }> = ({to}) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to)
    })
    return null
}
export const AppRoutes: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <>
                    <Route path="/home" element={<PageDashboard/>}/>
                    <Route path="/*" element={<Navigate to="/home"/>}/>
                </>
            </Routes>
        </BrowserRouter>
    )
}