import React from 'react'
import {Aside} from './components/aside'
import './index.css'

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <div className="sidebar">
            <div>
                <img
                    src="https://via.placeholder.com/48"
                    alt="avatar"
                    className="rounded-full mr-[16px]"
                />
                <div className="flex flex-col">
          <span className="text-lg font-semibold text-neutrals-100">
            Jake Gyll
          </span>
                    <span className="text-sm text-neutrals-80">jake.gyll@gmail.com</span>
                </div>
            </div>

            <Aside/>

        </div>
    )
}
