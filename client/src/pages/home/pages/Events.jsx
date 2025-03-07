import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import {
  PlusIcon,
  Calendar,
  Clock,
  User,
  Briefcase,
  Trash2,
} from 'lucide-react'
import axios from '../../../../axiosConfig.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FireIcon, Squares2X2Icon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EventCard = ({ event }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  // Fix: use proper value instead of useState for token
  const token = localStorage.getItem('token')

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

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async () => {
      // Make sure we have the latest token
      const currentToken = localStorage.getItem('token')
      if (!currentToken) {
        throw new Error('Authentication required')
      }

      return await axios.delete(`/api/events/delete/${event._id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
    },
    onSuccess: (response) => {
      toast.success(response.data.message || 'Event deleted successfully')
      // Invalidate the events query to refetch the updated list
      queryClient.invalidateQueries(['events'])
      setShowDeleteConfirm(false)
    },
    onError: (error) => {
      console.error('Delete error:', error)

      // Handle authentication errors
      if (error.message === 'Authentication required') {
        toast.error('Please log in to delete events')
        navigate('/login')
        return
      }

      // Check if error is related to permissions
      if (error.response && error.response.status === 403) {
        toast.error(
          error.response.data.message ||
            "You don't have permission to delete this event as you're not the owner."
        )
      } else if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message || 'Event not found')
        // If event not found, refresh the list
        queryClient.invalidateQueries(['events'])
      } else {
        toast.error('Failed to delete event. Please try again later.')
      }
      setShowDeleteConfirm(false)
    },
  })

  return (
    <div className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700/30 transition-colors cursor-default relative">
      {/* Delete button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
        aria-label="Delete event"
      >
        <Trash2 className="size-7" />
      </button>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-lg p-6 max-w-md w-full m-4">
            <h3 className="text-xl font-semibold text-neutral-100 mb-4">
              Delete Event
            </h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete "{event.title}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md py-2 px-4 bg-neutral-700 text-neutral-300 hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteEventMutation.mutate()}
                className="rounded-md py-2 px-4 bg-red-600 text-white hover:bg-red-700 transition-colors"
                disabled={deleteEventMutation.isLoading}
              >
                {deleteEventMutation.isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
          {event.tags.map((e, index) => {
            return (
              <span key={index} className="ml-2">
                {e},
              </span>
            )
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
  const [token, setToken] = useState('')

  // Get token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  const getEvents = async () => {
    const currentToken = localStorage.getItem('token')
    const response = await axios.get('/api/events/get', {
      headers: currentToken
        ? {
            Authorization: `Bearer ${currentToken}`,
          }
        : {},
    })
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
    staleTime: 3000,
    refetchInterval: false,
    retry: 3,
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
                     hover:border-neutral-100 transition-colors absolute right-2 top-2 z-10"
            onClick={() => navigate('/home/events/addevent')}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="text-center text-neutral-400 py-12">
              <p className="text-xl">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-12">
              <p className="text-xl">Error loading events</p>
              <p className="mt-2">{error.message}</p>
            </div>
          ) : events && events.length > 0 ? (
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
