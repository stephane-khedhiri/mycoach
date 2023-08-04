import {FunctionComponent, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useAuth} from "../../../../../../modules/auth/auth.provider";





export const Aside: FunctionComponent = () => {
    const {saveToken} = useAuth()
    const navigate = useNavigate()

    const handlerLogout = () => {
        saveToken(null)
        navigate('/auth')
    }
    return (
        <div className="aside">
            <ul>
                <li>
                    <NavLink to="/backoffice">
                        <span>dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/backoffice/setting">
                        <span>setting</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/backoffice/sportsmen">
                        <span>sportsmen</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/backoffice/offers">
                        <span>offers</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={handlerLogout}>
                        <span>logout</span>
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}
