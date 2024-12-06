import React from 'react'
import Layout from '../components/Layout'
import Interest from './interest/Interest'

const Dashboard = () => {
    return (
        <>
            <Layout>
                <Layout.Header>
                    <h1 className="text-4xl text-neutral-200">Dashboard</h1>
                </Layout.Header>
                <Layout.Main>
                    <Interest />
                </Layout.Main>
            </Layout>
        </>
    )
}

export default Dashboard