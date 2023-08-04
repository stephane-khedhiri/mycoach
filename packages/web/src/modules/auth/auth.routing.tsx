import {FunctionComponent} from "react";
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthLayout} from "./auth.layout";
import {Register} from "./components/coach/register"
import {Login} from "./components/coach/login";
import {useAuth} from "./auth.provider";


export const AuthRouting: FunctionComponent = () => {
    const {profile} = useAuth()


    return (
        <Routes>
            {profile ?
                <Route path={"/auth/*"} element={<Navigate to={'/backoffice'}/>}/>
                :
                <>
                    <Route element={<AuthLayout/>}>
                        <Route path={"/signup"} element={<Register/>}></Route>
                        <Route index path={"/login"} element={<Login/>}></Route>
                    </Route>
                </>
            }
        </Routes>
    )
}