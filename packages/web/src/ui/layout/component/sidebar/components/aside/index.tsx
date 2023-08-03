import {FunctionComponent} from 'react'
import { NavLink } from 'react-router-dom'
import {useAuth} from "../../../../../../modules/auth/auth.provider";




export const Aside: FunctionComponent = () => {
const {logout} = useAuth()
    return (
        <div className="aside">
            <ul>
                <li>
                    <NavLink to="/dashboard">
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/buttons">
                        <span>Buttons</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logout" onClick={()=>{logout()}}>
                        <span>logout</span>
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}
