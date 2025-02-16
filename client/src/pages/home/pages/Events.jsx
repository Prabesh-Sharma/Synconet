import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import { PlusIcon, Calendar, Clock, User, Briefcase } from 'lucide-react'
import axios from '../../../../axiosConfig.js'
import { useQuery } from '@tanstack/react-query'
import { FireIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

const EventCard = ({ event }) => {
  const navigate = useNavigate()
  const formattedDate = new Date(
    event.startTime || event.startDateTime
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = new Date(
    event.startTime || event.startDateTime
  ).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700/30 transition-colors cursor-default">
      <h2 className="text-xl font-semibold text-neutral-100 mb-2">
        {event.title}
      </h2>
      <div className="flex items-center text-neutral-300 mb-3 font-semibold">
        <span className="flex flex-row gap-1">
          Category: {event.category}
          {event.category === 'General' && (
            <Squares2X2Icon className="size-4 mt-1" />
          )}
          {event.category === 'Professional' && (
            <Briefcase className="size-4 mt-1" />
          )}
          {event.category === 'Popular' && <FireIcon className="size-4 mt-1" />}
        </span>
      </div>
      <p className="text-neutral-400 mb-4">{event.description}</p>
      <div className="space-y-2">
        <div className="flex items-center text-neutral-300">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-neutral-300">
          <Clock className="w-4 h-4 mr-2" />
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center text-neutral-300">
          tags:{' '}
          {event.tags.map((e) => {
            return <span className="ml-2">{e},</span>
          })}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() =>
            navigate(
              `/home/events/event/${slugify(event.title, { lower: true })}`
            )
          }
          className="rounded-md border-2 py-1 px-2 transition-colors delay-75 
                         bg-neutral-500/20 border-neutral-400 hover:text-green-300 hover:border-green-500"
        >
          Join
        </button>
      </div>
    </div>
  )
}

const Events = () => {
  const navigate = useNavigate()
  const eventName = 'Annual Tech Event'
  const slug = slugify(eventName, { lower: true })

  const getEvents = async () => {
    const response = await axios.get('/api/events/get')
    return response.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['events'], // Changed to more appropriate key
    queryFn: getEvents,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: false, // Disable automatic refetching
    retry: 3, // Allow 3 retries if fetch fails
  })

  // Access the events array from the data object
  const events = data?.events || []

  return (
    <Layout>
      <Layout.Header>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-neutral-200">Events</h1>
        </div>
      </Layout.Header>
      <Layout.Main>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-md border-2 py-2 px-4 
                     bg-neutral-500/20 border-neutral-400 hover:text-neutral-100 
                     hover:border-neutral-100 transition-colors absolute right-2 top-2"
            onClick={() => navigate('/home/events/addevent')}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        </div>
        <div className="p-6">
          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-400 py-12">
              <p className="text-xl">No events found</p>
              <p className="mt-2">
                Create your first event by clicking the Add Event button
              </p>
            </div>
          )}
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Events
