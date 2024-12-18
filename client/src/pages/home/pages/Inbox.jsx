import React from 'react'
import Layout from '../components/Layout'

const Inbox = () => {
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Inbox</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
          <div className="text-xl text-neutral-200">main content is here</div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Inbox
