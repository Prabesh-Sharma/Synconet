import React, { useEffect, useState } from 'react'
import InterestPage from './interest/InterestPage'
import Layout from '../components/Layout'

const Dashboard = () => {
  const [scheduledEvents, setScheduledEvents] = useState([])
  const [attendedEvents, setAttendedEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const scheduledResponse = await fetch('/api/events/scheduled')
        const attendedResponse = await fetch('/api/events/attended')
    
        if (!scheduledResponse.ok) {
          throw new Error(`Scheduled events fetch error: ${scheduledResponse.statusText}`)
        }
        if (!attendedResponse.ok) {
          throw new Error(`Attended events fetch error: ${attendedResponse.statusText}`)
        }
    
        const scheduledData = await scheduledResponse.json()
        const attendedData = await attendedResponse.json()
    
        setScheduledEvents(scheduledData)
        setAttendedEvents(attendedData)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    
    fetchEvents()
  }, [])

  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Dashboard</h1>
      </Layout.Header>
      <Layout.Main>
        <InterestPage />

        {/* Scheduled Events Section */}
        <section>
          <div className="p-4">
            <h2 className="text-2xl text-neutral-200">Scheduled Events</h2>
            {scheduledEvents.length === 0 ? (
              <p>No scheduled events</p>
            ) : (
              scheduledEvents.map((event) => (
                <div key={event._id} className="p-2 border-b border-gray-300">
                  <h3 className="text-xl">{event.title}</h3>
                  <p className="text-gray-500">{event.description}</p>
                  <p className="text-gray-400">{new Date(event.startTime).toLocaleDateString()}</p>
                  <p className="text-gray-400">{new Date(event.startTime).toLocaleTimeString()}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Attended Events Section */}
        <section>
          <div className="p-4">
            <h2 className="text-2xl text-neutral-200">Attended Events</h2>
            {attendedEvents.length === 0 ? (
              <p>No attended events</p>
            ) : (
              attendedEvents.map((event) => (
                <div key={event._id} className="p-2 border-b border-gray-300">
                  <h3 className="text-xl">{event.title}</h3>
                  <p className="text-gray-500">{event.description}</p>
                  <p className="text-gray-400">{new Date(event.startTime).toLocaleDateString()}</p>
                  <p className="text-gray-400">{new Date(event.startTime).toLocaleTimeString()}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </Layout.Main>
    </Layout>
  )
}

export default Dashboard
