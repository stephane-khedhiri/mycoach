import {FC} from 'react'
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import {AuthRouting} from '../modules/auth/auth.routing'
import {useAuth} from '../modules/auth/auth.provider'
import {PageHome} from "../pages/pagehome";
import {PageDashboard} from "../pages/backoffice/pagedashboard";
import {Logout} from "../modules/auth/components/logout";
import {LayoutBackoffice} from "../ui/layout/layout.backoffice";
import {DefaultLayout} from "../ui/layout/defaut.layout";
import {PageSetting} from "../pages/backoffice/page.setting";
import {PageOffers} from "../pages/backoffice/page.offers";



export const AppRoutes: FC = () => {
    const {profile, token} = useAuth()


    return (
        <Routes>
            {profile || token ?
                <>
                    <Route path={'/backoffice'} element={<LayoutBackoffice/>}>
                        <Route index element={<PageDashboard/>}/>
                        <Route path={"setting"} element={<PageSetting/>} />
                        <Route path={"offers"} element={<PageOffers/>} />
                    </Route>

                    <Route path={'/auth/*'} element={<Navigate to={'/backoffice'}/>} / >
                </>
             :
                <>
                    <Route path={"/auth/*"} element={<AuthRouting/>}/>
                    <Route path={"/backoffice"} element={<Navigate to={'/auth/login'}/>}/>

                </>

            }
            <Route path={'/'} element={<DefaultLayout/>}>
                <Route index path="home" element={<PageHome/>}/>
            </Route>
            <Route path="/*" element={<Navigate to={'home'}/>}/>

        </Routes>
    )
}