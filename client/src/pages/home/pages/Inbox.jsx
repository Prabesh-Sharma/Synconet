import React from 'react'
import Layout from '../components/Layout'

const Inbox = () => {
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Inbox</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="text-xl text-neutral-200">main content is here</div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
