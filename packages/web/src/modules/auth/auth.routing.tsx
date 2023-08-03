import {FunctionComponent} from "react";
import {Route, Routes} from 'react-router-dom'
import {AuthLayout} from "./auth.layout";
import {Register} from "./components/coach/register"
import {Login} from "./components/coach/login";
import {Redirect} from "../../routing";

export const AuthRouting: FunctionComponent = () => (
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route  path={"/signup"} element={<Register/>}></Route>
            <Route  path={"/login"} element={<Login/>}></Route>
            <Route path="/*" element={<Redirect to={'/auth/login'}/>} />

        </Route>


    </Routes>
)