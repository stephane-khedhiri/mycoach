import React from 'react'

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="main">
            <div className="content">
                {Array.isArray(children) ? children.map((child) => child) : children}
            </div>
        </div>
    )
}