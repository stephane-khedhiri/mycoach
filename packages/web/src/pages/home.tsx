import { FunctionComponent, useEffect } from 'react'
import { Layout } from '../ui/layout/index'

export const PageDashboard: FunctionComponent = () => {
    useEffect(() => {
        window.document.title = 'Dashboard'
    }, [])

    return (
        <Layout>

        </Layout>
    )
}