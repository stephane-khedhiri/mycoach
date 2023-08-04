import React from 'react'
import {Aside} from './components/aside'
import './index.css'

type SidebarProps =  {
    email: string | undefined
}

export const Sidebar: React.FC<SidebarProps> = ({email}) => {
    return (
        <div className="sidebar">
            <div>
                <img
                    src="https://via.placeholder.com/48"
                    alt="avatar"
                    className="rounded-full mr-[16px]"
                />

                    <span className="text-sm text-neutrals-80">{email?? ''}</span>

            </div>

            <Aside/>

        </div>
    )
}
