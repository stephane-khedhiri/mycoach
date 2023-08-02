import { FunctionComponent, useEffect } from 'react'
import { Layout } from '@ui/layout'

export const PageDashboard: FunctionComponent = () => {
    useEffect(() => {
        window.document.title = 'Dashboard'
    }, [])

    return (
        <Layout>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                aliquid, aspernatur blanditiis cupiditate dignissimos illum itaque nemo
                neque nisi odio omnis quae quisquam rem sapiente soluta, suscipit
                temporibus velit vitae.
            </p>
        </Layout>
    )
}