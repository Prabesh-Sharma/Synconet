import React, { useState, useEffect } from 'react'
import InterestPage from './interest/InterestPage'
import Layout from '../components/Layout'
import axios from '../../../../axiosConfig.js'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const [interestData, setInterestData] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [eventsCount, setEventsCount] = useState(0)

  // Events query using React Query
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get('/api/events/get')
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 3000,
    refetchInterval: false,
    retry: 3,
  })

  // Process events data for daily distribution
  const events = eventsData?.events || []

  const getDayName = (dayNumber) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayNumber]
  }

  // Initialize all days with zero counts
  const initialDailyCounts = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  }

  // Count events by day with proper date handling
  const dailyEventCounts = events.reduce(
    (acc, event) => {
      if (event.startDateTime) {
        // Check if updatedAt exists
        const date = new Date(event.startDateTime)
        // Check if date is valid
        if (!isNaN(date.getTime())) {
          const dayName = getDayName(date.getDay())
          acc[dayName] += 1 // Increment the count for that day
        }
      }
      return acc
    },
    { ...initialDailyCounts }
  ) // Start with initialized counts

  // Transform into chart data format, ensuring all days are included
  const barData = Object.entries(dailyEventCounts).map(([day, count]) => ({
    name: day,
    events: count,
  }))

  // Sort to ensure days are in order
  barData.sort((a, b) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days.indexOf(a.name) - days.indexOf(b.name)
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch interest stats
        const interestResponse = await axios.get('/api/interest-stats')
        if (interestResponse.data.success) {
          const formattedData = Object.entries(interestResponse.data.data)
            .map(([interest, count]) => ({
              name: interest,
              users: count,
            }))
            .sort((a, b) => b.users - a.users)

          setInterestData(formattedData)
          setTotalUsers(interestResponse.data.totalUsers || 0)
        }

        // Fetch events count
        const eventsResponse = await axios.get('/api/events/get/eventcnt')
        setEventsCount(eventsResponse.data.eventscount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Custom tick component for X-axis labels
  const CustomXAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#ffffff"
        transform="rotate(-45)"
        style={{ fontSize: '12px' }}
      >
        {payload.value}
      </text>
    </g>
  )

  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-neutral-200 px-4">
          Dashboard
        </h1>
      </Layout.Header>
      <Layout.Main className="px-4 lg:px-6">
        <InterestPage />

        <div className="bg-neutral-800 rounded-xl p-6 md:p-8 w-full max-w-2xl mx-auto mt-8 mb-8">
          <h2 className="text-neutral-200 text-xl md:text-2xl font-medium mb-6 md:mb-8 text-center">
            Total Activity
          </h2>

          <div className="flex justify-around items-center gap-4 md:gap-8">
            <div className="text-center flex-1">
              <p className="text-neutral-200 text-xs md:text-sm font-medium mb-1 md:mb-2">
                Users
              </p>
              <p className="text-neutral-200 text-3xl md:text-4xl font-medium mb-1 md:mb-2">
                {totalUsers}
              </p>
            </div>

            <div className="text-center flex-1">
              <p className="text-neutral-200 text-xs md:text-sm font-medium mb-1 md:mb-2">
                Events
              </p>
              <p className="text-neutral-200 text-3xl md:text-4xl font-medium mb-1 md:mb-2">
                {eventsCount}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4 lg:p-6">
            <div className="bg-neutral-900 rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-sm md:text-xl font-semibold text-neutral-200 mb-4 md:mb-6">
                Daily Events
              </h2>
              <div className="flex flex-col space-y-4 md:space-y-6">
                <div className="w-full h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                      />
                      <Bar
                        dataKey="events"
                        fill="#8884d8"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-4 md:p-6 shadow-lg">
              <h2 className="text-sm md:text-xl font-semibold text-neutral-200 mb-4 md:mb-6">
                Interest Distribution
              </h2>
              <div className="w-full h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={interestData}
                    margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="name"
                      stroke="#ffffff"
                      interval={0}
                      tick={<CustomXAxisTick />}
                      height={80}
                    />
                    <YAxis stroke="#ffffff" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#ffffff',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={{ fill: '#82ca9d' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  )
}

export default Dashboard
