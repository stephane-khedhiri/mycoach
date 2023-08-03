import {FunctionComponent, useEffect} from 'react'
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'
import {AuthRouting} from './../modules/auth/auth.routing'
import {useAuth} from './../modules/auth/auth.provider'
import {PageHome} from "../pages/pagehome";
import {PageDashboard} from "../pages/coach/pagedashboard";
import {Logout} from "../modules/auth/components/logout";
import {LayoutBackoffice} from "../ui/layout/layout.backoffice";
import {DefaultLayout} from "../ui/layout/defaut.layout";


export const Redirect: FunctionComponent<{ to: string }> = ({to}) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to)
    })
    return null
}
export const AppRoutes: FunctionComponent = () => {
    const {profile} = useAuth()

    return (
        <Routes>
            {profile ? (
                <>
                    <Route path={'/backoffice'} element={<LayoutBackoffice/>}>
                        <Route index path={"coach"} element={<PageDashboard/>}/>
                    </Route>
                    <Route path={"/auth/*"} element={<Navigate to={"/backoffice"}/>}/>
                    <Route path={"/logout"} element={<Logout/>}/>
                </>
            ) : (
                <>
                    <Route path={"/auth/*"} element={<AuthRouting/>}/>
                    <Route path={"/backoffice"} element={<Navigate to={'/auth/login'}/>}/>
                </>
            )
            }
            <Route path={'/'} element={<DefaultLayout/>}>
                <Route index path="home" element={<PageHome/>}/>
            </Route>
            <Route path="/*" element={<Navigate to={'home'}/>}/>
        </Routes>
    )
}