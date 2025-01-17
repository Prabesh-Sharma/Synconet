import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Events = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Events</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="border-neutral-500/50 h-60 w-full bg-neutral-800/20 rounded border p-4">
          <button
            className="bg-slate-200 rounded-lg p-1 hover:bg-slate-400 text-black"
            onClick={() => navigate('/home/events/event/3')}
          >
            click me
          </button>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Events
