import {FunctionComponent, useEffect} from 'react'
import {NavLink, Outlet, useLocation} from "react-router-dom";
import './index.css'

export const AuthLayout: FunctionComponent = () => {
    const location = useLocation()

    let target = 'login'
    const match = location.pathname.match(/\/auth\/.*?\/?([a-z]+)$/)
    if (target) {
        target = match && match.length > 0 ? match[1]: target
    }

    useEffect(() => {
        window.document.title = 'Sign Up'
    }, [])
    return (
        <div className={`auth`}>
            <div>

            </div>
            <div>
                <ul className={'nav'}>
                    <NavLink to={`/auth/signup`}>Sign Up</NavLink>
                    <NavLink
                        to={`/auth/${target}`}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        login
                    </NavLink>
                </ul>
                <Outlet />
            </div>
        </div>
    )
}